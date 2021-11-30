import { Injectable } from '@angular/core';
import {
  GetOrderDetailsContext,
  Order,
  OrderDetailsSource,
} from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { OrderApprovalDetailService } from '../details/order-approval-detail.service';

/**
 * Get order details in Order Approval Page
 */
@Injectable({
  providedIn: 'root',
})
export class OrderApprovalOrderDetailsContext
  implements GetOrderDetailsContext
{
  readonly type = OrderDetailsSource.ORDER_APPROVAL;

  constructor(protected orderApprovalService: OrderApprovalDetailService) {}

  getOrderDetails(): Observable<Order> {
    return this.orderApprovalService.getOrderDetails();
  }
}
