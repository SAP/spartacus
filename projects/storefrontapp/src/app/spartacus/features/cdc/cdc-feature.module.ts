/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
          javascriptUrl: 'JS_SDK_URL_PLACEHOLDER',
          sessionExpiration: 3600,
        },
        {
          baseSite: 'powertools-spa',
          javascriptUrl: 'JS_SDK_URL_PLACEHOLDER',
          sessionExpiration: 3600,
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
