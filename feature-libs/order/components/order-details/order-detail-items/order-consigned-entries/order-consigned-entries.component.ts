import { Component, Input } from '@angular/core';
import { PromotionLocation } from '@spartacus/core';
import { Consignment, Order, OrderEntry } from '@spartacus/order/root';

@Component({
  selector: 'cx-order-consigned-entries',
  templateUrl: './order-consigned-entries.component.html',
})
export class OrderConsignedEntriesComponent {
  @Input() consignments: Consignment[];
  @Input() order: Order;
  promotionLocation: PromotionLocation = PromotionLocation.Order;

  getConsignmentProducts(consignment: Consignment): OrderEntry[] {
    const products: OrderEntry[] = [];
    consignment.entries?.forEach((element) => {
      if (element.orderEntry) {
        products.push(element.orderEntry);
      }
    });

    return products;
  }
}
