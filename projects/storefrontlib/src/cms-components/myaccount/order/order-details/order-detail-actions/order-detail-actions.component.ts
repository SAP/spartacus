import { Component } from '@angular/core';
import { Order } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-actions',
  templateUrl: './order-detail-actions.component.html',
})
export class OrderDetailActionsComponent {
  constructor(protected orderDetailsService: OrderDetailsService) {}

  error$: Observable<boolean> = this.orderDetailsService
    .getOrderDetailsState()
    .pipe(map((state) => state.error));

  order$: Observable<Order> = this.orderDetailsService
    .getOrderDetailsState()
    .pipe(map((state) => state.value));
}
