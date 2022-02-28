import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { Order, OrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-confirmation-totals',
  templateUrl: './unnamed-order-confirmation-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnnamedOrderConfirmationTotalsComponent implements OnDestroy {
  readonly cartOutlets = CartOutlets;
  order$: Observable<Order | undefined> = this.checkoutFacade.getOrderDetails();

  constructor(protected checkoutFacade: OrderFacade) {}

  ngOnDestroy() {
    this.checkoutFacade.clearPlacedOrder();
  }
}
