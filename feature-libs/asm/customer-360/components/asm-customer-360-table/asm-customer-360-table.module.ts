/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArgsModule } from '@spartacus/asm/core';
import { I18nModule } from '@spartacus/core';
import { StarRatingModule } from '@spartacus/storefront';
import { AsmCustomer360TableComponent } from './asm-customer-360-table.component';

@NgModule({
  imports: [CommonModule, I18nModule, ArgsModule, StarRatingModule],
  declarations: [AsmCustomer360TableComponent],
  exports: [AsmCustomer360TableComponent],
})
export class AsmCustomer360TableModule {}
