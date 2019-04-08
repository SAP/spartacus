import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import { CheckoutService, RoutingService } from '@spartacus/core';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceOrderComponent implements OnInit, OnDestroy {
  tAndCToggler = false;
  placeOrderSubscription: Subscription;

  @Output() clearCheckoutData = new EventEmitter<void>();

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
        // checkout steps are done
        this.clearCheckoutData.emit();
        this.routingService.go({ route: ['orderConfirmation'] });
      });
  }

  ngOnDestroy(): void {
    this.placeOrderSubscription.unsubscribe();
  }
}
