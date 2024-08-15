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
  selector: 'cx-login-form-oidc',
  templateUrl: './login-form-oidc.component.html',
})
export class LoginFormOidcComponent implements OnInit {
  protected baseSite: string = '';
  constructor(
    protected oauthService: OAuthService,
    protected baseSiteService: BaseSiteService,
    protected auth: AuthService
  ) {}

  ngOnInit(): void {
    this.oauthService.events
      .pipe(
        filter((e) => e.type === 'token_received'),
        take(1)
      )
      .subscribe(() => {
        this.auth.afterRedirectFromOidcLogin();
      });
    this.initializeOAuthFlow();
  }

  initializeOAuthFlow(): void {
    this.baseSiteService
      .get()
      .pipe(take(1))
      .subscribe((site) => {
        if (site?.cdcSiteConfig && site?.uid) {
          const authConfig = createAuthConfig(
            site.cdcSiteConfig.oidcOpIssuerURI,
            site.cdcSiteConfig.oidcRpClientId,
            site.uid,
            site.cdcSiteConfig.scopes.join(' '),
            'code'
          );
          this.oauthService.configure(authConfig);
          this.oauthService.loadDiscoveryDocumentAndLogin();
        }
      });
  }
}
