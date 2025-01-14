/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Provider } from '@angular/core';
import { I18nConfig, provideConfig } from '@spartacus/core';
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
  OPF_CHECKOUT_FEATURE,
  OpfCheckoutRootModule,
  defaultOpfCheckoutB2bConfig,
  defaultOpfCheckoutConfig,
} from '@spartacus/opf/checkout/root';
import {
  opfPaymentTranslationChunksConfig,
  opfPaymentTranslations,
} from '@spartacus/opf/payment/assets';

import { OPF_CTA_FEATURE, OpfCtaRootModule } from '@spartacus/opf/cta/root';
import {
  OPF_GLOBAL_FUNCTIONS_FEATURE,
  OpfGlobalFunctionsRootModule,
} from '@spartacus/opf/global-functions/root';
import {
  OPF_PAYMENT_FEATURE,
  OpfPaymentRootModule,
} from '@spartacus/opf/payment/root';
import {
  OPF_GOOGLE_PAY_PROVIDER_NAME,
  OPF_QUICK_BUY_FEATURE,
  OpfQuickBuyConfig,
  OpfQuickBuyGooglePayProvider,
  OpfQuickBuyRootModule,
} from '@spartacus/opf/quick-buy/root';
import { environment } from '../../../../environments/environment';

const extensionProviders: Provider[] = [];
if (environment.b2b) {
  extensionProviders.push(provideConfig(defaultOpfCheckoutB2bConfig));
} else {
  extensionProviders.push(provideConfig(defaultOpfCheckoutConfig));
}

@NgModule({
  imports: [
    OpfBaseRootModule,
    OpfPaymentRootModule,
    OpfCheckoutRootModule,
    OpfCtaRootModule,
    OpfGlobalFunctionsRootModule,
    OpfQuickBuyRootModule,
  ],
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
        [OPF_CHECKOUT_FEATURE]: {
          module: () =>
            import('@spartacus/opf/checkout').then((m) => m.OpfCheckoutModule),
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
        [OPF_QUICK_BUY_FEATURE]: {
          module: () =>
            import('@spartacus/opf/quick-buy').then((m) => m.OpfQuickBuyModule),
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
        opfBaseUrl:
          'https://opf-iss-d0.opf.commerce.stage.context.cloud.sap/commerce-cloud-adapter/storefront/',
        commerceCloudPublicKey: 'ab4RhYGZ+w5B0SALMPOPlepWk/kmDQjTy2FU5hrQoFg=',
      },
    }),
    provideConfig(<OpfQuickBuyConfig>{
      providers: {
        [OPF_GOOGLE_PAY_PROVIDER_NAME]: {
          resourceUrl: 'https://pay.google.com/gp/p/js/pay.js',
        } as OpfQuickBuyGooglePayProvider,
      },
    }),
    ...extensionProviders,
  ],
})
export class OpfFeatureModule {}
