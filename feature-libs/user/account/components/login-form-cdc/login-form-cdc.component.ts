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
        this.auth.afterRedirectFromCDCLogin();
      });
    this.initializeOAuthFlow();
  }

  initializeOAuthFlow(): void {
    if (this.baseSite) {
      this.baseSiteService.get(this.baseSite).subscribe((site) => {
        if (site?.cdcSiteConfig) {
          const authConfig = createAuthConfig(
            site?.cdcSiteConfig?.oidcOpIssuerURI,
            site?.cdcSiteConfig?.oicdRpClientId,
            this.baseSite,
            site?.cdcSiteConfig?.scopes.join(' '),
            'code'
          );
          this.oauthService.configure(authConfig);
        }
      });
    }
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }
}
