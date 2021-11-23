import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { Order } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-confirmation-totals',
  templateUrl: './order-confirmation-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationTotalsComponent implements OnDestroy {
  order$: Observable<Order> = this.checkoutService.getOrderDetails();

  constructor(protected checkoutService: CheckoutFacade) {}

  ngOnDestroy() {
    this.checkoutService.clearCheckoutData();
  }
}
