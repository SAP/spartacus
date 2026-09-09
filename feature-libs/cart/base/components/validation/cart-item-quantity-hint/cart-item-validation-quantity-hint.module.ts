/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { CartOutlets } from '@spartacus/cart/base/root';
import { CartItemValidationQuantityHintComponent } from './cart-item-validation-quantity-hint.component';

@NgModule({
  imports: [I18nModule, CartItemValidationQuantityHintComponent],
  providers: [
    provideOutlet({
      id: CartOutlets.ITEM_VALIDATION_QUANTITY_HINT,
      position: OutletPosition.REPLACE,
      component: CartItemValidationQuantityHintComponent,
    }),
  ],
  exports: [CartItemValidationQuantityHintComponent],
})
export class CartItemValidationQuantityHintModule {}
