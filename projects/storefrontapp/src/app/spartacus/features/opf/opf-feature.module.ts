/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Provider } from '@angular/core';
import { I18nConfig, provideConfig, RoutingConfig } from '@spartacus/core';
import {
  opfTranslationChunksConfig,
  opfTranslations,
} from '@spartacus/opf/assets';
import {
  defaultB2BOPFCheckoutConfig,
  defaultOPFCheckoutConfig,
  OpfConfig,
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
    provideConfig(<RoutingConfig>{
      routing: {
        routes: {
          paymentVerificationResult: {
            paths: ['payment-result'],
          },
          paymentVerificationCancel: {
            paths: ['payment-cancel'],
          },
        },
      },
    }),
    provideConfig(<OpfConfig>{
      opf: {
        baseUrl:
          'https://opf-dev.api.commerce.stage.context.cloud.sap/commerce-cloud-adapter/storefront',
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
          cmsComponents: ['OpfPaymentVerificationComponent'],
        },
      },
    }),
    ...extensionProviders,
  ],
})
export class OpfFeatureModule {}
