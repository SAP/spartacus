/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  asmTranslationChunksConfig,
  asmTranslations,
} from '@commerce-storefront-toolset/asm/assets';
import { AsmRootModule, ASM_FEATURE } from '@commerce-storefront-toolset/asm/root';
import { CmsConfig, I18nConfig, provideConfig } from '@commerce-storefront-toolset/core';

@NgModule({
  imports: [AsmRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ASM_FEATURE]: {
          module: () => import('@commerce-storefront-toolset/asm').then((m) => m.AsmModule),
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
