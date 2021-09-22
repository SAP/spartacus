import { Component, Input } from '@angular/core';
import { PromotionLocation } from '@spartacus/cart/main/root';
import { Consignment, Order, OrderEntry } from '@spartacus/core';

/**
 * @deprecated since 4.2 - use order lib instead
 */
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
    consignment.entries.forEach((element) => {
      products.push(element.orderEntry);
    });

    return products;
  }
}
