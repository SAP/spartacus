/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';

import { AsmCustomerProductListingModule } from '../../asm-customer-product-listing/asm-customer-product-listing.module';
import { AsmCustomerSavedCartComponent } from './asm-customer-saved-cart.component';

@NgModule({
  imports: [CommonModule, I18nModule, AsmCustomerProductListingModule],
  declarations: [AsmCustomerSavedCartComponent],
  exports: [AsmCustomerSavedCartComponent],
})
export class AsmCustomerSavedCartModule {}
