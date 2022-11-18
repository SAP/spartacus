/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  opfTranslationChunksConfig,
  opfTranslations,
} from '@spartacus/opf/assets';
import {
  OpfRootModule,
  OPF_FEATURE,
} from '@spartacus/opf/root';

@NgModule({
  imports: [OpfRootModule],
  providers: [
    provideConfig(<I18nConfig>{
      i18n: {
        resources: opfTranslations,
        chunks: opfTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),

    provideConfig(<CmsConfig>{
      featureModules: {
        [OPF_FEATURE]: {
          module: () =>
            import('@spartacus/opf').then(
              (m) => m.OpfModule
            ),
        },
      },
    }),
  ],
})
export class OpfFeatureModule {}
