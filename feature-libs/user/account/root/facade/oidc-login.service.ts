/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService, FeatureModulesService, WindowRef } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';


@Injectable({
  providedIn: 'root',
})
export class OidcLoginService {
  constructor(
    protected location: Location,
    protected winRef: WindowRef,
    protected launchDialogService: LaunchDialogService,
    protected featureModules: FeatureModulesService,
    protected httpClient: HttpClient,
    protected authService: AuthService
  ) {}

  tryLogin(): void {
    let code = this.getCode();
    if (code) {
      this.doLogin(code);
    }
  }

  getCode(): string {
    const params = this.location.path().split('?')[1];
    if (params) {
      const code = params.split('&').find((param) => param.startsWith('tokenCode='));
      if (code) {
        return code.split('=')[1];
      }
    }
    return '';
  }

  protected doLogin(code: String): void {
    this.httpClient.get('https://localhost:9002/oauth2client/token?tokenCode=' + code, {withCredentials: true}).subscribe((tokenData: any) => {
      console.log(tokenData);

      this.authService.syncCdcToken(tokenData['tokenValue']);
    });
  }
}
