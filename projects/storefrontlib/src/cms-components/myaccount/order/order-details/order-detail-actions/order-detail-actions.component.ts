import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Order } from '@spartacus/core';

import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-actions',
  templateUrl: './order-detail-actions.component.html',
})
export class OrderDetailActionsComponent {
  constructor(protected orderDetailsService: OrderDetailsService) {}

  order$: Observable<Order> = this.orderDetailsService.getOrderDetails();
}
