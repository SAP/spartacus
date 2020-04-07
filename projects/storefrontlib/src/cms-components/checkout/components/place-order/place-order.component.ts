import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { CheckoutService, RoutingService } from '@spartacus/core';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

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
      .pipe(filter((order) => Object.keys(order).length !== 0))
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
