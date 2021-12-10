import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CartOutlets, PromotionLocation } from '@spartacus/cart/main/root';
import { CheckoutFacade } from '@spartacus/checkout/base/root';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-confirmation-items',
  templateUrl: './checkout-order-confirmation-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutOrderConfirmationItemsComponent implements OnDestroy {
  readonly cartOutlets = CartOutlets;
  promotionLocation: PromotionLocation = PromotionLocation.Checkout;
  order$: Observable<Order | undefined> = this.checkoutFacade.getOrder();

  constructor(protected checkoutFacade: CheckoutFacade) {}

  ngOnDestroy() {
    this.checkoutFacade.clearOrder();
  }
}
