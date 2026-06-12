/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { AuthNotificationType } from '../models/auth-notification.model';
import { AbstractBrowserTabNotificationService } from '../../../util/browser-tab-notification';

export const authNotificationServiceChannelId = 'spartacus_auth_notification';

/**
 * Cross-tab signalling service for auth events (currently: logout).
 *
 * Notifications are scoped to the active base site by default, so two
 * Spartacus storefronts served from the same origin but different
 * `baseSite`s do not see each other's auth events.
 *
 * Note: this service does NOT bridge to {@link EventService}. Each tab
 * runs its own `coreLogout()` in response to an inbound notification,
 * which causes `LogoutEvent` to fire locally via `UserAuthEventBuilder`,
 * so existing in-tab listeners (cart, checkout, configurator, …) clean
 * up automatically.
 */
@Injectable({ providedIn: 'root' })
export class AuthNotificationService extends AbstractBrowserTabNotificationService<AuthNotificationType> {
  protected channelId = authNotificationServiceChannelId;

  protected isPayloadOfExpectedType(
    payload: unknown
  ): payload is AuthNotificationType {
    return (
      typeof payload === 'string' &&
      (Object.values(AuthNotificationType) as string[]).includes(payload)
    );
  }
}
