import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-order-confirmation-overview',
  templateUrl: './order-confirmation-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationOverviewComponent implements OnInit, OnDestroy {
  order$: Observable<any>;

  constructor(protected checkoutService: CheckoutFacade) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails();
  }

  ngOnDestroy() {
    this.checkoutService.clearCheckoutData();
  }
}
