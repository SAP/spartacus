/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';

import { Customer360ProductListingModule } from '../../customer-360-product-listing/customer-360-product-listing.module';
import { Customer360ProductInterestsComponent } from './customer-360-product-interests.component';

@NgModule({
  imports: [CommonModule, I18nModule, Customer360ProductListingModule],
  declarations: [Customer360ProductInterestsComponent],
  exports: [Customer360ProductInterestsComponent],
})
export class Customer360ProductInterestsModule {}
