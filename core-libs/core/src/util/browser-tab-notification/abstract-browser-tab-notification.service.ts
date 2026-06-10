/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DestroyRef, inject } from '@angular/core';
import { filter, map, Subject, tap, withLatestFrom } from 'rxjs';
import { LoggerService } from '../../logger';
import { BaseSiteService } from '../../site-context/facade/base-site.service';
import { WindowRef } from '../../window';

/** Internal wrapper for auth notification service events. */
export interface TabNotificationWrapper<T> {
  baseSite: string;
  payload: T;
}

export function tabNotificationWrapperTypeGuard(
  event: MessageEvent<unknown>
): event is MessageEvent<TabNotificationWrapper<unknown>> {
  return (
    !!event.data &&
    typeof event.data === 'object' &&
    'baseSite' in event.data &&
    'payload' in event.data
  );
}

/**
 * Abstract service used to communicate with Spartacus in other browser tabs.
 *
 * Default behavior isolates events per site.
 */
export abstract class AbstractBrowserTabNotificationService<T = unknown> {
  protected abstract channelId: string;
  protected isolateBySite = true;

  protected baseSiteService = inject(BaseSiteService);
  protected logger = inject(LoggerService);
  protected windowRef = inject(WindowRef);
  protected destroyRef = inject(DestroyRef);

  protected channel: BroadcastChannel | undefined;

  protected outbound = new Subject<T>();
  protected outboundStream = this.outbound.pipe(
    withLatestFrom(this.baseSiteService.getActive()),
    tap(([payload, baseSite]) => {
      this.channel?.postMessage({
        baseSite,
        payload: payload,
      } satisfies TabNotificationWrapper<T>);
    })
  );

  protected inboundEvents$ = new Subject<MessageEvent<unknown>>();

  notifications$ = this.inboundEvents$.asObservable().pipe(
    filter(tabNotificationWrapperTypeGuard),
    filter((event) => this.payloadGuard(event)),
    map((event) => event.data),
    withLatestFrom(this.baseSiteService.getActive()),
    filter((tuple) => this.siteIsolationFilter(tuple)),
    map(([event]) => event.payload)
  );

  /**
   * Initializes the service to send and receive notification events.
   *
   * Only activates when in a browser context.
   */
  listen() {
    if (this.windowRef.isBrowser()) {
      try {
        this.channel = new BroadcastChannel(this.channelId);
        this.channel.addEventListener('message', (event) => {
          this.channelListener(event);
        });
        this.destroyRef.onDestroy(() => this.channel?.close());

        const outboundProcessing = this.outboundStream.subscribe();
        this.destroyRef.onDestroy(() => outboundProcessing.unsubscribe());
      } catch (err) {
        this.logger.warn(
          `Could not open AuthNotification channel: ${(err as Error)?.message ?? ''}`
        );
      }
    }
  }

  sendEvent(data: T) {
    this.outbound.next(data);
  }

  protected siteIsolationFilter([event, currentBaseSite]: [
    TabNotificationWrapper<T>,
    string,
  ]): boolean {
    return this.isolateBySite ? currentBaseSite === event?.baseSite : true;
  }

  protected abstract payloadGuard(
    event: MessageEvent<TabNotificationWrapper<unknown>>
  ): event is MessageEvent<TabNotificationWrapper<T>>;

  protected channelListener(event: MessageEvent<TabNotificationWrapper<T>>) {
    this.inboundEvents$.next(event);
  }
}
