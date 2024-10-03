/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  asmCustomer360TranslationChunksConfig,
  asmCustomer360Translations,
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
        resources: asmCustomer360Translations,
        chunks: asmCustomer360TranslationChunksConfig,
      },
    }),
  ],
})
export class AsmCustomer360FeatureModule {}
