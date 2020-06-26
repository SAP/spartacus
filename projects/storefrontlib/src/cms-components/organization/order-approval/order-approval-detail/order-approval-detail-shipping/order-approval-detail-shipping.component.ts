import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Order } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderApprovalDetailService } from '../order-approval-detail.service';

@Component({
  selector: 'cx-order-approval-detail-shipping',
  templateUrl: './order-approval-detail-shipping.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderApprovalDetailShippingComponent {
  constructor(
    protected orderApprovalDetailsService: OrderApprovalDetailService
  ) {}

  get order$(): Observable<Order> {
    return this.orderApprovalDetailsService.getOrder();
  }
}
