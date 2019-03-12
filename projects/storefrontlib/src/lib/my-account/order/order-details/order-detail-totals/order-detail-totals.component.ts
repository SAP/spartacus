import { Component, OnInit } from '@angular/core';
import { Order, UserService } from '@spartacus/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-details-totals',
  templateUrl: './order-detail-totals.component.html',
  styleUrls: ['./order-detail-totals.component.scss']
})
export class OrderDetailTotalsComponent implements OnInit {
  constructor(protected userService: UserService) {}

  order$: Observable<Order>;

  ngOnInit() {
    this.order$ = this.userService.getOrderDetails();
  }
}
