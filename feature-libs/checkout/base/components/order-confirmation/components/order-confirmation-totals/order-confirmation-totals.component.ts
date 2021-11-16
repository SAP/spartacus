import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CheckoutFacade } from '@spartacus/checkout/base/root';
import { Order } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-confirmation-totals',
  templateUrl: './order-confirmation-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationTotalsComponent implements OnInit, OnDestroy {
  order$: Observable<Order | undefined>;

  constructor(protected checkoutFacade: CheckoutFacade) {}

  ngOnInit() {
    this.order$ = this.checkoutFacade.getOrder();
  }

  ngOnDestroy() {
    this.checkoutFacade.clearOrder();
  }
}
