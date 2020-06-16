import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Order } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-approval-details',
  templateUrl: './order-detail-approval-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailApprovalDetailsComponent {
  order$: Observable<Order> = this.orderDetailsService.getOrderDetails();

  constructor(protected orderDetailsService: OrderDetailsService) {}
}
