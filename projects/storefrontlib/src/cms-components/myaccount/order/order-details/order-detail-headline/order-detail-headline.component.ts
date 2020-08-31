import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-headline',
  templateUrl: './order-detail-headline.component.html',
})
export class OrderDetailHeadlineComponent implements OnInit {
  constructor(private orderDetailsService: OrderDetailsService) {}

  order$: Observable<any>;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
  }
}
