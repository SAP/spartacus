import { Component, ElementRef, Inject, inject, Optional, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderEntry } from '@spartacus/cart/base/root';
import { EventService, FeatureConfigService } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { ViewSubscriptionChargesEvent } from '@spartacus/subscription-billing/root';

@Component({
  selector: 'cx-subscription-billing-cart-charges-button',
  standalone: false,
  templateUrl: './subscription-billing-cart-charges-button.component.html'
})
export class SubscriptionBillingCartChargesButtonComponent {
  protected eventService = inject(EventService);
  private featureConfigService = inject(FeatureConfigService);

  // Inject OutletContextData dependency
  @Optional()
  @Inject(OutletContextData)
  protected outlet = inject(OutletContextData);
  context = toSignal<any>(this.outlet?.context$);

  /**
   * Element responsible for opening the modal. The reference is used to refocus the modal after it closes.
   */
  @ViewChild('subscriptionChargesDialogTriggerEl')
  subscriptionChargesDialogTriggerEl: ElementRef;

  onViewCharges(subscriptionProduct: OrderEntry) {
    const newEvent = new ViewSubscriptionChargesEvent();
    newEvent.data = subscriptionProduct;
    if (this.featureConfigService.isEnabled('a11yDialogTriggerRefocus')) {
      newEvent.triggerElementRef = this.subscriptionChargesDialogTriggerEl;
    }
    this.eventService.dispatch(newEvent);
  }
}
