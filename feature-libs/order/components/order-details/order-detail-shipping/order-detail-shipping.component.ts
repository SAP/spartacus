import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-shipping',
  templateUrl: './order-detail-shipping.component.html',
})
export class OrderDetailShippingComponent implements OnInit {
  constructor(protected orderDetailsService: OrderDetailsService) {}

  order$: Observable<any>;

  ngOnInit(): void {
    this.order$ = this.orderDetailsService.getOrderDetails();
  }

  isOrderExist(order: any): boolean {
    return Object.keys(order).length !== 0;
  }
}
