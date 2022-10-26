import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-detail-items-wrapper',
  templateUrl: './order-detail-items-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailItemsWrapperComponent {
  order$: Observable<Order> = this.orderDetailsService.getOrderDetails();

  constructor(protected orderDetailsService: OrderDetailsService) {}
}
