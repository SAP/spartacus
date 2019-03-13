import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Order } from '@spartacus/core';

import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-headline',
  templateUrl: './order-detail-headline.component.html',
  styleUrls: ['./order-detail-headline.component.scss']
})
export class OrderDetailHeadlineComponent implements OnInit {
  constructor(private orderDetailsService: OrderDetailsService) {}

  order$: Observable<Order>;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
  }
}
