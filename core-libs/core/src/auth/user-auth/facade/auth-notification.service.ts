/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { AuthNotificationType } from '@spartacus/core';
import {
  AbstractTabNotificationService,
  TabNotificationWrapper,
} from '../../../util/tab-notification';

/**
 * Service used to communicate with other Spartacus tabs for this site.
 */
@Injectable({ providedIn: 'root' })
export class AuthNotificationService extends AbstractTabNotificationService<AuthNotificationType> {
  protected channelId = 'spartacus_auth_notification';

  protected payloadGuard(
    event: MessageEvent<TabNotificationWrapper<unknown>>
  ): event is MessageEvent<TabNotificationWrapper<AuthNotificationType>> {
    return (
      typeof event.data.payload === 'string' &&
      Object.values(AuthNotificationType).includes(
        event.data.payload as AuthNotificationType
      )
    );
  }
}
