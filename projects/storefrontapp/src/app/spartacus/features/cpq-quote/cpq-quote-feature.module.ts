/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { I18nConfig, provideConfig } from '@spartacus/core';
import {
  cpqquoteTranslations,
  cpqquoteTranslationChunksConfig,
} from '@spartacus/cpq-quote/assets';
import { CpqQuoteRootdModule } from '@spartacus/cpq-quote/root';

@NgModule({
  imports: [CpqQuoteRootdModule],
  providers: [
    provideConfig(<I18nConfig>{
      i18n: {
        resources: cpqquoteTranslations,
        chunks: cpqquoteTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class CPQQUOTEFeatureModule {}
