/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';

import { AsmCustomer360TableModule } from '../../asm-customer-360-table/asm-customer-360-table.module';
import { AsmCustomer360SupportTicketsComponent } from './asm-customer-360-support-tickets.component';

@NgModule({
  imports: [CommonModule, AsmCustomer360TableModule, I18nModule],
  declarations: [AsmCustomer360SupportTicketsComponent],
  exports: [AsmCustomer360SupportTicketsComponent],
})
export class AsmCustomer360SupportTicketsComponentModule {}
