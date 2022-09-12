/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CdcConfig, CdcRootModule, CDC_FEATURE } from '@commerce-storefront-toolset/cdc/root';
import { provideConfig } from '@commerce-storefront-toolset/core';

@NgModule({
  imports: [CdcRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [CDC_FEATURE]: {
          module: () => import('@commerce-storefront-toolset/cdc').then((m) => m.CdcModule),
        },
      },
    }),
    provideConfig(<CdcConfig>{
      cdc: [
        {
          baseSite: 'electronics-cdc',
          javascriptUrl: '',
          sessionExpiration: 3600,
        },
        {
          baseSite: 'electronics-spa',
          javascriptUrl:
            'https://cdns.eu1.gigya.com/JS/gigya.js?apikey=3_k_wG-sllOhu2rjDEWHjG9-ncnnGAMHfkIcUKzl94weJU1Y18hITRgnTDp1LP8QdC',
          sessionExpiration: 3600,
        },
      ],
    }),
  ],
})
export class CdcFeatureModule {}
