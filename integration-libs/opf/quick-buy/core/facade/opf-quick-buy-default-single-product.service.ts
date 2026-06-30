/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { CartItemQuantityService } from '@spartacus/cart/base/root';
import {
  OpfQuickBuySingleProductCartOptions,
  OpfQuickBuySingleProductCartOptionsFacade,
} from '@spartacus/opf/quick-buy/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OpfQuickBuyDefaultSingleProductService
  implements OpfQuickBuySingleProductCartOptionsFacade
{
  protected cartItemQuantityService = inject(CartItemQuantityService);

  getSingleProductCartOptions(
    _productCode: string
  ): Observable<OpfQuickBuySingleProductCartOptions> {
    return this.cartItemQuantityService
      .getQuantity()
      .pipe(map((quantity) => ({ quantity })));
  }
}
