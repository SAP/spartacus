import { Component } from '@angular/core';
import { Order } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderApprovalDetailService } from '../order-approval-detail.service';

@Component({
  selector: 'cx-order-approval-detail-totals',
  //templateUrl: './order-approval-detail-totals.component.html',
  templateUrl:
    '../../../../myaccount/order/order-details/order-detail-totals/order-detail-totals.component.html',
})
export class OrderApprovalDetailTotalsComponent {
  constructor(
    protected orderApprovalDetailsService: OrderApprovalDetailService
  ) {}

  get order$(): Observable<Order> {
    return this.orderApprovalDetailsService.getOrder();
  }
}
