/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DestroyRef, inject } from '@angular/core';
import { filter, map, Observable, Subject, tap, withLatestFrom } from 'rxjs';
import { LoggerService } from '../../logger';
import { BaseSiteService } from '../../site-context/facade/base-site.service';
import { WindowRef } from '../../window';

/** Wire-format wrapper for cross-tab notifications. */
export interface TabNotificationWrapper<T> {
  baseSite: string;
  payload: T;
}

/**
 * Type guard: asserts a `MessageEvent` carries a value shaped like a
 * `TabNotificationWrapper`. Subclasses don't need this — it's the first
 * gate inside the abstract pipe.
 */
export function isTabNotificationWrapperEvent(
  event: MessageEvent
): event is MessageEvent<TabNotificationWrapper<unknown>> {
  const data: unknown = event.data;
  return (
    !!data &&
    typeof data === 'object' &&
    'baseSite' in data &&
    'payload' in data
  );
}

/**
 * Abstract service used to communicate with Spartacus in other browser tabs.
 *
 * Default behavior isolates events per active base site (subclasses can
 * override `isolateBySite = false` if cross-site signalling is desired).
 *
 * Subclasses provide:
 * - `channelId` — the `BroadcastChannel` name (must be unique per concern).
 * - `isPayloadOfExpectedType(payload)` — runtime check that an incoming
 *   payload matches the expected `T`. Called only after the wire-format
 *   wrapper guard has passed; the value comes straight from another tab,
 *   so trust nothing about its shape.
 */
export abstract class AbstractBrowserTabNotificationService<T> {
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
      const message: TabNotificationWrapper<T> = { baseSite, payload };
      this.channel?.postMessage(message);
    })
  );

  /** Raw inbound `MessageEvent`s — kept untyped until guards run. */
  protected inboundEvents$ = new Subject<MessageEvent>();

  /** Validated, fully-typed payloads. */
  notifications$: Observable<T> = this.inboundEvents$.pipe(
    filter(isTabNotificationWrapperEvent),
    filter((event): event is MessageEvent<TabNotificationWrapper<T>> =>
      this.isPayloadOfExpectedType(event.data.payload)
    ),
    map((event) => event.data),
    withLatestFrom(this.baseSiteService.getActive()),
    filter(([wrapper, currentBaseSite]) =>
      this.passesSiteIsolation(wrapper, currentBaseSite)
    ),
    map(([wrapper]) => wrapper.payload)
  );

  /**
   * Initializes the service to send and receive notification events.
   *
   * Only starts listening in a browser context. The channel is closed
   * and outbound processing is unsubscribed automatically when the
   * Angular injector is destroyed.
   */
  listen(): void {
    if (!this.windowRef.isBrowser()) {
      return;
    }
    try {
      this.channel = new BroadcastChannel(this.channelId);
      this.channel.addEventListener('message', (event) =>
        this.inboundEvents$.next(event)
      );
      this.destroyRef.onDestroy(() => this.channel?.close());

      const sub = this.outboundStream.subscribe();
      this.destroyRef.onDestroy(() => sub.unsubscribe());
    } catch (err) {
      this.logger.warn(
        `Could not open ${this.channelId} channel: ${(err as Error)?.message ?? ''}`
      );
    }
  }

  /**
   * Sends `data` to other tabs. No-op when `listen()` was never called
   * (e.g. running on the server, or unsupported browser): the payload
   * is dropped silently.
   */
  sendNotification(data: T): void {
    this.outbound.next(data);
  }

  protected passesSiteIsolation(
    wrapper: TabNotificationWrapper<T>,
    currentBaseSite: string
  ): boolean {
    return !this.isolateBySite || currentBaseSite === wrapper.baseSite;
  }

  /**
   * Subclass-supplied runtime check that an incoming payload is the
   * expected `T`. Called only after the wrapper-shape guard has
   * passed — so `payload` is whatever the other tab put on the wire.
   */
  protected abstract isPayloadOfExpectedType(payload: unknown): payload is T;
}
