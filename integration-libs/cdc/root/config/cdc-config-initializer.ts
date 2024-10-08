/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CdcConfig } from './cdc-config';
import { BaseSiteService, ConfigInitializer } from '@spartacus/core';
import { Observable, lastValueFrom } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CdcConfigInitializer implements ConfigInitializer {
  readonly scopes = ['cdc'];
  readonly configFactory = () => lastValueFrom(this.resolveConfig());
  protected baseSiteService = inject(BaseSiteService);
  /**
   * Emits the Cdc config basing on the current base site data.
   *
   * Completes after emitting the value.
   */
  protected resolveConfig(): Observable<CdcConfig> {
    return this.baseSiteService.get().pipe(
      take(1),
      map((site) => {
        if (site?.cdcSiteConfig && site?.uid) {
          const result: CdcConfig = {
            cdc: [
              {
                baseSite: site.uid,
                javascriptUrl: `https://cdns.gigya.com/js/gigya.js?apikey=${site.cdcSiteConfig.siteApiKey}`,
                sessionExpiration: 3600,
              },
            ],
          };
          return result;
        } else {
          return {} as CdcConfig;
        }
      })
    );
  }
}
