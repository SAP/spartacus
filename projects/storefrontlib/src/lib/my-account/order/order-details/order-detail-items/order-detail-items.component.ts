import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Order, Consignment, OrderEntry } from '@spartacus/core';

import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-items',
  templateUrl: './order-detail-items.component.html',
  styleUrls: ['./order-detail-items.component.scss']
})
export class OrderDetailItemsComponent implements OnInit {
  constructor(private orderDetailsService: OrderDetailsService) {}

  order$: Observable<Order>;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
  }

  getConsignmentProducts(consignment: Consignment): OrderEntry[] {
    const products: OrderEntry[] = [];
    consignment.entries.forEach(element => {
      products.push(element.orderEntry);
    });

    return products;
  }
}
