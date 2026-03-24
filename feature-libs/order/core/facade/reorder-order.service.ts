/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  ActiveCartFacade,
  CartModificationList,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  Command,
  CommandService,
  CommandStrategy,
  UserIdService,
} from '@spartacus/core';
import { ReorderOrderFacade } from '@spartacus/order/root';
import { combineLatest, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { ReorderOrderConnector } from '../connectors/reorder-order.connector';

@Injectable()
export class ReorderOrderService implements ReorderOrderFacade {
  protected reorderCommand: Command<{ orderId: string }, CartModificationList> =
    this.commandService.create<{ orderId: string }, CartModificationList>(
      ({ orderId }) =>
        this.reorderPreconditions().pipe(
          switchMap((userId: string) =>
            this.reorderOrderConnector.reorder(orderId, userId)
          )
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  constructor(
    protected commandService: CommandService,
    protected reorderOrderConnector: ReorderOrderConnector,
    protected userIdService: UserIdService,
    protected activeCartFacade: ActiveCartFacade,
    protected multiCartFacade: MultiCartFacade
  ) {}

  /**
   * Create cart from an existing order
   */
  reorder(orderId: string): Observable<CartModificationList> {
    return this.reorderCommand.execute({
      orderId,
    });
  }

  protected reorderPreconditions(): Observable<string> {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.activeCartFacade.getActiveCartId(),
    ]).pipe(
      take(1),
      switchMap(([userId, cartId]) => {
        if (!userId) {
          return throwError(() => new Error('Must be logged in to reorder'));
        }

        if (cartId) {
          return this.deleteCartAndWait(cartId, userId);
        }

        return of(userId);
      })
    );
  }

  protected deleteCartAndWait(
    cartId: string,
    userId: string
  ): Observable<string> {
    this.multiCartFacade.deleteCart(cartId, userId);
    // Wait for the cart entity to be fully removed from the store
    // before proceeding with the reorder.
    return this.multiCartFacade.getCartEntity(cartId).pipe(
      filter((state) => !state.value && !state.loading),
      take(1),
      map(() => userId)
    );
  }
}
