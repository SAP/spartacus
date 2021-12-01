import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PromotionLocation } from '@spartacus/cart/main/root';
import { CheckoutFacade } from '@spartacus/checkout/base/root';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-confirmation-items',
  templateUrl: './checkout-order-confirmation-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutOrderConfirmationItemsComponent
  implements OnInit, OnDestroy
{
  promotionLocation: PromotionLocation = PromotionLocation.Checkout;
  order$: Observable<Order | undefined>;

  constructor(protected checkoutFacade: CheckoutFacade) {}

  ngOnInit() {
    this.order$ = this.checkoutFacade.getOrder();
  }

  ngOnDestroy() {
    this.checkoutFacade.clearOrder();
  }
}
