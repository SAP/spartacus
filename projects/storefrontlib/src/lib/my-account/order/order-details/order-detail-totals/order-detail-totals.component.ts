import { Component, OnInit } from '@angular/core';
import { Order } from '@spartacus/core';

import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-totals',
  templateUrl: './order-detail-totals.component.html',
  styleUrls: ['./order-detail-totals.component.scss']
})
export class OrderDetailTotalsComponent implements OnInit {
  constructor(protected orderDetailsService: OrderDetailsService) {}

  order$: Observable<Order>;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
  }
}
