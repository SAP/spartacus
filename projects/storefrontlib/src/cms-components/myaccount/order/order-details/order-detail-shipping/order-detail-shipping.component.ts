import { Component } from '@angular/core';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-shipping',
  templateUrl: './order-detail-shipping.component.html',
})
export class OrderDetailShippingComponent {
  constructor(protected orderDetailsService: OrderDetailsService) {}

  state$ = this.orderDetailsService.getOrderDetailsState();
}
