/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { OccEndpointsService, UserIdService } from '@spartacus/core';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CdsBackendNotificationAdapter } from './cds-backend-notification-adapter';

@Injectable()
export class OccBackendNotification implements CdsBackendNotificationAdapter {
  private http = inject(HttpClient);
  private occEndpoints = inject(OccEndpointsService);

  private userIdService = inject(UserIdService);
  notifySuccessfulLogin(): Observable<void> {
    return this.userIdService
      .takeUserId(true)
      .pipe(
        switchMap((userId) =>
          this.http
            .post<{}>(
              `${this.occEndpoints.getBaseUrl()}/users/${userId}/loginnotification`,
              {}
            )
            .pipe(switchMap(() => EMPTY))
        )
      );
  }
}
