/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';

import { CART_NORMALIZER } from '@spartacus/cart/base/root';
import { NgModule } from '@angular/core';
import { OPF_GIFT_CARD_FEATURE } from './feature-name';
import { ORDER_NORMALIZER } from '@spartacus/order/root';
import { OpfGiftCardApplyModule } from './components/opf-gift-card-apply';
import { OpfGiftCardCartOccNormalizer } from './normalizers';
import { OpfGiftCardCheckoutModule } from './components/opf-gift-card-checkout';
import { OpfGiftCardOrderConfirmationModule } from './components/opf-gift-card-order-confirmation';
import { OpfGiftCardOrderDetailsModule } from './components/opf-gift-card-order-details';
import { OpfGiftCardOrderOccNormalizer } from './normalizers/opf-gift-card-order-occ-normalizer';
import { defaultOccOpfGiftCardCartEndpointsConfig } from './config/default-occ-opf-gift-card-cart-config';
import { defaultOccOpfGiftCardOrderEndpointsConfig } from './config/default-occ-opf-gift-card-order-config';
import { defaultOpfGiftCardCartConfig } from './config/default-gift-card-cart-config';

export const OPF_GIFT_CARD_FEATURE_CMS_COMPONENTS: string[] = [
  'CheckoutOrderSummary',
  'OrderConfirmationTotalsComponent',
  'AccountOrderDetailsTotalsComponent',
];

export function defaultOpfGiftCardComponentsConfig() {
  const config: CmsConfig = {
    featureModules: {
      [OPF_GIFT_CARD_FEATURE]: {
        cmsComponents: OPF_GIFT_CARD_FEATURE_CMS_COMPONENTS,
      },
    },
  };
  return config;
}

@NgModule({
  imports: [
    OpfGiftCardApplyModule,
    OpfGiftCardCheckoutModule,
    OpfGiftCardOrderDetailsModule,
    OpfGiftCardOrderConfirmationModule,
  ],
  providers: [
    {
      provide: ORDER_NORMALIZER,
      useExisting: OpfGiftCardOrderOccNormalizer,
      multi: true,
    },
    {
      provide: CART_NORMALIZER,
      useExisting: OpfGiftCardCartOccNormalizer,
      multi: true,
    },
    provideDefaultConfig(defaultOccOpfGiftCardCartEndpointsConfig),
    provideDefaultConfig(defaultOccOpfGiftCardOrderEndpointsConfig),
    provideDefaultConfigFactory(defaultOpfGiftCardComponentsConfig),
    provideDefaultConfig(defaultOpfGiftCardCartConfig),
  ],
})
export class OpfGiftCardRootModule {}
