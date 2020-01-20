import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Order,
  Consignment,
  OrderEntry,
  PromotionResult,
  PromotionLocation,
} from '@spartacus/core';

import { OrderDetailsService } from '../order-details.service';
import { PromotionService } from '../../../../../shared/services/promotion/promotion.service';

@Component({
  selector: 'cx-order-details-items',
  templateUrl: './order-detail-items.component.html',
})
export class OrderDetailItemsComponent implements OnInit {
  constructor(
    orderDetailsService: OrderDetailsService,
    // tslint:disable-next-line:unified-signatures
    promotionService: PromotionService
  );

  /**
   * @deprecated Since 1.5
   * Use promotionService instead of the promotion inputs.
   * Remove issue: #5670
   */
  constructor(orderDetailsService: OrderDetailsService);

  constructor(
    private orderDetailsService: OrderDetailsService,
    protected promotionService?: PromotionService
  ) {}

  promotionLocation: PromotionLocation = PromotionLocation.Order;
  order$: Observable<Order>;
  orderPromotions$: Observable<PromotionResult[]>;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
    this.orderPromotions$ = this.promotionService.getOrderPromotions(
      this.promotionLocation
    );
  }

  /**
   * @deprecated
   * NOTE: This function will be removed in version 2.0
   */
  getConsignmentProducts(consignment: Consignment): OrderEntry[] {
    const products: OrderEntry[] = [];
    consignment.entries.forEach(element => {
      products.push(element.orderEntry);
    });

    return products;
  }
}
