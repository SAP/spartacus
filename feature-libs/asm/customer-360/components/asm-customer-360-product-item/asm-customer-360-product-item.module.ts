/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { AsmCustomer360ProductItemComponent } from './asm-customer-360-product-item.component';

@NgModule({
  imports: [CommonModule, MediaModule, I18nModule],
  declarations: [AsmCustomer360ProductItemComponent],
  exports: [AsmCustomer360ProductItemComponent],
})
export class AsmCustomer360ProductItemModule {}
