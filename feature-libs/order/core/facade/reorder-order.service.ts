/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CartModificationList } from '@spartacus/cart/base/root';
import {
  Command,
  CommandService,
  CommandStrategy,
  UserIdService,
} from '@spartacus/core';
import { ReorderOrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ReorderOrderConnector } from '../connectors/reorder-order.connector';

@Injectable()
export class ReorderOrderService implements ReorderOrderFacade {
  protected reorderCommand: Command<{ orderId: string }, CartModificationList> =
    this.commandService.create<{ orderId: string }, CartModificationList>(
      ({ orderId }) =>
        this.userIdService
          .takeUserId()
          .pipe(
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
    protected userIdService: UserIdService
  ) {}

  /**
   * Create cart from an existing order
   */
  reorder(orderId: string): Observable<CartModificationList> {
    return this.reorderCommand.execute({
      orderId,
    });
  }
}
