/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { LoginAsGuestGuard } from '@spartacus/user/account/components';

@Injectable({
  providedIn: 'root',
})
export class CdcLoginAsGuestGuard extends LoginAsGuestGuard {
  protected getPath(): string | undefined {
    return this.semanticPathService.get('login');
  }
}
