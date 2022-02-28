import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CartOutlets, PromotionLocation } from '@spartacus/cart/base/root';
import { Order, OrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-confirmation-items',
  templateUrl: './unnamed-order-confirmation-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnnamedOrderConfirmationItemsComponent implements OnDestroy {
  readonly cartOutlets = CartOutlets;
  promotionLocation: PromotionLocation = PromotionLocation.Checkout;
  order$: Observable<Order | undefined> = this.checkoutFacade.getOrderDetails();

  constructor(protected checkoutFacade: OrderFacade) {}

  ngOnDestroy() {
    this.checkoutFacade.clearPlacedOrder();
  }
}
