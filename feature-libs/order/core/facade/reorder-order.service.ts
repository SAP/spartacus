/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
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
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ReorderOrderConnector } from '../connectors/reorder-order.connector';

@Injectable()
export class ReorderOrderService implements ReorderOrderFacade {
  protected commandService = inject(CommandService);
  protected reorderOrderConnector = inject(ReorderOrderConnector);
  protected userIdService = inject(UserIdService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected multiCartFacade = inject(MultiCartFacade);

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
      map(([userId, cartId]) => {
        if (!userId) {
          throw new Error('Must be logged in to reorder');
        }

        if (cartId) {
          this.multiCartFacade.deleteCart(cartId, userId);
        }

        return userId;
      })
    );
  }
}
