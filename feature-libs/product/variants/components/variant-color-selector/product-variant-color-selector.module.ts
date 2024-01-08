/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ProductVariantColorSelectorComponent } from './product-variant-color-selector.component';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, I18nModule],
  declarations: [ProductVariantColorSelectorComponent],
  exports: [ProductVariantColorSelectorComponent],
})
export class ProductVariantColorSelectorModule {}
