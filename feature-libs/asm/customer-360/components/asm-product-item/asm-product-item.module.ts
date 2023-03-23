/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { AsmProductItemComponent } from './asm-product-item.component';

@NgModule({
  imports: [CommonModule, MediaModule, I18nModule],
  declarations: [AsmProductItemComponent],
  exports: [AsmProductItemComponent],
})
export class AsmProductItemModule {}
