/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CdcLogoutGuard } from './cdc-logout.guard';

/**
 * Extendable service for `AuthInterceptor`.
 */
@Injectable({
  providedIn: 'root',
})
export class CdcAuthLogOutService extends CdcLogoutGuard {
  public cdcLogout(): Promise<any> {
    return this.logout();
  }
}
