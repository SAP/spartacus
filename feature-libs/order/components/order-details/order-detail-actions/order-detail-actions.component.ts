import { Component } from '@angular/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-actions',
  templateUrl: './order-detail-actions.component.html',
})
export class OrderDetailActionsComponent {
  constructor(protected orderDetailsService: OrderDetailsService) {}

  order$: Observable<Order | undefined> = this.orderDetailsService
    .getOrderDetailState()
    .pipe(map((state) => state.value));
}
