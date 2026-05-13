/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';

import { CART_NORMALIZER } from '@spartacus/cart/base/root';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { OPF_GIFT_CARD_FEATURE } from './feature-name';
import { ORDER_NORMALIZER } from '@spartacus/order/root';
import { OpfGiftCardApplyModule } from './components/opf-gift-card-apply';
import { OpfGiftCardCartOccNormalizer } from './normalizers';
import { OpfGiftCardCheckoutModule } from './components/opf-gift-card-checkout';
import { OpfGiftCardOrderConfirmationModule } from './components/opf-gift-card-order-confirmation';
import { OpfGiftCardOrderDetailsModule } from './components/opf-gift-card-order-details';
import { OpfGiftCardOrderOccNormalizer } from './normalizers/opf-gift-card-order-occ-normalizer';
import { OpfGiftCardPaymentApiInterceptor } from './http-interceptors';

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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OpfGiftCardPaymentApiInterceptor,
      multi: true,
    },
    provideDefaultConfigFactory(defaultOpfGiftCardComponentsConfig),
  ],
})
export class OpfGiftCardRootModule {}
