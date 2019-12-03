import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { OrderEntry } from '@spartacus/core';

import { OrderDetailsService } from '../../order-details/order-details.service';
import { OrderCancelOrReturnService } from '../cancel-or-return.service';

@Component({
  selector: 'cx-cancel-order-confirmation',
  templateUrl: './cancel-order-confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelOrderConfirmationComponent {
  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected cancelOrReturnService: OrderCancelOrReturnService
  ) {}

  orderCode: string;
  cancelSubmit = false;
  isCancelling$ = this.cancelOrReturnService.isCancelling$;

  cancelledEntries$: Observable<
    OrderEntry[]
  > = this.orderDetailsService.getOrderDetails().pipe(
    filter(order => Boolean(order.entries)),
    tap(order => (this.orderCode = order.code)),
    map(order => {
      const cancelledEntries = [];
      order.entries.forEach(entry => {
        if (this.cancelOrReturnService.isEntryCancelledOrReturned(entry)) {
          cancelledEntries.push(entry);
        }
      });
      return cancelledEntries;
    })
  );

  submit(): void {
    this.cancelSubmit = true;
    this.cancelOrReturnService.cancelOrder(this.orderCode, {
      cancellationRequestEntryInputs: this.cancelOrReturnService
        .cancelOrReturnRequestInputs,
    });
  }

  back(): void {
    this.cancelOrReturnService.goToOrderCancelOrReturn(
      'orderCancel',
      this.orderCode,
      true
    );
  }
}
