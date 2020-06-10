import { Component, OnInit } from '@angular/core';
import { Order } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-approval-details',
  templateUrl: './order-detail-approval-details.component.html',
})
export class OrderDetailApprovalDetailsComponent implements OnInit {
  order$: Observable<Order>;

  constructor(protected orderDetailsService: OrderDetailsService) {}

  ngOnInit(): void {
    this.order$ = this.orderDetailsService.getOrderDetails();
  }
}
