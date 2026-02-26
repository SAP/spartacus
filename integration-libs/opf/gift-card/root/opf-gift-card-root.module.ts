/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { IconConfig, IconResourceType } from '@spartacus/storefront';
import { OpfGiftCardComponentModule, OpfGiftCardPaymentModule } from '../components/public_api';
import {
  provideConfig,
  provideDefaultConfig
} from '@spartacus/core';

import { NgModule } from '@angular/core';
import { OpfGiftCardOccModule } from '../occ/opf-gift-card-occ.module';
import { defaultGiftCardCartOccEndpointsConfig } from '../occ/config';

@NgModule({
  imports: [OpfGiftCardOccModule, OpfGiftCardComponentModule, OpfGiftCardPaymentModule],
  providers: [
    provideDefaultConfig(defaultGiftCardCartOccEndpointsConfig),
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
  ],
})
export class OpfGiftCardRootModule {}
