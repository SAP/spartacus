/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@commerce-storefront-toolset/core';
import { IconModule } from '@commerce-storefront-toolset/storefront';
import { CartItemValidationWarningComponent } from './cart-item-validation-warning.component';

@NgModule({
  imports: [CommonModule, RouterModule, I18nModule, UrlModule, IconModule],
  exports: [CartItemValidationWarningComponent],
  declarations: [CartItemValidationWarningComponent],
})
export class CartItemValidationWarningModule {}
