/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { I18nConfig, provideConfig } from '@spartacus/core';
import {
  cpqquoteTranslationChunksConfig,
  cpqquoteTranslationsEn,
  cpqquoteTranslationsJa,
  cpqquoteTranslationsDe,
  cpqquoteTranslationsZh,
} from '@spartacus/cpq-quote/assets';
import { CpqQuoteRootModule } from '@spartacus/cpq-quote/root';

@NgModule({
  imports: [CpqQuoteRootModule],
  providers: [
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: cpqquoteTranslationsEn,
          ja: cpqquoteTranslationsJa,
          de: cpqquoteTranslationsDe,
          zh: cpqquoteTranslationsZh,
        },
        chunks: cpqquoteTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class CpqQuoteFeatureModule {}
