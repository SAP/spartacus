/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CmsConfig,
  ConfigModule,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { OpfGiftCardCheckoutModule, OpfGiftCardOrderConfirmationModule, OpfGiftCardOrderDetailsModule } from './components';

import { NgModule } from '@angular/core';
import { OPF_GIFT_CARD_FEATURE } from './feature-name';
import { OpfGiftCardApplyModule } from './components/opf-gift-card-apply';
import { defaultOpfGiftCardCartConfig } from './config/default-gift-card-cart-config';
import { opfGiftCardIconConfig } from './config/opf-gift-card-icon.config';

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
    ConfigModule.withConfig(opfGiftCardIconConfig),
    OpfGiftCardApplyModule,OpfGiftCardCheckoutModule,OpfGiftCardOrderDetailsModule,OpfGiftCardOrderConfirmationModule
  ],
  providers: [
    provideDefaultConfigFactory(defaultOpfGiftCardComponentsConfig),
    provideDefaultConfig(defaultOpfGiftCardCartConfig),
  ],
})
export class OpfGiftCardRootModule {}
