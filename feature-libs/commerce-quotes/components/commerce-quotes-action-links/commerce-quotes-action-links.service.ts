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
import { Observable, merge } from 'rxjs';
import { tap, take, withLatestFrom, switchMap, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommerceQuotesActionLinksService {
  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected multiCartFacade: MultiCartFacade,
    protected routingService: RoutingService,
    protected eventService: EventService
  ) {}

  clearCart(): Observable<boolean> {
    return this.activeCartFacade.getActiveCartId().pipe(
      withLatestFrom(this.userIdService.getUserId()),
      take(1),
      tap(([cartId, userId]) => {
        this.multiCartFacade.deleteCart(cartId, userId);
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
