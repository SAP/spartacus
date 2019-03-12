import { Component, OnInit } from '@angular/core';
import { Order, UserService, Consignment, OrderEntry } from '@spartacus/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-details-items',
  templateUrl: './order-detail-items.component.html',
  styleUrls: ['./order-detail-items.component.scss']
})
export class OrderDetailItemsComponent implements OnInit {
  constructor(protected userService: UserService) {}

  order$: Observable<Order>;

  ngOnInit() {
    this.order$ = this.userService.getOrderDetails();
  }

  getConsignmentProducts(consignment: Consignment): OrderEntry[] {
    const products: OrderEntry[] = [];
    consignment.entries.forEach(element => {
      products.push(element.orderEntry);
    });

    return products;
  }
}
