/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
} from '@spartacus/core';
import { OpfOrderFacade } from '@spartacus/opf/root';
import { Order, OrderFacade, OrderPlacedEvent } from '@spartacus/order/root';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { OpfOrderConnector } from '../connectors/opf-order.connector';

@Injectable()
export class OpfOrderService implements OpfOrderFacade {
  protected placedOpfOrder$ = new BehaviorSubject<Order | undefined>(undefined);

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
    protected orderFacade: OrderFacade,
    protected userIdService: UserIdService,
    protected commandService: CommandService,
    protected opfOrderConnector: OpfOrderConnector,
    protected eventService: EventService
  ) {}

  /**
   * Performs the necessary checkout preconditions.
   */
  protected checkoutPreconditions(): Observable<[string, string]> {
    console.log('flo1');
    return combineLatest([
      this.userIdService.takeUserId(),
      this.activeCartFacade.takeActiveCartId(),
      this.activeCartFacade.isGuestCart(),
    ]).pipe(
      tap(() => console.log('flo2')),
      take(1),
      map(([userId, cartId, isGuestCart]) => {
        if (
          !userId ||
          !cartId ||
          (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)
        ) {
          console.log('flo3 Checkout conditions not met');
          throw new Error('Checkout conditions not met');
        }
        return [userId, cartId];
      })
    );
  }

  placeOpfOrder(termsChecked: boolean): Observable<Order> {
    console.log('flo4');
    return this.placeOpfOrderCommand.execute(termsChecked);
  }

  // getOrderDetails(): Observable<Order | undefined> {
  //   return this.placedOpfOrder$.asObservable();
  // }

  // clearPlacedOrder(): void {
  //   this.placedOpfOrder$.next(undefined);
  // }

  // setPlacedOrder(order: Order): void {
  //   this.placedOpfOrder$.next(order);
  // }

  // getPickupEntries(): Observable<OrderEntry[]> {
  //   return this.getOrderDetails().pipe(
  //     map(
  //       (order) =>
  //         order?.entries?.filter(
  //           (entry) => entry.deliveryPointOfService !== undefined
  //         ) || []
  //     )
  //   );
  // }

  // getDeliveryEntries(): Observable<OrderEntry[]> {
  //   return this.getOrderDetails().pipe(
  //     map(
  //       (order) =>
  //         order?.entries?.filter(
  //           (entry) => entry.deliveryPointOfService === undefined
  //         ) || []
  //     )
  //   );
  // }
}
