import { Component } from '@angular/core';
import { Order, StateUtils } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-shipping',
  templateUrl: './order-detail-shipping.component.html',
})
export class OrderDetailShippingComponent {
  constructor(protected orderDetailsService: OrderDetailsService) {}

  state$: Observable<
    StateUtils.LoaderState<Order>
  > = this.orderDetailsService.getOrderDetailsState();
}
