/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { cdpTranslationChunksConfig, cdpTranslations } from '@spartacus/cdp/assets';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import { CdpRootModule } from 'integration-libs/cdp/cdp-root.module';
import { CDP_FEATURE } from 'integration-libs/cdp/root/feature-name';

@NgModule({
  imports: [CdpRootModule],
  providers: [
    provideConfig(<I18nConfig>{
      i18n: {
        resources: cdpTranslations,
        chunks: cdpTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    provideConfig(<CmsConfig>{
      featureModules: {
        [CDP_FEATURE]: {
          module: () => import('@spartacus/cdp').then((m) => m.CdpRootModule),
        },
      },
    }),
  ],
})
export class CdpFeatureModule {}
