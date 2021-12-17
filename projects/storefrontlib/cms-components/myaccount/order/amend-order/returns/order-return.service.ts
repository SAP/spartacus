import { Injectable } from '@angular/core';
import {
  CancelOrReturnRequestEntryInput,
  GlobalMessageService,
  GlobalMessageType,
  OrderEntry,
  OrderReturnRequestService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { OrderDetailsService } from '../../order-details/order-details.service';
import { AmendOrderType } from '../amend-order.model';
import { OrderAmendService } from '../amend-order.service';

/**
 * @deprecated since 4.2 - use order lib instead
 */
@Injectable({
  providedIn: 'root',
})
export class OrderReturnService extends OrderAmendService {
  amendType = AmendOrderType.RETURN;

  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected returnRequestService: OrderReturnRequestService,
    protected routing: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {
    super(orderDetailsService);
  }

  getEntries(): Observable<OrderEntry[]> {
    return this.getOrder().pipe(
      filter((order) => !!order.entries),
      map((order) =>
        order.entries.filter(
          (entry) => entry.entryNumber !== -1 && entry.returnableQuantity > 0
        )
      )
    );
  }

  save(): void {
    const orderCode = this.form.value.orderCode;
    const entries = this.form.value.entries;
    const inputs: CancelOrReturnRequestEntryInput[] = Object.keys(entries)
      .filter((entryNumber) => <number>entries[entryNumber] > 0)
      .map(
        (entryNumber) =>
          ({
            orderEntryNumber: Number(entryNumber),
            quantity: <number>entries[entryNumber],
          } as CancelOrReturnRequestEntryInput)
      );

    this.form.reset();

    this.returnRequestService.createOrderReturnRequest({
      orderCode,
      returnRequestEntryInputs: inputs,
    });

    this.returnRequestService
      .getReturnRequestSuccess()
      .pipe(first(Boolean))
      .subscribe(() => this.afterSave());
  }

  private afterSave(): void {
    this.returnRequestService
      .getOrderReturnRequest()
      .pipe(first((r) => !!r))
      .subscribe((returnRequest) => {
        const rma = returnRequest.rma;
        this.globalMessageService.add(
          {
            key: 'orderDetails.cancellationAndReturn.returnSuccess',
            params: { rma },
          },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
        this.routing.go({
          cxRoute: 'returnRequestDetails',
          params: { rma },
        });
      });
  }
}
