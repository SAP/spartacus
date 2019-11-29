import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { OrderEntry, OrderReturnRequestService } from '@spartacus/core';

import { OrderDetailsService } from '../../order-details/order-details.service';
import { OrderCancelOrReturnService } from '../cancel-or-return.service';

@Component({
  selector: 'cx-return-order-confirmation',
  templateUrl: './return-order-confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReturnOrderConfirmationComponent implements OnDestroy {
  constructor(
    protected orderDetailsService: OrderDetailsService,
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
        if (this.cancelOrReturnService.isEntryCancelledOrReturned(entry)) {
          returnedEntries.push(entry);
        }
      });
      return returnedEntries;
    })
  );

  submit(): void {
    this.returnRequestService.createOrderReturnRequest({
      orderCode: this.orderCode,
      returnRequestEntryInputs: this.cancelOrReturnService
        .cancelOrReturnRequestInputs,
    });

    this.cancelOrReturnService.clearCancelOrReturnRequestInputs();

    // should go to "return request details" page, will be handled by #5477.
    // this part will be refactored after #5477 done.
    if (!this.subscription) {
      this.subscription = this.returnRequestService
        .getOrderReturnRequest()
        .pipe(filter(returnRequest => Boolean(returnRequest)))
        .subscribe(returnRequest => {
          console.log(returnRequest);
          //this.routing.go({ cxRoute: 'orders' });
        });
    }
  }

  back(): void {
    this.cancelOrReturnService.goToOrderCancelOrReturn(
      'orderReturn',
      this.orderCode
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
