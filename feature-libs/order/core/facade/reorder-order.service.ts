import { Injectable } from '@angular/core';
import { CartModificationList } from '@spartacus/cart/base/root';
import { Command, CommandService, CommandStrategy } from '@spartacus/core';
import { ReorderOrderFacade } from 'feature-libs/order/root/facade/reorder-order.facade';
import { Observable } from 'rxjs';
import { ReorderOrderConnector } from '../connectors/reorder-order.connector';

@Injectable()
export class ReorderOrderService implements ReorderOrderFacade {
  protected reorderCommand: Command<
    { orderId: string; userId: string },
    CartModificationList
  > = this.commandService.create<
    { orderId: string; userId: string },
    CartModificationList
  >(
    ({ orderId, userId }) =>
      this.reorderOrderConnector.reorder(orderId, userId),
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  constructor(
    protected commandService: CommandService,
    protected reorderOrderConnector: ReorderOrderConnector
  ) {}

  /**
   * Schedule a replenishment order
   */
  reorder(orderId: string, userId: string): Observable<CartModificationList> {
    return this.reorderCommand.execute({
      orderId,
      userId,
    });
  }
}
