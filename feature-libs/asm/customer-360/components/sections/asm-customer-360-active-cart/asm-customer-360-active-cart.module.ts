/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';

import { AsmCustomer360ProductListingModule } from '../../asm-customer-360-product-listing/asm-customer-360-product-listing.module';
import { AsmCustomer360ActiveCartComponent } from './asm-customer-360-active-cart.component';

@NgModule({
  imports: [CommonModule, I18nModule, AsmCustomer360ProductListingModule],
  declarations: [AsmCustomer360ActiveCartComponent],
  exports: [AsmCustomer360ActiveCartComponent],
})
export class AsmCustomer360ActiveCartModule {}
