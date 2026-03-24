/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
  opfCheckoutTranslationsDe,
  opfCheckoutTranslationsEn,
  opfCheckoutTranslationsJa,
  opfCheckoutTranslationsZh,
} from '@spartacus/opf/checkout/assets';
import {
  defaultOpfCheckoutConfig,
  OPF_CHECKOUT_FEATURE,
  OpfCheckoutRootModule,
} from '@spartacus/opf/checkout/root';
import {
  opfPaymentTranslationChunksConfig,
  opfPaymentTranslationsDe,
  opfPaymentTranslationsEn,
  opfPaymentTranslationsJa,
  opfPaymentTranslationsZh,
} from '@spartacus/opf/payment/assets';

import { OPF_CTA_FEATURE, OpfCtaRootModule } from '@spartacus/opf/cta/root';
import {
  OPF_GLOBAL_FUNCTIONS_FEATURE,
  OpfGlobalFunctionsRootModule,
  defaultOccOpfCartConfig,
} from '@spartacus/opf/global-functions/root';
import {
  OPF_PAYMENT_FEATURE,
  OpfPaymentRootModule,
} from '@spartacus/opf/payment/root';
import {
  OPF_QUICK_BUY_FEATURE,
  OpfQuickBuyRootModule,
} from '@spartacus/opf/quick-buy/root';
import { environment } from '../../../../environments/environment';
import {
  defaultOpfB2bCheckoutConfig,
  defaultOpfB2bCheckoutOccEndpointsConfig,
  OPF_B2B_CHECKOUT_FEATURE,
  OpfB2bCheckoutRootModule,
} from '@spartacus/opf/b2b-checkout/root';
import {
  OPF_TOKENISATION_FEATURE,
  OpfTokenisationRootModule,
} from '@spartacus/opf/tokenisation/root';

const extensionProviders: Provider[] = [];
if (environment.b2b) {
  extensionProviders.push(
    provideConfig(defaultOpfB2bCheckoutConfig),
    provideConfig(defaultOpfB2bCheckoutOccEndpointsConfig)
  );
} else {
  extensionProviders.push(provideConfig(defaultOpfCheckoutConfig));
}

extensionProviders.push(provideConfig(defaultOccOpfCartConfig));

@NgModule({
  imports: [
    OpfBaseRootModule,
    OpfPaymentRootModule,
    OpfCheckoutRootModule,
    OpfB2bCheckoutRootModule,
    OpfCtaRootModule,
    OpfGlobalFunctionsRootModule,
    OpfQuickBuyRootModule,
    OpfTokenisationRootModule,
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
        [OPF_B2B_CHECKOUT_FEATURE]: {
          module: () =>
            import('@spartacus/opf/b2b-checkout').then(
              (m) => m.OpfB2bCheckoutModule
            ),
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
        [OPF_TOKENISATION_FEATURE]: {
          module: () =>
            import('@spartacus/opf/tokenisation').then(
              (m) => m.OpfTokenisationModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: opfCheckoutTranslationsEn,
          ja: opfCheckoutTranslationsJa,
          de: opfCheckoutTranslationsDe,
          zh: opfCheckoutTranslationsZh,
        },
        chunks: opfCheckoutTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: opfPaymentTranslationsEn,
          ja: opfPaymentTranslationsJa,
          de: opfPaymentTranslationsDe,
          zh: opfPaymentTranslationsZh,
        },
        chunks: opfPaymentTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    provideConfig(<OpfConfig>{
      opf: {
        opfBaseUrl:
          'https://opf-iss-d0.opf.commerce.stage.context.cloud.sap/commerce-cloud-adapter/storefront',
        commerceCloudPublicKey: 'ADD_COMMERCE_CLOUD_PUBLIC_KEY_HERE',
      },
    }),
    ...extensionProviders,
  ],
})
export class OpfFeatureModule {}
