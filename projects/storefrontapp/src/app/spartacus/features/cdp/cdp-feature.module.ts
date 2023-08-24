/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  cdpTranslations,
  cdpTranslationChunksConfig,
} from 'integration-libs/cdp/assets/public_api';
import { CDP_FEATURE } from 'integration-libs/cdp/feature-name';

@NgModule({
  imports: [],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [CDP_FEATURE]: {
          module: () => import('@spartacus/cdp').then((m) => m.CdpModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: cdpTranslations,
        chunks: cdpTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class CdpFeatureModule {}
