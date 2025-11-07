/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserNotificationPreferenceAdapter } from './user-notification-preference.adapter';
import { NotificationPreference } from '../../../model/notification-preference.model';

@Injectable({
  providedIn: 'root',
})
export class UserNotificationPreferenceConnector {
  protected adapter = inject(UserNotificationPreferenceAdapter);


  loadAll(userId: string): Observable<NotificationPreference[]> {
    return this.adapter.loadAll(userId);
  }

  update(userId: string, preferences: NotificationPreference[]) {
    return this.adapter.update(userId, preferences);
  }
}
