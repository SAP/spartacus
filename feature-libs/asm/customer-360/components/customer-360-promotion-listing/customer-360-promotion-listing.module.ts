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
} from '@spartacus/storefront';
import { Customer360PromotionListingComponent } from './customer-360-promotion-listing.component';

@NgModule({
  declarations: [Customer360PromotionListingComponent],
  exports: [Customer360PromotionListingComponent],
  imports: [
    CommonModule,
    I18nModule,
    ArgsModule,
    StarRatingModule,
    MessageComponentModule,
    IconModule,
  ],
})
export class Customer360PromotionListingModule {}
