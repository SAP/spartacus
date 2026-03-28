/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  CmsConfig,
  ConfigModule,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { OpfGiftCardComponentsModule } from '../components/opf-gift-card-components.module';
import { defaultGiftCardCartOccEndpointsConfig } from '../occ/config';
import { defaultOccOpfGiftCardOrderEndpointsConfig } from '../occ/config/default-occ-opf-gift-card-order-config';
import { defaultOpfGiftCardCartConfig } from './config/default-gift-card-cart-config';
import { opfGiftCardIconConfig } from './config/opf-gift-card-icon.config';
import { OPF_GIFT_CARD_FEATURE } from './feature-name';

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
    OpfGiftCardComponentsModule,
    ConfigModule.withConfig(opfGiftCardIconConfig),
  ],
  providers: [
    provideDefaultConfig(defaultGiftCardCartOccEndpointsConfig),
    provideDefaultConfig(defaultOccOpfGiftCardOrderEndpointsConfig),
    provideDefaultConfig(defaultOpfGiftCardCartConfig),
    provideDefaultConfigFactory(defaultOpfGiftCardComponentsConfig),
  ],
})
export class OpfGiftCardRootModule {}
