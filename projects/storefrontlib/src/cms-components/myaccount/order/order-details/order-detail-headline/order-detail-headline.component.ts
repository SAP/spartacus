import { Component, OnInit } from '@angular/core';
import { B2BOrder, Order } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-headline',
  templateUrl: './order-detail-headline.component.html',
})
export class OrderDetailHeadlineComponent implements OnInit {
  constructor(private orderDetailsService: OrderDetailsService) {}

  order$: Observable<Order | B2BOrder>;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
  }
}
