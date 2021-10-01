import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActiveCartFacade, CartOutlets } from '@spartacus/cart/main/root';
import { Cart } from '@spartacus/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'cx-checkout-order-summary',
  templateUrl: './checkout-order-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutOrderSummaryComponent {
  cart$: Observable<Cart>;

  readonly CartOutlets = CartOutlets;

  constructor(protected activeCartService: ActiveCartFacade) {
    this.cart$ = this.activeCartService.getActive();
  }
}
