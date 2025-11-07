/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CdsBackendNotificationAdapter } from './cds-backend-notification-adapter';

@Injectable()
export class OccBackendNotification implements CdsBackendNotificationAdapter {
  private http = inject(HttpClient);
  private occEndpoints = inject(OccEndpointsService);

  notifySuccessfulLogin(): Observable<void> {
    return this.http
      .post<{}>(
        `${this.occEndpoints.getBaseUrl()}/users/current/loginnotification`,
        {}
      )
      .pipe(switchMap(() => EMPTY));
  }
}
