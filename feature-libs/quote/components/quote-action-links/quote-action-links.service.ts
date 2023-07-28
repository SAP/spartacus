/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  ActiveCartFacade,
  DeleteCartFailEvent,
  DeleteCartSuccessEvent,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import { EventService, RoutingService, UserIdService } from '@spartacus/core';
import { QuoteCartService } from '@spartacus/quote/root';
import { Observable, merge } from 'rxjs';
import { tap, take, withLatestFrom, switchMap, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuoteActionLinksService {
  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected multiCartFacade: MultiCartFacade,
    protected routingService: RoutingService,
    protected eventService: EventService,
    protected quoteCartService: QuoteCartService
  ) {}

  clearCart(): Observable<boolean> {
    return this.activeCartFacade.getActiveCartId().pipe(
      withLatestFrom(this.userIdService.getUserId()),
      take(1),
      //TODO switch to create cart , in tap only disable quote cart
      tap(([cartId, userId]) => {
        this.multiCartFacade.createCart({userId, oldCartId:undefined, toMergeCartGuid:undefined,extraData:{active:true}});
        console.log("CHHI old id: "+ cartId);
        //this.multiCartFacade.deleteCart(cartId, userId);
        this.quoteCartService.setQuoteCartActive(false);
      }),
      switchMap(() =>
        merge(
          this.eventService.get(DeleteCartSuccessEvent).pipe(mapTo(true)),
          this.eventService.get(DeleteCartFailEvent).pipe(mapTo(false))
        ).pipe(take(1))
      )
    );
  }

  goToNewCart(): void {
    this.clearCart().subscribe((isCartEmpty: boolean) => {
      if (isCartEmpty) {
        this.routingService.go({ cxRoute: 'cart' });
      }
    });
  }
}
