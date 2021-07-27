import { Injectable, OnDestroy } from '@angular/core';
import { OrderPlacedEvent } from '@spartacus/checkout/root';
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
      this.eventService.get(OrderPlacedEvent).subscribe(() => {
        this.configuratorCartService.removeCartBoundConfigurations();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
