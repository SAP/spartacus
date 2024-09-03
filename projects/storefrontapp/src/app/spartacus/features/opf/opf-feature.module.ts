/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Provider } from '@angular/core';
import { I18nConfig, RoutingConfig, provideConfig } from '@spartacus/core';
import {
  OPF_BASE_FEATURE,
  OpfBaseRootModule,
  OpfConfig,
} from '@spartacus/opf/base/root';
import {
  opfCheckoutTranslationChunksConfig,
  opfCheckoutTranslations,
} from '@spartacus/opf/checkout/assets';
import {
  defaultOpfCheckoutB2bConfig,
  defaultOpfCheckoutConfig,
} from '@spartacus/opf/checkout/root';
import {
  opfPaymentTranslationChunksConfig,
  opfPaymentTranslations,
} from '@spartacus/opf/payment/assets';

import { OPF_PAYMENT_FEATURE } from '@spartacus/opf/payment/root';
import { OPF_CTA_FEATURE } from 'integration-libs/opf/cta/root/feature-name';
import { OPF_GLOBAL_FUNCTIONS_FEATURE } from 'integration-libs/opf/global-functions/root/feature-name';
import { environment } from '../../../../environments/environment';

const extensionProviders: Provider[] = [];
if (environment.b2b) {
  extensionProviders.push(provideConfig(defaultOpfCheckoutB2bConfig));
} else {
  extensionProviders.push(provideConfig(defaultOpfCheckoutConfig));
}

@NgModule({
  imports: [OpfBaseRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [OPF_BASE_FEATURE]: {
          module: () =>
            import('@spartacus/opf/base').then((m) => m.OpfBaseModule),
        },
        [OPF_PAYMENT_FEATURE]: {
          module: () =>
            import('@spartacus/opf/payment').then((m) => m.OpfPaymentModule),
        },
        [OPF_CTA_FEATURE]: {
          module: () =>
            import('@spartacus/opf/cta').then((m) => m.OpfCtaModule),
        },
        [OPF_GLOBAL_FUNCTIONS_FEATURE]: {
          module: () =>
            import('@spartacus/opf/global-functions').then(
              (m) => m.OpfGlobalFunctionsModule
            ),
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
          'https://opf-iss-d0.opf.commerce.stage.context.cloud.sap/commerce-cloud-adapter/storefront',
        commerceCloudPublicKey: 'ab4RhYGZ+w5B0SALMPOPlepWk/kmDQjTy2FU5hrQoFg=',
      },
    }),
    ...extensionProviders,
  ],
})
export class OpfFeatureModule {}
