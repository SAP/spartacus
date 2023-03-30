/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';

import { AsmCustomerTableModule } from '../../asm-customer-table/asm-customer-table.module';
import { AsmCustomerSupportTicketsComponent } from './asm-customer-support-tickets.component';

@NgModule({
  imports: [CommonModule, AsmCustomerTableModule, I18nModule],
  declarations: [AsmCustomerSupportTicketsComponent],
  exports: [AsmCustomerSupportTicketsComponent],
})
export class AsmCustomerSupportTicketsComponentModule {}
