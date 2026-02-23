/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { IconConfig, IconResourceType } from '@spartacus/storefront';
import {
  OpfGiftCardComponentModule,
  OpfGiftCardPaymentModule,
} from '../components/public_api';

import { NgModule } from '@angular/core';
import { OpfGiftCardOccModule } from '../occ/opf-gift-card-occ.module';
import { defaultGiftCardCartOccEndpointsConfig } from '../occ/config';
import { provideConfig } from '@spartacus/core';

export const GIFT_CARD_OPF_CMS_COMPONENTS: string[] = [
  'GiftCardComponent',
  'AppliedGiftCardComponent',
  'GiftCardOrderSummaryComponent',
];

// export function defaultOpfGiftCardComponentsConfig() {
//   const config: CmsConfig = {
//     featureModules: {
//       [OPF_GIFT_CARD_FEATURE]: {
//         cmsComponents: GIFT_CARD_OPF_CMS_COMPONENTS,
//       },
//     },
//   };
//   return config;
// }

@NgModule({
  imports: [
    OpfGiftCardOccModule,
    OpfGiftCardComponentModule,
    OpfGiftCardPaymentModule,
  ],
  providers: [
    provideConfig(defaultGiftCardCartOccEndpointsConfig),
    // provideDefaultConfigFactory(defaultOpfGiftCardComponentsConfig),
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
