import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { OrderEntry, CancelOrReturnRequestEntryInput } from '@spartacus/core';
import { OrderCancelOrReturnService } from '../cancel-or-return.service';
import { OrderDetailsService } from '../../order-details/order-details.service';

@Component({
  selector: 'cx-cancel-order',
  templateUrl: './cancel-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelOrderComponent implements OnInit {
  constructor(
    protected cancelOrReturnService: OrderCancelOrReturnService,
    protected orderDetailsService: OrderDetailsService
  ) {}

  orderCode: string;

  cancellableEntries$: Observable<
    OrderEntry[]
  > = this.orderDetailsService.getOrderDetails().pipe(
    filter(order => Boolean(order.entries)),
    tap(order => (this.orderCode = order.code)),
    map(order => {
      const cancellableEntries = [];
      order.entries.forEach(entry => {
        if (entry.entryNumber !== -1 && entry.cancellableQuantity > 0) {
          cancellableEntries.push(entry);
        }
      });
      return cancellableEntries;
    })
  );

  ngOnInit(): void {
    this.cancelOrReturnService.clearCancelOrReturnRequestInputs();
  }

  confirmCancel(entryInputs: CancelOrReturnRequestEntryInput[]): void {
    this.cancelOrReturnService.cancelOrReturnRequestInputs = entryInputs;
    this.cancelOrReturnService.goToOrderCancelOrReturn(
      'orderCancelConfirmation',
      this.orderCode
    );
  }
}
