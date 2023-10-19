/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { AsmCustomer360PromotionComponent } from './asm-customer-360-promotion.component';
import { AsmCustomer360PromotionListingModule } from '../../asm-customer-360-promotion-listing/asm-customer-360-promotion-listing.module';

@NgModule({
  imports: [CommonModule, AsmCustomer360PromotionListingModule, I18nModule],
  declarations: [AsmCustomer360PromotionComponent],
  exports: [AsmCustomer360PromotionComponent],
})
export class AsmCustomer360PromotionComponentModule {}
