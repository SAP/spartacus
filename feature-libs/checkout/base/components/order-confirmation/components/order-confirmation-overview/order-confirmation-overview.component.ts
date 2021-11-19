import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CheckoutFacade } from '@spartacus/checkout/base/root';
import { Order } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-confirmation-overview',
  templateUrl: './order-confirmation-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationOverviewComponent implements OnDestroy {
  order$: Observable<Order | undefined> = this.checkoutService.getOrder();

  constructor(protected checkoutService: CheckoutFacade) {}

  ngOnDestroy(): void {
    this.checkoutService.clearOrder();
  }
}
