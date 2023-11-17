/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Cart, MultiCartFacade } from '@spartacus/cart/base/root';
import { RoutingService, UserIdService } from '@spartacus/core';
import { QuoteCartService } from '@spartacus/quote/root';
import { Observable } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { ActiveCartFacade } from '@spartacus/cart/base/root';

@Injectable({
  providedIn: 'root',
})
export class CartUtilsService {
  protected userIdService = inject(UserIdService);
  protected multiCartFacade = inject(MultiCartFacade);
  protected routingService = inject(RoutingService);
  protected quoteCartService = inject(QuoteCartService);
  protected activeCartFacade = inject(ActiveCartFacade);

  protected createNewCart(): Observable<Cart> {
    return this.userIdService.takeUserId().pipe(
      switchMap((userId) =>
        this.multiCartFacade.createCart({
          userId,
          oldCartId: undefined,
          toMergeCartGuid: undefined,
          extraData: { active: true },
        })
      )
    );
  }

  /**
   * Creates a new cart and navigates according to the 'cart' route.
   */
  goToNewCart(): void {
    this.createNewCart()
      .pipe(take(1))
      .subscribe(() => {
        this.routingService.go({ cxRoute: 'cart' });
      });
  }

  /**
   * Handels a cart depending whether the quote is editable or not and navigates according to the 'quotes' route.
   *
   * @param isEditable - Is a quote editable?
   */
  handelCartAndGoToQuoteList(isEditable: boolean): void {
    if (isEditable) {
      this.createNewCart()
        .pipe(take(1))
        .subscribe(() => {
          this.routingService.go({ cxRoute: 'quotes' });
        });
    } else {
      this.routingService.go({ cxRoute: 'quotes' });
    }
  }
}
