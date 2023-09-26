/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { Customer360ProductItemModule } from '../customer-360-product-item/customer-360-product-item.module';

import { Customer360ProductListingComponent } from './customer-360-product-listing.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    MediaModule,
    Customer360ProductItemModule,
  ],
  declarations: [Customer360ProductListingComponent],
  exports: [Customer360ProductListingComponent],
})
export class Customer360ProductListingModule {}
