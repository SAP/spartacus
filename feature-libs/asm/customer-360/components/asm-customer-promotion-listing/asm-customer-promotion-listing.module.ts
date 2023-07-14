/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArgsModule } from '@spartacus/asm/core';
import { I18nModule } from '@spartacus/core';
import { StarRatingModule } from '@spartacus/storefront';
import { AsmCustomerPromotionListingComponent } from './asm-customer-promotion-listing.component';

@NgModule({
  imports: [CommonModule, I18nModule, ArgsModule, StarRatingModule],
  declarations: [AsmCustomerPromotionListingComponent],
  exports: [AsmCustomerPromotionListingComponent],
})
export class AsmCustomerPromotionListingModule {}
