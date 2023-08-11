/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { AsmCustomerPromotionComponent } from './asm-customer-promotion.component';
import { AsmCustomerPromotionListingModule } from '../../asm-customer-promotion-listing/asm-customer-promotion-listing.module';

@NgModule({
  imports: [CommonModule, AsmCustomerPromotionListingModule, I18nModule],
  declarations: [AsmCustomerPromotionComponent],
  exports: [AsmCustomerPromotionComponent],
})

export class AsmCustomerPromotionComponentModule {}