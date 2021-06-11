import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-actions',
  templateUrl: './order-detail-actions.component.html',
})
export class OrderDetailActionsComponent {
  constructor(protected orderDetailsService: OrderDetailsService) {}

  state$ = this.orderDetailsService
    .getOrderDetailsState()
    .pipe(tap((data: any) => console.log(data)));

  isValidOrder(data: any): boolean {
    return Object.keys(data).length ? data : null;
  }
}
