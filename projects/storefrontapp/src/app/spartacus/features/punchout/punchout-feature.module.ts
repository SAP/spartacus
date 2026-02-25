/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { I18nConfig, provideConfig } from '@spartacus/core';
import {
  punchoutTranslationChunksConfig,
  punchoutTranslationsDe,
  punchoutTranslationsEn,
  punchoutTranslationsJa,
  punchoutTranslationsZh,
} from '@spartacus/punchout/assets';
import { PUNCHOUT_FEATURE, PunchoutRootModule } from '@spartacus/punchout/root';

@NgModule({
  imports: [PunchoutRootModule],
  providers: [
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: punchoutTranslationsEn,
          ja: punchoutTranslationsJa,
          de: punchoutTranslationsDe,
          zh: punchoutTranslationsZh,
        },
        chunks: punchoutTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    provideConfig({
      featureModules: {
        [PUNCHOUT_FEATURE]: {
          module: () =>
            import('@spartacus/punchout').then((m) => m.PunchoutModule),
        },
      },
    }),
  ],
})
export class PunchoutFeatureModule {}
