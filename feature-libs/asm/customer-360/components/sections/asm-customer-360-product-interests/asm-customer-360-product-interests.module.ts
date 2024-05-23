/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';

import { AsmCustomer360ProductListingModule } from '../../asm-customer-360-product-listing/asm-customer-360-product-listing.module';
import { AsmCustomer360ProductInterestsComponent } from './asm-customer-360-product-interests.component';

@NgModule({
  imports: [CommonModule, I18nModule, AsmCustomer360ProductListingModule],
  declarations: [AsmCustomer360ProductInterestsComponent],
  exports: [AsmCustomer360ProductInterestsComponent],
})
export class AsmCustomer360ProductInterestsModule {}
