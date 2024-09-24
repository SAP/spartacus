/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { AuthService } from '@spartacus/core';
import { CdcOAuthLibWrapperService } from './cdc-oauth-lib-wrapper.service';

@Injectable({
  providedIn: 'root',
})
export class CdcAuthService extends AuthService {
  protected cdcOAuthLibWrapperService = inject(CdcOAuthLibWrapperService);
  public refreshAuthConfig() {
    this.cdcOAuthLibWrapperService.refreshAuthConfig();
  }
}
