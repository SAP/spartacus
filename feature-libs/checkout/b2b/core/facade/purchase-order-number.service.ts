/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CartAssociatedQuotePurchaseOrderNumberFacade } from '@spartacus/cart/base/root';
import { Observable, switchMap } from 'rxjs';

@Injectable()
export class PurchaseOrderNumberService {
  private activeCartFacade: ActiveCartFacade = inject(ActiveCartFacade);
  private cartAssociatedQuotePONumberFacade: CartAssociatedQuotePurchaseOrderNumberFacade =
    inject(CartAssociatedQuotePurchaseOrderNumberFacade);

  /**
   * Get whether the purchase order number is coming from the quote and thus non-editable
   */
  isPurchaseOrderNumberNonEditable(): Observable<boolean> {
    return this.activeCartFacade.getActive().pipe(
      switchMap((cart) => {
        return this.cartAssociatedQuotePONumberFacade.isPurchaseOrderNumberNonEditable(
          cart.quoteCode ?? ''
        );
      })
    );
  }
}
