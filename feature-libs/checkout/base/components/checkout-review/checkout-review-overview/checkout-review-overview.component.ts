import { Component } from '@angular/core';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-checkout-review-overview',
  templateUrl: './checkout-review-overview.component.html',
})
export class CheckoutReviewOverviewComponent {
  constructor(protected activeCartFacade: ActiveCartFacade) {}

  get cart$(): Observable<Cart> {
    return this.activeCartFacade.getActive();
  }
}
