/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
} from '@spartacus/core';
import { OpfOrderFacade } from '@spartacus/opf/base/root';
import { Order, OrderFacade, OrderPlacedEvent } from '@spartacus/order/root';

import { Observable, combineLatest } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { OpfOrderConnector } from '../connectors/opf-order.connector';

@Injectable()
export class OpfOrderService implements OpfOrderFacade {
  protected activeCartFacade = inject(ActiveCartFacade);
  protected orderFacade = inject(OrderFacade);
  protected userIdService = inject(UserIdService);
  protected commandService = inject(CommandService);
  protected opfOrderConnector = inject(OpfOrderConnector);
  protected eventService = inject(EventService);

  protected placeOpfOrderCommand: Command<boolean, Order> =
    this.commandService.create<boolean, Order>(
      (payload) =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) =>
            this.opfOrderConnector.placeOpfOrder(userId, cartId, payload).pipe(
              tap((order) => {
                this.orderFacade.setPlacedOrder(order);
                this.eventService.dispatch(
                  {
                    order,
                    userId,
                    cartId,
                    /**
                     * As we know the cart is not anonymous (precondition checked),
                     * we can safely use the cartId, which is actually the cart.code.
                     */
                    cartCode: cartId,
                  },
                  OrderPlacedEvent
                );
              })
            )
          )
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  /**
   * Performs the necessary checkout preconditions.
   */
  protected checkoutPreconditions(): Observable<[string, string]> {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.activeCartFacade.takeActiveCartId(),
      this.activeCartFacade.isGuestCart(),
    ]).pipe(
      take(1),
      map(([userId, cartId, isGuestCart]) => {
        if (
          !userId ||
          !cartId ||
          (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)
        ) {
          throw new Error('Checkout conditions not met');
        }
        return [userId, cartId];
      })
    );
  }

  placeOpfOrder(termsChecked: boolean): Observable<Order> {
    return this.placeOpfOrderCommand.execute(termsChecked);
  }
}
