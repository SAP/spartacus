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
import { Customer360TableComponent } from './customer-360-table.component';

@NgModule({
  imports: [CommonModule, I18nModule, ArgsModule, StarRatingModule],
  declarations: [Customer360TableComponent],
  exports: [Customer360TableComponent],
})
export class Customer360TableModule {}
