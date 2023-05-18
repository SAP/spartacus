/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Provider } from '@angular/core';
import { I18nConfig, provideConfig, RoutingConfig } from '@spartacus/core';
import {
  opfCheckoutTranslationChunksConfig,
  opfCheckoutTranslations,
} from '@spartacus/opf/checkout/assets';
import {
  defaultB2BOPFCheckoutConfig,
  defaultOPFCheckoutConfig,
  OpfConfig,
} from '@spartacus/opf/checkout/root';
import {
  opfPaymentTranslationChunksConfig,
  opfPaymentTranslations,
} from '@spartacus/opf/payment/assets';
import {
  OpfPaymentRootModule,
  OPF_PAYMENT_FEATURE,
} from '@spartacus/opf/payment/root';

import { environment } from '../../../../environments/environment';

const extensionProviders: Provider[] = [];
if (environment.b2b) {
  extensionProviders.push(provideConfig(defaultB2BOPFCheckoutConfig));
} else {
  extensionProviders.push(provideConfig(defaultOPFCheckoutConfig));
}

@NgModule({
  imports: [OpfPaymentRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [OPF_PAYMENT_FEATURE]: {
          module: () =>
            import('@spartacus/opf/payment').then((m) => m.OpfPaymentModule),
        },
      },
    }),

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
    provideConfig(<I18nConfig>{
      i18n: {
        resources: opfCheckoutTranslations,
        chunks: opfCheckoutTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: opfPaymentTranslations,
        chunks: opfPaymentTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    provideConfig(<OpfConfig>{
      opf: {
        baseUrl:
          'https://opf-dev.api.commerce.stage.context.cloud.sap/commerce-cloud-adapter/storefront',
        commerceCloudPublicKey: 'ab4RhYGZ+w5B0SALMPOPlepWk/kmDQjTy2FU5hrQoFg=',
      },
    }),
    ...extensionProviders,
  ],
})
export class OpfFeatureModule {}
