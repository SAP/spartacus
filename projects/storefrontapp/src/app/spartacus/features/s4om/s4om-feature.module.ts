/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  s4omTranslationChunksConfig,
  s4omTranslationsEn,
  s4omTranslationsJa,
  s4omTranslationsDe,
  s4omTranslationsZh,
} from '@spartacus/s4om/assets';
import { S4OM_FEATURE, S4omRootModule } from '@spartacus/s4om/root';

@NgModule({
  imports: [S4omRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [S4OM_FEATURE]: {
          module: () => import('@spartacus/s4om').then((m) => m.S4omModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: s4omTranslationsEn,
          ja: s4omTranslationsJa,
          de: s4omTranslationsDe,
          zh: s4omTranslationsZh,
        },
        chunks: s4omTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class S4OMFeatureModule {}
