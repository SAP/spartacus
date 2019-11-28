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
    private orderDetailsService: OrderDetailsService,
    protected promotionService: PromotionService
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

  getConsignmentProducts(consignment: Consignment): OrderEntry[] {
    const products: OrderEntry[] = [];
    consignment.entries.forEach(element => {
      products.push(element.orderEntry);
    });

    return products;
  }
}
