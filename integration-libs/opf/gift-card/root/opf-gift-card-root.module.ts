/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';

import { NgModule } from '@angular/core';
import { OPF_GIFT_CARD_FEATURE } from './feature-name';
import { OpfGiftCardComponentsModule } from '../components/public_api';
import { OpfGiftCardOccModule } from '../occ/opf-gift-card-occ.module';

export const GIFT_CARD_OPF_CMS_COMPONENTS: string[] = [
  'GiftCardComponent',
  'AppliedGiftCardComponent',
  'GiftCardOrderSummaryComponent',
];

export function defaultOpfGiftCardComponentsConfig() {
  const config: CmsConfig = {
    featureModules: {
      [OPF_GIFT_CARD_FEATURE]: {
        cmsComponents: GIFT_CARD_OPF_CMS_COMPONENTS,
      },
    },
  };
  return config;
}

@NgModule({
  imports: [OpfGiftCardOccModule, OpfGiftCardComponentsModule],
  providers: [provideDefaultConfigFactory(defaultOpfGiftCardComponentsConfig)],
})
export class OpfGiftCardRootModule {}
