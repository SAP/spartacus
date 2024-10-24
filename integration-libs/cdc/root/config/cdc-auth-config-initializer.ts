/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { AuthConfig, ConfigInitializer } from '@spartacus/core';
import { Observable, lastValueFrom } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CdcBaseSiteService } from '../service/cdc-base-site.service';
@Injectable({ providedIn: 'root' })
export class CdcAuthConfigInitializer implements ConfigInitializer {
  protected baseSiteService = inject(CdcBaseSiteService);
  readonly scopes = ['authentication'];
  readonly configFactory = () => lastValueFrom(this.resolveConfig());
  /**
   * Emits the Auth config basing on the current base site data.
   *
   * Completes after emitting the value.
   */
  protected resolveConfig(): Observable<AuthConfig> {
    return this.baseSiteService.get().pipe(
      take(1),
      map((site) => {
        if (
          site?.cdcSiteConfig &&
          site?.uid &&
          site.baseStore?.defaultCurrency &&
          site.defaultLanguage
        ) {
          const defaultCurrency = site.baseStore.defaultCurrency.isocode;
          const defaultLanguage = site.defaultLanguage.isocode;
          const result: AuthConfig = {
            authentication: {
              client_id: site.cdcSiteConfig.oidcRpClientId,
              revokeEndpoint: site.cdcSiteConfig.oidcRpClientId + '/revoke',
              OAuthLibConfig: {
                issuer: site.cdcSiteConfig.oidcOpIssuerURI,
                redirectUri: `${window.location.origin}/${site.uid}/${defaultLanguage}/${defaultCurrency}/login`,
                scope: site.cdcSiteConfig.scopes?.join(' '),
                disablePKCE: false,
                responseType: 'code',
              },
            },
          };
          return result;
        } else {
          return {} as AuthConfig;
        }
      })
    );
  }
}
