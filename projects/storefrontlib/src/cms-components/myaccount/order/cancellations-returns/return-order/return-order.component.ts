import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

import { Order, OrderEntry } from '@spartacus/core';

import { OrderDetailsService } from '../../order-details/order-details.service';

@Component({
  selector: 'cx-return-order',
  templateUrl: './return-order.component.html',
})
export class ReturnOrderComponent implements OnInit {
  constructor(private orderDetailsService: OrderDetailsService) {}

  order$: Observable<Order>;
  returnableEntries: OrderEntry[] = [];

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails().pipe(
      filter(order => !!order.entries),
      tap(order => {
        this.returnableEntries = [];
        order.entries.forEach(entry => {
          if (entry.entryNumber !== -1 && entry.returnableQuantity > 0) {
            this.returnableEntries.push(entry);
          }
        });
      })
    );
  }
}
