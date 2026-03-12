/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { IconConfig, IconResourceType } from '@spartacus/storefront';
import { provideConfig, provideDefaultConfig } from '@spartacus/core';

import { NgModule } from '@angular/core';
import { OpfGiftCardComponentsModule } from '../components/opf-gift-card-components.module';
import { defaultGiftCardCartConfig } from './config/default-gift-card-cart-config';
import { defaultGiftCardCartOccEndpointsConfig } from '../occ/config';
import { defaultOccOpfGiftCardOrderEndpointsConfig } from '../occ/config/default-occ-opf-gift-card-order-config';

@NgModule({
  imports: [OpfGiftCardComponentsModule],

  providers: [
    provideConfig({
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
    provideDefaultConfig(defaultGiftCardCartOccEndpointsConfig),
    provideDefaultConfig(defaultOccOpfGiftCardOrderEndpointsConfig),
    provideDefaultConfig(defaultGiftCardCartConfig),
  ],
})
export class OpfGiftCardRootModule {}
