/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CmsConfig, ConfigModule, provideDefaultConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { IconConfig, IconResourceType } from '@spartacus/storefront';

import { NgModule } from '@angular/core';
import { OPF_GIFT_CARD_FEATURE } from './feature-name';
import { OpfGiftCardComponentsModule } from '../components/opf-gift-card-components.module';
import { defaultGiftCardCartOccEndpointsConfig } from '../occ/config';
import { defaultOccOpfGiftCardOrderEndpointsConfig } from '../occ/config/default-occ-opf-gift-card-order-config';
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
    OpfGiftCardComponentsModule,
    ConfigModule.withConfig({
      icon: {
        symbols: {
          GIFT_CARD: 'gift-card-icon',
        },
        resources: [
          {
            type: IconResourceType.SVG,
            url: './assets/icons/opf-gift-card.svg',
            types: ['GIFT_CARD'],
          },
        ],
      },
    } as IconConfig),
  ],
  providers: [
    provideDefaultConfig(defaultGiftCardCartOccEndpointsConfig),
    provideDefaultConfig(defaultOccOpfGiftCardOrderEndpointsConfig),
    provideDefaultConfig(defaultOpfGiftCardCartConfig),
    provideDefaultConfigFactory(defaultOpfGiftCardComponentsConfig),
  ],
})
export class OpfGiftCardRootModule {}
