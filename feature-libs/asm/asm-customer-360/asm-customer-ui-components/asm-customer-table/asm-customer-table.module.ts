/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { StarRatingModule } from '@spartacus/storefront';
import { ArgsPipe } from 'feature-libs/asm/core/utils/args/args.pipe';
import { AsmCustomerTableComponent } from './asm-customer-table.component';

@NgModule({
  imports: [CommonModule, StarRatingModule, I18nModule],
  declarations: [AsmCustomerTableComponent, ArgsPipe],
  exports: [AsmCustomerTableComponent],
})
export class AsmCustomerTableModule {}
