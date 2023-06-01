/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Provider } from '@angular/core';
import { I18nConfig, RoutingConfig, provideConfig } from '@spartacus/core';
import {
  opfTranslationChunksConfig,
  opfTranslations,
} from '@spartacus/opf/assets';
import {
  OPF_FEATURE,
  OpfConfig,
  OpfRootModule,
  defaultB2BOPFCheckoutConfig,
  defaultOPFCheckoutConfig,
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
    provideConfig(<RoutingConfig>{
      routing: {
        routes: {
          paymentVerificationResult: {
            paths: ['redirect/success'],
          },
          paymentVerificationCancel: {
            paths: ['redirect/failure'],
          },
        },
      },
    }),
    provideConfig(<OpfConfig>{
      opf: {
        baseUrl:
          'https://opf-iss-d0.api.commerce.stage.context.cloud.sap/commerce-cloud-adapter/storefront',
        commerceCloudPublicKey: 'ab4RhYGZ+w5B0SALMPOPlepWk/kmDQjTy2FU5hrQoFg=',
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: opfTranslations,
        chunks: opfTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    provideConfig({
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
