import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CheckoutFacade } from '@spartacus/checkout/base/root';
import { Order } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-confirmation-overview',
  templateUrl: './checkout-order-confirmation-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutOrderConfirmationOverviewComponent implements OnDestroy {
  order$: Observable<Order | undefined> = this.checkoutFacade.getOrder();

  constructor(protected checkoutFacade: CheckoutFacade) {}

  ngOnDestroy(): void {
    this.checkoutFacade.clearOrder();
  }
}
