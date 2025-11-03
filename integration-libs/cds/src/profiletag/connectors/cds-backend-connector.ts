/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CdsBackendNotificationAdapter } from '../adapters/cds-backend-notification-adapter';

@Injectable({
  providedIn: 'root',
})
export class CdsBackendConnector {
  private cdsBackendNotificationAdapter = inject(CdsBackendNotificationAdapter);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}
  notifySuccessfulLogin(): Observable<void> {
    return this.cdsBackendNotificationAdapter.notifySuccessfulLogin();
  }
}
