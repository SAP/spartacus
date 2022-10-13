/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { RouterModule } from '@angular/router';
import {
  asmTranslationChunksConfig,
  asmTranslations,
} from '@spartacus/asm/assets';
import { AsmRootModule, ASM_FEATURE } from '@spartacus/asm/root';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { DeepLinkGuard } from 'feature-libs/asm/root/deep-link/deep-link.guard';

@NgModule({
  imports: [
    AsmRootModule,
    RouterModule.forChild([
      {
        path: '**',
        canActivate: [CmsPageGuard, DeepLinkGuard],
        component: PageLayoutComponent,
      },
    ]),
  ],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ASM_FEATURE]: {
          module: () => import('@spartacus/asm').then((m) => m.AsmModule),
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
