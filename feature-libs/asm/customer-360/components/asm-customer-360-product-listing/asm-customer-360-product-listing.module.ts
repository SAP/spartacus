/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { AsmCustomer360ProductItemModule } from '../asm-customer-360-product-item/asm-customer-360-product-item.module';

import { AsmCustomer360ProductListingComponent } from './asm-customer-360-product-listing.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    MediaModule,
    AsmCustomer360ProductItemModule,
  ],
  declarations: [AsmCustomer360ProductListingComponent],
  exports: [AsmCustomer360ProductListingComponent],
})
export class AsmCustomer360ProductListingModule {}
