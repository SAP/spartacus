/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveCartFacade, CartModificationList } from '@spartacus/cart/base/root';
import {
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
} from '@spartacus/core';
import {
  OrderFacade,
} from '@spartacus/order/root';
import { ReorderOrderFacade } from 'feature-libs/order/root/facade/reorder-order.facade';
import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ReorderOrderConnector } from '../connectors/reorder-order.connector';

@Injectable()
export class ReorderOrderService
  implements ReorderOrderFacade
{
  protected reorderCommand: Command<
    {  orderId: string, userId: string},
    CartModificationList
  > = this.commandService.create<
    { orderId: string, userId: string },
    CartModificationList
  >(
    ({ orderId, userId }) =>
    this.reorderOrderConnector
    .reorder(orderId, userId)
    ,{
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected commandService: CommandService,
    protected reorderOrderConnector: ReorderOrderConnector,
    protected eventService: EventService,
    protected orderFacade: OrderFacade
  ) {}

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
          throw new Error('Order conditions not met');
        }
        return [userId, cartId];
      })
    );
  }

  /**
   * Schedule a replenishment order
   */
  reorder(
    orderId: string,
    userId: string
  ): Observable<CartModificationList> {
    return this.reorderCommand.execute({
      orderId,
      userId
    });
  }
}
