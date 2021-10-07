import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { Order } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-confirmation-totals',
  templateUrl: './order-confirmation-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationTotalsComponent implements OnInit, OnDestroy {
  order$: Observable<Order | undefined>;

  constructor(protected checkoutService: CheckoutFacade) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrder();
  }

  ngOnDestroy() {
    this.checkoutService.clearOrder();
  }
}
