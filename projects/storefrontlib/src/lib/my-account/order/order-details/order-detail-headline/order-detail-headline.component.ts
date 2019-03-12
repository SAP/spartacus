import { Component, OnInit } from '@angular/core';
import { Order, UserService } from '@spartacus/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-details-headline',
  templateUrl: './order-detail-headline.component.html',
  styleUrls: ['./order-detail-headline.component.scss']
})
export class OrderDetailHeadlineComponent implements OnInit {
  constructor(protected userService: UserService) {}

  order$: Observable<Order>;

  ngOnInit() {
    this.order$ = this.userService.getOrderDetails();
  }
}
