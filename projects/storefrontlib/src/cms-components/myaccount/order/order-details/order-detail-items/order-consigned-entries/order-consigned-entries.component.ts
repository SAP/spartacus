import { Component, Input } from '@angular/core';
import {
  Consignment,
  Order,
  OrderEntry,
  PromotionLocation,
  PromotionResult,
} from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'cx-order-consigned-entries',
  templateUrl: './order-consigned-entries.component.html',
})
export class OrderConsignedEntriesComponent {
  @Input() consignments: Consignment[];
  @Input() order: Order;
  promotionLocation: PromotionLocation = PromotionLocation.Order;
  @Input() promotions: { [key: number]: Observable<PromotionResult[]> } = {};


  getConsignmentProducts(consignment: Consignment): OrderEntry[] {
    const products: OrderEntry[] = [];
    consignment.entries.forEach((element) => {
      products.push(element.orderEntry);
    });

    return products;
  }
}
