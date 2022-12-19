/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Provider } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  opfTranslationChunksConfig,
  opfTranslations,
} from '@spartacus/opf/assets';
import {
  defaultB2BOPFCheckoutConfig,
  defaultOPFCheckoutConfig,
  OpfRootModule,
  OPF_FEATURE,
} from '@spartacus/opf/root';
import { environment } from '../../../../environments/environment';

const extensionProviders: Provider[] = [];
if (environment.b2b) {
  extensionProviders.push(provideConfig(defaultB2BOPFCheckoutConfig));
} else {
  extensionProviders.push(provideConfig(defaultOPFCheckoutConfig));
}

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
          module: () => import('@spartacus/opf').then((m) => m.OpfModule),
        },
      },
    }),

    ...extensionProviders,
  ],
})
export class OpfFeatureModule {}
