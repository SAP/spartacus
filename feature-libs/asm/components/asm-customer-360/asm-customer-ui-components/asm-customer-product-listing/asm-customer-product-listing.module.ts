/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';

import { AsmCustomerProductListingComponent } from './asm-customer-product-listing.component';
import { AsmProductItemComponent } from './asm-product-item/asm-product-item.component';

@NgModule({
  imports: [CommonModule, I18nModule, MediaModule],
  declarations: [AsmCustomerProductListingComponent, AsmProductItemComponent],
  exports: [AsmCustomerProductListingComponent],
})
export class AsmCustomerProductListingModule {}
