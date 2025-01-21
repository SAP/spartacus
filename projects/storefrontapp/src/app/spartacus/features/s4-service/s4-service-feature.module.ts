/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  s4ServiceTranslationChunksConfig,
  s4ServiceTranslations,
} from '@spartacus/s4-service/assets';
import {
  S4ServiceRootModule,
  S4_SERVICE_FEATURE,
} from '@spartacus/s4-service/root';

@NgModule({
  imports: [S4ServiceRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [S4_SERVICE_FEATURE]: {
          module: () =>
            import('@spartacus/s4-service').then((m) => m.S4ServiceModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: s4ServiceTranslations,
        chunks: s4ServiceTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class S4ServiceFeatureModule {}
