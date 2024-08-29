/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  AuthConfig,
  BaseSiteService,
  ConfigInitializer,
} from '@spartacus/core';
import { Observable, lastValueFrom } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OidcConfigInitializer implements ConfigInitializer {
  readonly scopes = ['authconfig'];
  readonly configFactory = () => lastValueFrom(this.resolveConfig());
  protected baseSiteService = inject(BaseSiteService);

  /**
   * Emits the Auth config basing on the current base site data.
   *
   * Completes after emitting the value.
   */
  protected resolveConfig(): Observable<AuthConfig> {
    return this.baseSiteService.get().pipe(
      take(1),
      filter(
        (site) =>
          !!site?.cdcSiteConfig &&
          !!site?.uid &&
          !!site.baseStore?.defaultCurrency &&
          !!site.defaultLanguage
      ),
      map((site) => {
        if (!site) {
          throw new Error('Site is undefined.');
        }
        const defaultCurrency = site.baseStore?.defaultCurrency?.isocode;
        const defaultLanguage = site.defaultLanguage?.isocode;
        const result: AuthConfig = {
          authentication: {
            tokenEndpoint: site.cdcSiteConfig?.oidcOpIssuerURI + '/token',
            client_id: site.cdcSiteConfig?.oidcRpClientId,
            OAuthLibConfig: {
              issuer: site.cdcSiteConfig?.oidcOpIssuerURI,
              redirectUri: `${window.location.origin}/${site.uid}/${defaultLanguage}/${defaultCurrency}/login`,
              scope: site.cdcSiteConfig?.scopes?.join(' '),
              disablePKCE: false,
              responseType: 'code',
            },
          },
        };
        return result;
      })
    );
  }
}
