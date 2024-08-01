/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { LoginFormComponentService } from './login-form-component.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';

@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  constructor(
    protected service: LoginFormComponentService,
    protected oauthService: OAuthService
  ) {}

  ngOnInit(): void {
    this.initializeOAuthFlow();
    if (sessionStorage.getItem('isRedirected')) {
      sessionStorage.removeItem('isRedirected');
    } else {
      this.startPKCEflow();
      sessionStorage.setItem('isRedirected', 'true');
    }
  }

  initializeOAuthFlow(): void {
    this.oauthService.configure(authCodeFlowConfig);
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
