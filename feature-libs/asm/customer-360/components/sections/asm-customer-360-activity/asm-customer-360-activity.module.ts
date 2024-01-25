/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { AsmCustomer360TableModule } from '../../asm-customer-360-table/asm-customer-360-table.module';
import { AsmCustomer360ActivityComponent } from './asm-customer-360-activity.component';

@NgModule({
  imports: [CommonModule, AsmCustomer360TableModule, I18nModule],
  declarations: [AsmCustomer360ActivityComponent],
  exports: [AsmCustomer360ActivityComponent],
})
export class AsmCustomer360ActivityModule {}
