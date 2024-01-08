/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { CardModule } from '@spartacus/storefront';
import { AsmCustomer360ProfileComponent } from './asm-customer-360-profile.component';

@NgModule({
  imports: [CardModule, CommonModule, I18nModule],
  declarations: [AsmCustomer360ProfileComponent],
  exports: [AsmCustomer360ProfileComponent],
})
export class AsmCustomer360ProfileModule {}
