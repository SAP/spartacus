/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { I18nConfig, provideConfig } from '@spartacus/core';
import {
  dpTranslationChunksConfig,
  dpTranslationsEn,
  dpTranslationsJa,
  dpTranslationsDe,
  dpTranslationsZh,
} from '@spartacus/digital-payments/assets';

@NgModule({
  providers: [
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: dpTranslationsEn,
          ja: dpTranslationsJa,
          de: dpTranslationsDe,
          zh: dpTranslationsZh,
        },
        chunks: dpTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class DigitalPaymentsFeatureModule {}
