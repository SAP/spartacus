import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActiveCartFacade, Cart } from '@spartacus/cart/main/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-checkout-order-summary',
  templateUrl: './checkout-order-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutOrderSummaryComponent {
  cart$: Observable<Cart>;

  constructor(protected activeCartFacade: ActiveCartFacade) {
    this.cart$ = this.activeCartFacade.getActive();
  }
}
