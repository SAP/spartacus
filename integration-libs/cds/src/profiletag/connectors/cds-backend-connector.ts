/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CdsBackendNotificationAdapter } from '../adapters/cds-backend-notification-adapter';

@Injectable({
  providedIn: 'root',
})
export class CdsBackendConnector {
  constructor(
    private cdsBackendNotificationAdapter: CdsBackendNotificationAdapter
  ) {}
  notifySuccessfulLogin(): Observable<void> {
    return this.cdsBackendNotificationAdapter.notifySuccessfulLogin();
  }
}
