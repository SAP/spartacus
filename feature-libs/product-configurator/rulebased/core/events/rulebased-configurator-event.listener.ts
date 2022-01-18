import { Injectable, OnDestroy } from '@angular/core';
import { CheckoutOrderPlacedEvent } from '@spartacus/checkout/base/root';
import { EventService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { ConfiguratorCartService } from '../facade/configurator-cart.service';

@Injectable({ providedIn: 'root' })
export class RulebasedConfiguratorEventListener implements OnDestroy {
  protected subscription = new Subscription();
  constructor(
    protected configuratorCartService: ConfiguratorCartService,
    protected eventService: EventService
  ) {
    this.onPlaceOrder();
  }

  onPlaceOrder(): void {
    this.subscription.add(
      this.eventService.get(CheckoutOrderPlacedEvent).subscribe(() => {
        this.configuratorCartService.removeCartBoundConfigurations();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
