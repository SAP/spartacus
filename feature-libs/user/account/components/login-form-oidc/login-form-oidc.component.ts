/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, inject } from '@angular/core';
import { filter, take } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
// import { createAuthConfig } from './auth.config';
import { AuthService, BaseSiteService, OAuthLibWrapperService } from '@spartacus/core';
// import { defaultOidcAuthConfig } from './default-oidc-auth-config';
@Component({
  selector: 'cx-login-form-oidc',
  templateUrl: './login-form-oidc.component.html',
})
export class LoginFormOidcComponent implements OnInit {
  protected baseSite: string = '';
  protected oauthService = inject(OAuthService);
  protected baseSiteService = inject(BaseSiteService);
  protected auth = inject(AuthService);
  protected oauthLibWrapper = inject(OAuthLibWrapperService);

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
    // this.oauthService.configure(defaultOidcAuthConfig.authentication?.OAuthLibConfig);

    // this.baseSiteService
    //   .get()
    //   .pipe(take(1))
    //   .subscribe((site) => {
    //     if (site?.cdcSiteConfig && site?.uid) {
    //       const authConfig = createAuthConfig(
    //         site.cdcSiteConfig.oidcOpIssuerURI,
    //         site.cdcSiteConfig.oidcRpClientId,
    //         site.uid,
    //         site.cdcSiteConfig.scopes.join(' '),
    //         'code'
    //       );
    //       this.oauthService.configure(authConfig);
    //       // this.oauthLibWrapper.loadDiscoveryDocumentAndLogin();
    //     }
    //   });
    this.oauthLibWrapper.loadDiscoveryDocumentAndLogin();

  }
}
