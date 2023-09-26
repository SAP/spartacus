/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { Customer360PromotionComponent } from './customer-360-promotion.component';
import { Customer360PromotionListingModule } from '../../customer-360-promotion-listing/customer-360-promotion-listing.module';

@NgModule({
  imports: [CommonModule, Customer360PromotionListingModule, I18nModule],
  declarations: [Customer360PromotionComponent],
  exports: [Customer360PromotionComponent],
})
export class Customer360PromotionComponentModule {}
