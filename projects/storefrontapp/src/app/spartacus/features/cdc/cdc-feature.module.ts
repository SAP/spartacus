/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CdcConfig, CdcRootModule, CDC_FEATURE } from '@spartacus/cdc/root';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  cdcTranslations,
  cdcTranslationChunksConfig,
} from '@spartacus/cdc/assets';
@NgModule({
  imports: [CdcRootModule],
  providers: [
    provideConfig(<CdcConfig>{
      cdc: [
        {
          baseSite: 'electronics-spa',
          javascriptUrl:
            'https://cdns.eu1.gigya.com/JS/gigya.js?apikey=3_k_wG-sllOhu2rjDEWHjG9-ncnnGAMHfkIcUKzl94weJU1Y18hITRgnTDp1LP8QdC',
          sessionExpiration: 3600,
          httpHeaderName: 'apikey',
        },
        {
          baseSite: 'powertools-spa',
          javascriptUrl:
            'https://cdns.eu1.gigya.com/JS/gigya.js?apikey=3__pAj9UsaNXJAaDi-d8xvhzNBvGXDYx0GlTg1R9YQWVgTIQbdBZzR98_y-nFZWUNl',
          sessionExpiration: 3600,
          httpHeaderName: 'apikey',
        },
      ],
    }),
    provideConfig(<CmsConfig>{
      featureModules: {
        [CDC_FEATURE]: {
          module: () => import('@spartacus/cdc').then((m) => m.CdcModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: cdcTranslations,
        chunks: cdcTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class CdcFeatureModule {}
