import { Component, Input } from '@angular/core';
import {
  CartOutlets,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { Consignment, Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-consigned-entries',
  templateUrl: './order-consigned-entries.component.html',
})
export class OrderConsignedEntriesComponent {
  @Input() consignments: Consignment[];
  @Input() order: Order;
  @Input() enableAddToCart$: Observable<boolean | undefined>;
  @Input() buyItAgainTranslation$: Observable<string>;

  promotionLocation: PromotionLocation = PromotionLocation.Order;

  readonly CartOutlets = CartOutlets;

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
