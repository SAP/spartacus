/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  AuthConfig,
  BaseSiteService,
  ConfigInitializer,
  OccConfig,
} from '@spartacus/core';
import { Observable, lastValueFrom, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthConfigInitializer implements ConfigInitializer {
  protected baseSiteService = inject(BaseSiteService);
  protected authConfig = inject(AuthConfig);
  protected occConfig = inject(OccConfig);
  private get config(): AuthConfig['authentication'] {
    return this.authConfig?.authentication ?? {};
  }
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
        baseUrl:
          this.config?.baseUrl ??
          (this.occConfig?.backend?.occ?.baseUrl ?? '') + '/authserver',
        loginUrl: '/oauth2/authorize',
        tokenEndpoint: '/oauth2/token',
        client_secret: 'secret',
        OAuthLibConfig: {
          issuer:
            this.config?.baseUrl ??
            (this.occConfig?.backend?.occ?.baseUrl ?? '') + '/authserver',
          redirectUri: `${window.location.origin}/electronics-spa/en/USD/login`,
          disablePKCE: true,
          responseType: 'code',
        },
      },
    };
    return of(result);
  }
}
