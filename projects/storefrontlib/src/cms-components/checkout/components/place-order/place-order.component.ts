import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { CheckoutService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-place-order',
  templateUrl: './place-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceOrderComponent implements OnInit, OnDestroy {
  tAndCToggler = false;
  placeOrderSubscription: Subscription;

  constructor(
    private checkoutService: CheckoutService,
    private routingService: RoutingService
  ) {}

  toggleTAndC(): void {
    this.tAndCToggler = !this.tAndCToggler;
  }

  placeOrder(): void {
    this.checkoutService.placeOrder();
  }

  ngOnInit(): void {
    this.placeOrderSubscription = this.checkoutService
      .getOrderDetails()
      .pipe(filter(order => Object.keys(order).length !== 0))
      .subscribe(() => {
        this.routingService.go({ cxRoute: 'orderConfirmation' });
      });
  }

  ngOnDestroy(): void {
    if (this.placeOrderSubscription) {
      this.placeOrderSubscription.unsubscribe();
    }
  }
}
