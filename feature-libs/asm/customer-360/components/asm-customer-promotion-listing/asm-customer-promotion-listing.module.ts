/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
  SearchBoxModule,
} from '@spartacus/storefront';
import { AsmCustomerPromotionListingComponent } from './asm-customer-promotion-listing.component';

@NgModule({
  declarations: [AsmCustomerPromotionListingComponent],
  exports: [AsmCustomerPromotionListingComponent],
  imports: [
    CommonModule,
    I18nModule,
    ArgsModule,
    StarRatingModule,
    MessageComponentModule,
    IconModule,
    SearchBoxModule,
  ],
})
export class AsmCustomerPromotionListingModule {}
