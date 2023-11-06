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
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartUtilsService {
  protected userIdService = inject(UserIdService);
  protected multiCartFacade = inject(MultiCartFacade);
  protected routingService = inject(RoutingService);
  protected quoteCartService = inject(QuoteCartService);

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
   * Creates a new cart and navigates according to the 'quotes' route.
   */
  createNewCartAndGoToQuoteList(): void {
    this.createNewCart()
      .pipe(take(1))
      .subscribe(() => {
        this.routingService.go({ cxRoute: 'quotes' });
      });
  }
}
