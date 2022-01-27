import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActiveCartFacade, Cart, CartOutlets } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-checkout-order-summary',
  templateUrl: './checkout-order-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutOrderSummaryComponent {
  cart$: Observable<Cart>;

  readonly cartOutlets = CartOutlets;

  constructor(protected activeCartFacade: ActiveCartFacade) {
    this.cart$ = this.activeCartFacade.getActive();
  }
}
