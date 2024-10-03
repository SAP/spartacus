/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CartValidationWarningsModule } from './cart-warnings/cart-validation-warnings.module';
import { CartItemValidationWarningModule } from './cart-item-warning/cart-item-validation-warning.module';

@NgModule({
  imports: [CartValidationWarningsModule, CartItemValidationWarningModule],
  providers: [],
})
export class CartValidationComponentsModule {}
