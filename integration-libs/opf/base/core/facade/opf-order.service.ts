/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  ActiveCartFacade,
  CartType,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
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

import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { OpfOrderConnector } from '../connectors/opf-order.connector';

@Injectable()
export class OpfOrderService implements OpfOrderFacade {
  protected multiCartFacade = inject(MultiCartFacade);

  protected placeOpfOrderCommand: Command<
    { termsChecked: boolean; multipleCart: boolean },
    Order
  > = this.commandService.create<
    { termsChecked: boolean; multipleCart: boolean },
    Order
  >(
    (payload) =>
      this.checkoutPreconditions(payload.multipleCart).pipe(
        switchMap(([userId, cartId]) =>
          this.opfOrderConnector
            .placeOpfOrder(userId, cartId, payload.termsChecked)
            .pipe(
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

  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected orderFacade: OrderFacade,
    protected userIdService: UserIdService,
    protected commandService: CommandService,
    protected opfOrderConnector: OpfOrderConnector,
    protected eventService: EventService
  ) {}

  /**
   * Performs the necessary checkout preconditions.
   */
  protected checkoutPreconditions(
    multiCart: boolean
  ): Observable<[string, string]> {
    const cartId$ = multiCart
      ? this.multiCartFacade.getCartIdByType(CartType.NEW_CREATED)
      : this.activeCartFacade.takeActiveCartId();
    return combineLatest([
      this.userIdService.takeUserId(),
      cartId$,
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

  placeOpfOrder(
    termsChecked: boolean,
    multipleCart = false
  ): Observable<Order> {
    return this.placeOpfOrderCommand.execute({ termsChecked, multipleCart });
  }
}
