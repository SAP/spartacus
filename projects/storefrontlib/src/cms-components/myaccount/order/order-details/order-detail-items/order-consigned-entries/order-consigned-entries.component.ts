import { Component, Input, OnInit } from '@angular/core';
import { Consignment, Order, OrderEntry } from '@spartacus/core';

@Component({
  selector: 'cx-order-consigned-entries',
  templateUrl: './order-consigned-entries.component.html',
})
export class OrderConsignedEntriesComponent implements OnInit {
  @Input() consignments: Consignment[];
  @Input() order: Order;

  ngOnInit() {}

  getConsignmentProducts(consignment: Consignment): OrderEntry[] {
    const products: OrderEntry[] = [];
    consignment.entries.forEach(element => {
      products.push(element.orderEntry);
    });

    return products;
  }
}
