/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { AuthConfig } from '@spartacus/core';
import { ConfigInitializer } from 'projects/core/src/config/config-initializer/config-initializer';
import { BaseSiteService } from 'projects/core/src/site-context/facade/base-site.service';
import { Observable, lastValueFrom, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthConfigInitializer implements ConfigInitializer {
  protected baseSiteService = inject(BaseSiteService);
  readonly scopes = ['authentication'];
  readonly configFactory = () => lastValueFrom(this.resolveConfig());
  /**
   * Emits the Auth config basing on the current base site data.
   *
   * Completes after emitting the value.
   */
  protected resolveConfig(): Observable<AuthConfig> {
    const result: AuthConfig = {
      authentication: {
        client_id: 'mobile_android',
        revokeEndpoint: '/oauth2/revoke',
        baseUrl: 'https://localhost:9002/authserver',
        loginUrl: '/oauth2/authorize',
        tokenEndpoint: '/oauth2/token',
        client_secret: 'secret',
        OAuthLibConfig: {
          issuer: 'https://localhost:9002/authserver',
          redirectUri: `${window.location.origin}/electronics-spa/en/USD/login`,
          disablePKCE: true,
          responseType: 'code',
          //   scope: 'openid',
        },
      },
    };
    return of(result);
  }
}
