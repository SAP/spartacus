/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { filter, take } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { createAuthConfig } from './auth.config';
import { AuthService, BaseSiteService } from '@spartacus/core';

@Component({
  selector: 'cx-login-form-cdc',
  templateUrl: './login-form-cdc.component.html',
})
export class LoginFormCDCComponent implements OnInit {
  protected baseSite: string = '';
  constructor(
    protected oauthService: OAuthService,
    protected baseSiteService: BaseSiteService,
    protected auth: AuthService
  ) {}

  ngOnInit(): void {
    this.baseSiteService
      .getActive()
      .pipe(take(1))
      .subscribe((data) => (this.baseSite = data));
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe(() => {
        this.oauthService.loadUserProfile();
        this.auth.afterRedirectFromCDCLogin();
        // this.auth.checkOAuthParamsInUrl();
      });
    this.initializeOAuthFlow();
  }

  initializeOAuthFlow(): void {
    var issuer = 'https://fidm.eu1.gigya.com/oidc/op/v1.0/4_haAyXsKhFEupcUCQ9UPizw';
    var clientId = 'FeWB0V0Opi2hEL-T21DlUuEO';
    if (this.baseSite === 'powertools-spa'){
      issuer = 'https://fidm.eu1.gigya.com/oidc/op/v1.0/4_v-Y7S02BL8ZERxyGxnVWNA';
      clientId = 'FwmaT2tSBrGTdR0pVvSGJ6jX';
    }
    const authConfig = createAuthConfig(
      issuer,
      clientId,
      this.baseSite,
      'openid profile email uid bpId bpDisplayId isB2BCustomer',
      'code'
    );
    this.oauthService.configure(authConfig);
    // this.oauthService.loadDiscoveryDocument();
    // this.auth.loginWithRedirect();
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }
}
