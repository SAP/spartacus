import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Cart } from '@spartacus/cart/main/root';
import { ActiveCartService } from '@spartacus/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'cx-checkout-order-summary',
  templateUrl: './checkout-order-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutOrderSummaryComponent {
  cart$: Observable<Cart>;

  constructor(protected activeCartService: ActiveCartService) {
    this.cart$ = this.activeCartService.getActive();
  }
}
