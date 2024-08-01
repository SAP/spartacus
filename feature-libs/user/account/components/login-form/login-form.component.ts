/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { filter, take } from 'rxjs';
import { LoginFormComponentService } from './login-form-component.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { createAuthConfig } from './auth.config';
import { BaseSiteService } from '@spartacus/core';

@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  protected baseSite: string = '';
  constructor(
    protected service: LoginFormComponentService,
    protected oauthService: OAuthService,
    protected baseSiteService: BaseSiteService,
  ) {}

  ngOnInit(): void {
    this.baseSiteService
      .getActive()
      .pipe(take(1))
      .subscribe((data) => (this.baseSite = data));
    this.initializeOAuthFlow();
    if (sessionStorage.getItem('isRedirected')) {
      sessionStorage.removeItem('isRedirected');
    } else {
      this.startPKCEflow();
      sessionStorage.setItem('isRedirected', 'true');
    }
  }

  initializeOAuthFlow(): void {
    const authConfig = createAuthConfig('https://fidm.eu1.gigya.com/oidc/op/v1.0/4_haAyXsKhFEupcUCQ9UPizw','FeWB0V0Opi2hEL-T21DlUuEO', this.baseSite, 'openid profile email uid');
    console.log(authConfig);
    console.log(authConfig.redirectUri);
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe(() => {
        this.oauthService.loadUserProfile();
        this.service.updateToken(this.oauthService.getAccessToken());
      });
  }

  startPKCEflow(): void {
    this.oauthService.initCodeFlow();
  }
}
