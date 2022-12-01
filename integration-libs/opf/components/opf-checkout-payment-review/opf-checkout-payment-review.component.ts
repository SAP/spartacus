import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActiveCartFacade, PaymentType } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-checkout-payment-review',
  templateUrl: './opf-checkout-payment-review.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OPFCheckoutPaymentReviewComponent {
  constructor(protected activeCartFacade: ActiveCartFacade) {}

  get paymentType$(): Observable<PaymentType | undefined> {
    return this.activeCartFacade
      .getActive()
      .pipe(map((cart) => cart.paymentType));
  }
}
