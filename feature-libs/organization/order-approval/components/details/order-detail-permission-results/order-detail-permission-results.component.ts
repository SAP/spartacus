import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderDetailsService } from '@spartacus/cart/order/components';
import { Order } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-detail-permission-results',
  templateUrl: './order-detail-permission-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailPermissionResultsComponent {
  order$: Observable<Order> = this.orderDetailsService.getOrderDetails();

  constructor(protected orderDetailsService: OrderDetailsService) {}
}
