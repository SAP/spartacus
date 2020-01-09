import { Injectable } from '@angular/core';
import {
  CancelOrReturnRequestEntryInput,
  GlobalMessageService,
  GlobalMessageType,
  OrderEntry,
  RoutingService,
  UserOrderService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details/order-details.service';
import { OrderAmendType } from './order-amend.model';
import { OrderAmendService } from './order-amend.service';

@Injectable({
  providedIn: 'root',
})
export class OrderCancellationService extends OrderAmendService {
  amendType = OrderAmendType.CANCEL;

  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected userOrderService: UserOrderService,
    protected routing: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {
    super(orderDetailsService);
  }
  /**
   * Return cancellable order entries.
   */
  getEntries(): Observable<OrderEntry[]> {
    return this.getOrder().pipe(
      filter(order => !!order.entries),
      map(order =>
        order.entries.filter(
          entry => entry.entryNumber !== -1 && entry.cancellableQuantity > 0
        )
      )
    );
  }

  save(): void {
    const orderCode = this.form.value.orderCode;
    const entries = this.form.value.entries;
    const inputs: CancelOrReturnRequestEntryInput[] = Object.keys(entries).map(
      entryNumber =>
        ({
          orderEntryNumber: Number(entryNumber),
          quantity: <number>entries[entryNumber],
        } as CancelOrReturnRequestEntryInput)
    );

    this.form.reset();

    this.userOrderService.cancelOrder(orderCode, {
      cancellationRequestEntryInputs: inputs,
    });

    // TODO: implement error handling
    this.userOrderService
      .getCancelOrderSuccess()
      .pipe(first(Boolean))
      .subscribe(() => this.afterSave(orderCode));
  }

  private afterSave(orderCode: string): void {
    this.userOrderService.resetCancelOrderProcessState();
    this.globalMessageService.add(
      {
        key: 'orderDetails.cancellationAndReturn.cancelSuccess',
        params: { orderCode },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.routing.go({
      cxRoute: 'orders',
    });
  }
}
