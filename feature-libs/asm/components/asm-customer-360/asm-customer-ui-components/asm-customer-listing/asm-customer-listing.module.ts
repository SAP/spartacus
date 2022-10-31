/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@spartacus/storefront';
import { AsmCustomerListingComponent } from './asm-customer-listing.component';

@NgModule({
  imports: [CommonModule, FormsModule, IconModule],
  declarations: [AsmCustomerListingComponent],
  exports: [AsmCustomerListingComponent],
})
export class AsmCustomerListingModule {}
