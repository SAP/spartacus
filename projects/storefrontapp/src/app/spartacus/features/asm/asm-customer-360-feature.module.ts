/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  asmCustomer360TranslationChunksConfig,
  asmCustomer360TranslationsEn,
  asmCustomer360TranslationsJa,
  asmCustomer360TranslationsDe,
  asmCustomer360TranslationsZh,
} from '@spartacus/asm/customer-360/assets';
import {
  AsmCustomer360RootModule,
  ASM_CUSTOMER_360_FEATURE,
} from '@spartacus/asm/customer-360/root';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';

@NgModule({
  imports: [AsmCustomer360RootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ASM_CUSTOMER_360_FEATURE]: {
          module: () =>
            import('@spartacus/asm/customer-360').then(
              (m) => m.AsmCustomer360Module
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: asmCustomer360TranslationsEn,
          ja: asmCustomer360TranslationsJa,
          de: asmCustomer360TranslationsDe,
          zh: asmCustomer360TranslationsZh,
        },
        chunks: asmCustomer360TranslationChunksConfig,
      },
    }),
  ],
})
export class AsmCustomer360FeatureModule {}
