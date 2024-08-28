/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  AuthConfig,
  AuthLibConfig,
  BASE_SITE_CONTEXT_ID,
  BaseSiteService,
  ConfigInitializer,
  ConfigInitializerService,
} from '@spartacus/core';
import { Observable, lastValueFrom } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CdcConfigInitializer implements ConfigInitializer {
  readonly scopes = ['authentication'];
  readonly configFactory = () => lastValueFrom(this.resolveConfig());

  constructor(
    protected baseSiteService: BaseSiteService,
    protected configInit: ConfigInitializerService
  ) {}

  /**
   * Emits the Auth config basing on the current base site data.
   *
   * Completes after emitting the value.
   */
  protected resolveConfig(): Observable<AuthConfig> {
    return this.configInit.getStable('context').pipe(
      switchMap((config) => {
        // todo: get uid for current site
        const siteUid = config?.context?.[BASE_SITE_CONTEXT_ID]?.[0];

        return this.baseSiteService.get(siteUid).pipe(
          tap((baseSite) => {
            if (!baseSite) {
              throw new Error(
                `Error: Cannot get base site config for ${siteUid}.`
              );
            }
          }),
          // todo: get auth config by site id
          map(() => this.getAuthConfig()),
          take(1)
        );
      })
    );
  }

  protected getAuthConfig(): AuthConfig {
    // todo: get auth config from site
    const result = {
      authentication: {
        clientId: 'T8ONdZ84OQW6Kud0LwM9pFC1',
        tokenEndpoint:
          'https://auth.pilot-demo6-p1-public.model-t.myhybris.cloud/oidc/op/v1.0/4__GcGe4z3mp-6QicQgo0Y_Q/token',
        OAuthLibConfig: <AuthLibConfig>{
          clientId: 'T8ONdZ84OQW6Kud0LwM9pFC1',
          issuer:
            'https://auth.pilot-demo6-p1-public.model-t.myhybris.cloud/oidc/op/v1.0/4__GcGe4z3mp-6QicQgo0Y_Q',
          redirectUri: 'http://localhost:4200/electronics-spa/en/USD/login',
          scope: 'openid profile email uid bpDisplayId bpId isB2BCustomer',
          responseType: 'code',
          disablePKCE: false,
        },
      },
    };
    return result;
  }
}
