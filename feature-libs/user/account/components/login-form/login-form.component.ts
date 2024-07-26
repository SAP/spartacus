/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { LoginFormComponentService } from './login-form-component.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';
import { AuthService, RoutingService } from '@spartacus/core';

declare var gigya: any;
@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  constructor(
    protected authService: AuthService,
    protected routingService: RoutingService,
    protected service: LoginFormComponentService,
    private oauthService: OAuthService
  ) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe(() => {
        this.oauthService.loadUserProfile();
        this.service.updateToken(this.oauthService.getAccessToken());
      });

    gigya.accounts.addEventHandlers({
      onLogin: (account: any) => {
        this.service.onCDCLoginSuccess(account);
      },
    });
  }

  ngOnInit(): void {
    this.authService
      .isUserLoggedIn()
      .pipe(
        map((isLoggedIn) => {
          if (isLoggedIn) {
            this.routingService.go({ cxRoute: 'home' });
          } else {
            this.startPKCEflow();
          }
        })
      )
      .subscribe();
    // this.startPKCEflow();
  }

  startPKCEflow(): void {
    this.oauthService.initCodeFlow();
  }
}
