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
import { AuthService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit{
  protected LoggedIn: boolean = false;
// export class LoginFormComponent{
  constructor(
    protected authService: AuthService,
    protected routingService: RoutingService,
    protected service: LoginFormComponentService,
    private oauthService: OAuthService,
    protected routing: RoutingService,
  ) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe(() => {
        this.oauthService.loadUserProfile();
        this.service.updateToken(this.oauthService.getAccessToken());
      });
  }
  ngOnInit(): void {
      this.authService.isUserLoggedIn().subscribe(isLoggedIn => {
        if(isLoggedIn){
          console.log('User is logged in: '+isLoggedIn);
          // this.routing.go('/');
        }
        else{
          console.log('User is logged in: '+isLoggedIn);
          // this.startPKCEflow();
        }
      });
  }

  startPKCEflow(): void {
    this.oauthService.initCodeFlow();
  }
}
