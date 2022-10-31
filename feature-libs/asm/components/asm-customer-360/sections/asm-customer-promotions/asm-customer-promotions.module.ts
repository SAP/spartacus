/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AsmCustomerListingModule } from '../../asm-customer-ui-components/asm-customer-listing/asm-customer-listing.module';
import { AsmCustomerPromotionsComponent } from './asm-customer-promotions.component';

@NgModule({
  imports: [CommonModule, AsmCustomerListingModule],
  declarations: [AsmCustomerPromotionsComponent],
  exports: [AsmCustomerPromotionsComponent],
})
export class AsmCustomerPromotionsModule {}
