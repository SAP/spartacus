/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';

import { Customer360ProductListingModule } from '../../customer-360-product-listing/customer-360-product-listing.module';
import { Customer360ActiveCartComponent } from './customer-360-active-cart.component';

@NgModule({
  imports: [CommonModule, I18nModule, Customer360ProductListingModule],
  declarations: [Customer360ActiveCartComponent],
  exports: [Customer360ActiveCartComponent],
})
export class Customer360ActiveCartModule {}
