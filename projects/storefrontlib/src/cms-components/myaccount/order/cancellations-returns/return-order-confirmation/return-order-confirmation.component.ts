import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import {
  OrderEntry,
  CancelOrReturnRequestEntryInput,
  RoutingService,
  OrderReturnRequestService,
} from '@spartacus/core';

import { OrderDetailsService } from '../../order-details/order-details.service';
import { OrderCancelOrReturnService } from '../cancel-or-returns.service';

@Component({
  selector: 'cx-return-order-confirmation',
  templateUrl: './return-order-confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReturnOrderConfirmationComponent implements OnDestroy {
  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected routing: RoutingService,
    protected cancelOrReturnService: OrderCancelOrReturnService,
    protected returnRequestService: OrderReturnRequestService
  ) {}

  orderCode: string;
  subscription: Subscription;

  returnedEntries$: Observable<
    OrderEntry[]
  > = this.orderDetailsService.getOrderDetails().pipe(
    filter(order => Boolean(order.entries)),
    tap(order => (this.orderCode = order.code)),
    map(order => {
      const returnedEntries = [];
      order.entries.forEach(entry => {
        if (this.isEntryReturned(entry)) {
          returnedEntries.push(entry);
        }
      });
      return returnedEntries;
    })
  );

  returnRequestEntryInput: CancelOrReturnRequestEntryInput[] = this
    .cancelOrReturnService.cancelOrReturnRequestInputs;

  protected isEntryReturned(entry: OrderEntry): boolean {
    for (const input of this.returnRequestEntryInput) {
      if (input.orderEntryNumber === entry.entryNumber) {
        return true;
      }
    }
    return false;
  }

  submit(): void {
    this.returnRequestService.createOrderReturnRequest({
      orderCode: this.orderCode,
      returnRequestEntryInputs: this.returnRequestEntryInput,
    });

    if (!this.subscription) {
      this.subscription = this.returnRequestService
        .getOrderReturnRequest()
        .pipe(filter(returnRequest => Boolean(returnRequest)))
        .subscribe(returnRequest => {
          console.log(returnRequest);
          // should go to "return request details" page, will be handled by #5477
          this.routing.go({ cxRoute: 'orders' });
        });
    }
  }

  back(): void {
    this.routing.go({
      cxRoute: 'orderReturn',
      params: { code: this.orderCode },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
