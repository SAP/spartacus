/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';

import { Customer360TableModule } from '../../customer-360-table/customer-360-table.module';
import { Customer360SupportTicketsComponent } from './customer-360-support-tickets.component';

@NgModule({
  imports: [CommonModule, Customer360TableModule, I18nModule],
  declarations: [Customer360SupportTicketsComponent],
  exports: [Customer360SupportTicketsComponent],
})
export class Customer360SupportTicketsComponentModule {}
