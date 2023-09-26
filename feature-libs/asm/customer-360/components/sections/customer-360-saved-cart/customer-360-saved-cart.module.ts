/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';

import { Customer360ProductListingModule } from '../../customer-360-product-listing/customer-360-product-listing.module';
import { Customer360SavedCartComponent } from './customer-360-saved-cart.component';

@NgModule({
  imports: [CommonModule, I18nModule, Customer360ProductListingModule],
  declarations: [Customer360SavedCartComponent],
  exports: [Customer360SavedCartComponent],
})
export class Customer360SavedCartModule {}
