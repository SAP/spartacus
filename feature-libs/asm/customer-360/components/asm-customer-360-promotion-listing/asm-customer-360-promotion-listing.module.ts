/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArgsModule } from '@spartacus/asm/core';
import { I18nModule } from '@spartacus/core';
import {
  StarRatingModule,
  IconModule,
  MessageComponentModule,
} from '@spartacus/storefront';
import { AsmCustomer360PromotionListingComponent } from './asm-customer-360-promotion-listing.component';

@NgModule({
  declarations: [AsmCustomer360PromotionListingComponent],
  exports: [AsmCustomer360PromotionListingComponent],
  imports: [
    CommonModule,
    I18nModule,
    ArgsModule,
    StarRatingModule,
    MessageComponentModule,
    IconModule,
  ],
})
export class AsmCustomer360PromotionListingModule {}
