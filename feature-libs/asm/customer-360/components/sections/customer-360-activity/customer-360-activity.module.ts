/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { Customer360TableModule } from '../../customer-360-table/customer-360-table.module';
import { Customer360ActivityComponent } from './customer-360-activity.component';

@NgModule({
  imports: [CommonModule, Customer360TableModule, I18nModule],
  declarations: [Customer360ActivityComponent],
  exports: [Customer360ActivityComponent],
})
export class Customer360ActivityModule {}
