/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CartModification,
  CartValidationFacade,
  CartValidationStatusCode,
} from '@spartacus/cart/base/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-validation-warnings',
  templateUrl: './cart-validation-warnings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartValidationWarningsComponent {
  iconTypes = ICON_TYPE;
  visibleWarnings: Record<string, boolean> = {};

  cartModifications$ = this.cartValidationFacade.getValidationResults().pipe(
    map((modificationList) => {
      const result = modificationList.filter(
        (modification) =>
          modification.statusCode === CartValidationStatusCode.NO_STOCK
      );

      result.forEach((modification) => {
        if (modification.entry?.product?.code) {
          this.visibleWarnings[modification.entry.product.code] = true;
        }
      });
      return result;
    })
  );

  constructor(protected cartValidationFacade: CartValidationFacade) {}

  removeMessage(cartModification: CartModification) {
    if (cartModification.entry?.product?.code) {
      this.visibleWarnings[cartModification.entry.product.code] = false;
    }
  }
}
