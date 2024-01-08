/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ProductVariantStyleSelectorComponent } from './product-variant-style-selector.component';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, I18nModule],
  declarations: [ProductVariantStyleSelectorComponent],
  exports: [ProductVariantStyleSelectorComponent],
})
export class ProductVariantStyleSelectorModule {}
