import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Order } from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-detail-permission-results',
  templateUrl: './order-detail-permission-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailPermissionResultsComponent {
  order$: Observable<Order> = this.orderDetailsService.getOrderDetails();

  // TODO: in 5.0, use OrderApprovalDetailService directly in constructor
  constructor(protected orderDetailsService: OrderDetailsService) {}
}
