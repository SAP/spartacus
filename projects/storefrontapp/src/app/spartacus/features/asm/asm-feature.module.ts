/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  asmTranslationChunksConfig,
  asmTranslations,
} from '@spartacus/asm/assets';
import {
  AsmRootModule,
  ASM_360_FEATURE,
  ASM_FEATURE,
} from '@spartacus/asm/root';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';

@NgModule({
  imports: [AsmRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ASM_FEATURE]: {
          module: () => import('@spartacus/asm').then((m) => m.AsmModule),
        },
        [ASM_360_FEATURE]: {
          module: () =>
            import('@spartacus/asm/asm-customer-360').then(
              (m) => m.AsmCustomer360Module
            ),
          dependencies: [ASM_FEATURE],
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: asmTranslations,
        chunks: asmTranslationChunksConfig,
      },
    }),
  ],
})
export class AsmFeatureModule {}
