import { Component, inject, OnDestroy } from '@angular/core';
import { Product } from '@spartacus/core';
import {
  Order,
  OrderHistoryFacade,
  OrderHistoryList,
} from '@spartacus/order/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-myaccount-order-view',
  templateUrl: './myaccount-order-view.component.html',
})
export class MyAccountOrderViewComponent implements OnDestroy {
  protected orderHistoryFacade = inject(OrderHistoryFacade);
  private PAGE_SIZE = 3;
  orders$: Observable<OrderHistoryList | undefined> =
    this.orderHistoryFacade.getOrderHistoryList(this.PAGE_SIZE);
  isLoaded$: Observable<boolean> =
    this.orderHistoryFacade.getOrderHistoryListLoaded();
  getProduct(order: Order): Product | undefined {
    if (order.entries) {
      for (const entry of order.entries) {
        if (entry.product && entry.product.name && entry.product.images) {
          return entry.product;
        }
      }
    }
  }
  ngOnDestroy(): void {
    this.orderHistoryFacade.clearOrderList();
  }
}
