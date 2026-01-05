/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Provider, Type } from '@angular/core';
import {
  checkoutB2BTranslationChunksConfig,
  checkoutB2BTranslationsEn,
  checkoutB2BTranslationsJa,
  checkoutB2BTranslationsDe,
  checkoutB2BTranslationsZh,
} from '@spartacus/checkout/b2b/assets';
import { CheckoutB2BRootModule } from '@spartacus/checkout/b2b/root';
import {
  checkoutTranslationChunksConfig,
  checkoutTranslationsEn,
  checkoutTranslationsJa,
  checkoutTranslationsDe,
  checkoutTranslationsZh,
} from '@spartacus/checkout/base/assets';
import {
  CHECKOUT_FEATURE,
  CheckoutRootModule,
} from '@spartacus/checkout/base/root';
import {
  checkoutScheduledReplenishmentTranslationChunksConfig,
  checkoutScheduledReplenishmentTranslationsEn,
  checkoutScheduledReplenishmentTranslationsJa,
  checkoutScheduledReplenishmentTranslationsDe,
  checkoutScheduledReplenishmentTranslationsZh,
} from '@spartacus/checkout/scheduled-replenishment/assets';
import { CheckoutScheduledReplenishmentRootModule } from '@spartacus/checkout/scheduled-replenishment/root';
import { provideConfig } from '@spartacus/core';
import { environment } from '../../../../environments/environment';

const extensionModules: Type<any>[] = [];
const extensionProviders: Provider[] = [];

if (environment.b2b) {
  extensionModules.push(
    CheckoutB2BRootModule,
    CheckoutScheduledReplenishmentRootModule
  );

  extensionProviders.push(
    provideConfig({
      i18n: {
        resources: {
          en: checkoutB2BTranslationsEn,
          ja: checkoutB2BTranslationsJa,
          de: checkoutB2BTranslationsDe,
          zh: checkoutB2BTranslationsZh,
        },
        chunks: checkoutB2BTranslationChunksConfig,
      },
    })
  );
  extensionProviders.push(
    provideConfig({
      i18n: {
        resources: {
          en: checkoutScheduledReplenishmentTranslationsEn,
          ja: checkoutScheduledReplenishmentTranslationsJa,
          de: checkoutScheduledReplenishmentTranslationsDe,
          zh: checkoutScheduledReplenishmentTranslationsZh,
        },
        chunks: checkoutScheduledReplenishmentTranslationChunksConfig,
      },
    })
  );
}

@NgModule({
  imports: [CheckoutRootModule, ...extensionModules],
  providers: [
    provideConfig({
      featureModules: {
        [CHECKOUT_FEATURE]: {
          module: () =>
            import('./checkout-wrapper.module').then(
              (m) => m.CheckoutWrapperModule
            ),
        },
      },
    }),
    provideConfig({
      i18n: {
        resources: {
          en: checkoutTranslationsEn,
          ja: checkoutTranslationsJa,
          de: checkoutTranslationsDe,
          zh: checkoutTranslationsZh,
        },
        chunks: checkoutTranslationChunksConfig,
      },
    }),
    provideConfig({
      checkout: {
        guest: true,
      },
    }),
    ...extensionProviders,
  ],
})
export class CheckoutFeatureModule {}
