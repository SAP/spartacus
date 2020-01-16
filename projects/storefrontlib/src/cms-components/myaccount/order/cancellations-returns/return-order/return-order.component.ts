import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { OrderEntry, CancelOrReturnRequestEntryInput } from '@spartacus/core';
import { OrderCancelOrReturnService } from '../cancel-or-return.service';
import { OrderDetailsService } from '../../order-details/order-details.service';

@Component({
  selector: 'cx-return-order',
  templateUrl: './return-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReturnOrderComponent implements OnInit {
  constructor(
    protected cancelOrReturnService: OrderCancelOrReturnService,
    protected orderDetailsService: OrderDetailsService
  ) {}

  orderCode: string;

  returnableEntries$: Observable<
    OrderEntry[]
  > = this.orderDetailsService.getOrderDetails().pipe(
    filter(order => Boolean(order.entries)),
    tap(order => (this.orderCode = order.code)),
    map(order => {
      const returnableEntries = [];
      order.entries.forEach(entry => {
        if (entry.entryNumber !== -1 && entry.returnableQuantity > 0) {
          returnableEntries.push(entry);
        }
      });
      return returnableEntries;
    })
  );

  ngOnInit(): void {
    this.cancelOrReturnService.clearCancelOrReturnRequestInputs();
  }

  confirmReturn(entryInputs: CancelOrReturnRequestEntryInput[]): void {
    this.cancelOrReturnService.cancelOrReturnRequestInputs = entryInputs;
    this.cancelOrReturnService.goToOrderCancelOrReturn(
      'orderReturnConfirmation',
      this.orderCode
    );
  }
}
