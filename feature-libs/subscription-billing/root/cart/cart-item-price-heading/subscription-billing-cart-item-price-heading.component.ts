import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { OutletContextData } from '@spartacus/storefront';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-subscription-billing-cart-item-price-heading',
  standalone: false,
  templateUrl: './subscription-billing-cart-item-price-heading.component.html',
})
export class SubscriptionBillingCartItemPriceHeadingComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();

    constructor(
      // Inject OutletContextData dependency
      @Optional()
      @Inject(OutletContextData)
      protected outlet: OutletContextData
    ) {}

  ngOnInit(): void {

    if (this.outlet?.context$) {
      this.subscription.add(
        this.outlet.context$.subscribe((context) => {
          context.readonly = false;
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
