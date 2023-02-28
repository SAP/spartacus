/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArgsModule } from '@spartacus/asm/core';
import { I18nModule } from '@spartacus/core';
import { StarRatingModule } from '@spartacus/storefront';
import { AsmCustomerTableComponent } from './asm-customer-table.component';

@NgModule({
  imports: [CommonModule, StarRatingModule, I18nModule, ArgsModule],
  declarations: [AsmCustomerTableComponent],
  exports: [AsmCustomerTableComponent],
})
export class AsmCustomerTableModule {}
