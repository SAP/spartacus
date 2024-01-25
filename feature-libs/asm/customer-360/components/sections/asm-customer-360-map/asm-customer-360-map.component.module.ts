/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';

import { AsmCustomer360MapComponent } from './asm-customer-360-map.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [AsmCustomer360MapComponent],
  exports: [AsmCustomer360MapComponent],
})
export class AsmCustomer360MapComponentModule {}
