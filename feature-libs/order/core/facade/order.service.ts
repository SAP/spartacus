/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import {
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
} from '@spartacus/core';
import { Order, OrderFacade, OrderPlacedEvent } from '@spartacus/order/root';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { OrderConnector } from '../connectors/order.connector';

@Injectable()
export class OrderService implements OrderFacade {
  protected placedOrder$ = new BehaviorSubject<Order | undefined>(undefined);

  protected placeOrderCommand: Command<boolean, Order> =
    this.commandService.create<boolean, Order>(
      (payload) =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) =>
            this.orderConnector.placeOrder(userId, cartId, payload).pipe(
              tap((order) => {
                this.placedOrder$.next(order);
                this.eventService.dispatch(
                  {
                    userId,
                    cartId,
                    /**
                     * As we know the cart is not anonymous (precondition checked),
                     * we can safely use the cartId, which is actually the cart.code.
                     */
                    cartCode: cartId,
                    order,
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
    protected userIdService: UserIdService,
    protected commandService: CommandService,
    protected orderConnector: OrderConnector,
    protected eventService: EventService
  ) {}

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

  placeOrder(termsChecked: boolean): Observable<Order> {
    return this.placeOrderCommand.execute(termsChecked);
  }

  getOrderDetails(): Observable<Order | undefined> {
    return this.placedOrder$.asObservable();
  }

  clearPlacedOrder(): void {
    this.placedOrder$.next(undefined);
  }

  setPlacedOrder(order: Order): void {
    this.placedOrder$.next(order);
  }

  getPickupEntries(): Observable<OrderEntry[]> {
    return this.getOrderDetails().pipe(
      map(
        (order) =>
          order?.entries?.filter(
            (entry) => entry.deliveryPointOfService !== undefined
          ) || []
      )
    );
  }

  getDeliveryEntries(): Observable<OrderEntry[]> {
    return this.getOrderDetails().pipe(
      map(
        (order) =>
          order?.entries?.filter(
            (entry) => entry.deliveryPointOfService === undefined
          ) || []
      )
    );
  }
}
