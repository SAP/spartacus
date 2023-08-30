/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Provider, Type } from '@angular/core';
import {
  checkoutB2BTranslationChunksConfig,
  checkoutB2BTranslations,
} from '@spartacus/checkout/b2b/assets';
import {
  CheckoutB2BRootModule,
  defaultB2BCheckoutConfig,
} from '@spartacus/checkout/b2b/root';
import {
  checkoutTranslationChunksConfig,
  checkoutTranslations,
} from '@spartacus/checkout/base/assets';
import {
  CHECKOUT_FEATURE,
  CheckoutRootModule,
} from '@spartacus/checkout/base/root';
import {
  checkoutScheduledReplenishmentTranslationChunksConfig,
  checkoutScheduledReplenishmentTranslations,
} from '@spartacus/checkout/scheduled-replenishment/assets';
import { CheckoutScheduledReplenishmentRootModule } from '@spartacus/checkout/scheduled-replenishment/root';
import { provideConfig } from '@spartacus/core';
import { environment } from '../../../../environments/environment';

const extensionModules: Type<any>[] = [];
const extensionProviders: Provider[] = [];

extensionModules.push(CheckoutB2BRootModule);

if (environment.b2b) {
  extensionModules.push(CheckoutScheduledReplenishmentRootModule);

  extensionProviders.push(
    provideConfig({
      i18n: {
        resources: checkoutB2BTranslations,
        chunks: checkoutB2BTranslationChunksConfig,
      },
    })
  );
  extensionProviders.push(
    provideConfig({
      i18n: {
        resources: checkoutScheduledReplenishmentTranslations,
        chunks: checkoutScheduledReplenishmentTranslationChunksConfig,
      },
    })
  );
  if (!environment.opf) {
    extensionProviders.push(provideConfig(defaultB2BCheckoutConfig));
  }
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
        resources: checkoutTranslations,
        chunks: checkoutTranslationChunksConfig,
      },
    }),
    ...extensionProviders,
  ],
})
export class CheckoutFeatureModule {}
