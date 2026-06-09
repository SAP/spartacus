/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Subject, take } from 'rxjs';
import { LoggerService } from '../../../logger';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { WindowRef } from '../../../window';

/** Internal wrapper for auth notification service events. */
export interface AuthEventWrapper<T> {
  baseSite: string;
  payload?: T;
}

/**
 * Service used to communicate with other Spartacus tabs for this site.
 */
@Injectable({ providedIn: 'root' })
export class AuthNotificationService<T = unknown> {
  protected channelId = 'spartacus_auth_notification';

  protected baseSiteService = inject(BaseSiteService);
  protected logger = inject(LoggerService);
  protected windowRef = inject(WindowRef);

  protected channel: BroadcastChannel | undefined;

  protected _notifications$ = new Subject<T | undefined>();
  notifications$ = this._notifications$.asObservable();

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
      } catch (err) {
        this.logger.warn(
          `Could not open AuthNotification channel: ${(err as Error)?.message ?? ''}`
        );
      }
    }
  }

  protected channelListener(event: MessageEvent<AuthEventWrapper<T>>) {
    this.baseSiteService
      .getActive()
      .pipe(take(1))
      .subscribe((baseSite) => {
        if (baseSite === event.data.baseSite) {
          this._notifications$.next(event.data.payload);
        }
      });
  }

  sendEvent(data?: T) {
    this.baseSiteService
      .getActive()
      .pipe(take(1))
      .subscribe((baseSite) => {
        this.channel?.postMessage({
          baseSite,
          payload: data,
        } satisfies AuthEventWrapper<T>);
      });
  }
}
