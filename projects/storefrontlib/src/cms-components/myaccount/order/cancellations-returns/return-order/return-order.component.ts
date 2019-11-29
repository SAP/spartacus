import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

import {
  OrderEntry,
  CancelOrReturnRequestEntryInput,
  RoutingService,
} from '@spartacus/core';

import { OrderCancelOrReturnService } from '../cancel-or-returns.service';
import { OrderDetailsService } from '../../order-details/order-details.service';

@Component({
  selector: 'cx-return-order',
  templateUrl: './return-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReturnOrderComponent {
  constructor(
    protected cancelOrReturnService: OrderCancelOrReturnService,
    protected orderDetailsService: OrderDetailsService,
    protected routing: RoutingService
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

  confirmReturn(entryInputs: CancelOrReturnRequestEntryInput[]): void {
    this.cancelOrReturnService.cancelOrReturnRequestInputs = entryInputs;
    this.routing.go({
      cxRoute: 'orderReturnConfirmation',
      params: { code: this.orderCode },
    });
  }
}
