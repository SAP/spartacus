import { Component, OnInit } from '@angular/core';
import { Order } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-shipping',
  templateUrl: './order-detail-shipping.component.html',
})
export class OrderDetailShippingComponent implements OnInit {
  constructor(protected orderDetailsService: OrderDetailsService) {}

  order$: Observable<Order>;

  ngOnInit() {
    this.order$ = this.orderDetailsService
      .getOrderDetails()
      .pipe(filter((order) => Object.keys(order).length > 0));
  }
}
