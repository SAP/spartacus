import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-actions',
  templateUrl: './order-detail-actions.component.html',
})
export class OrderDetailActionsComponent {
  constructor(protected orderDetailsService: OrderDetailsService) {}

  error$ = this.orderDetailsService
    .getOrderDetailsState()
    .pipe(map((state) => state.error));

  order$ = this.orderDetailsService
    .getOrderDetailsState()
    .pipe(map((state) => state.value));
}
