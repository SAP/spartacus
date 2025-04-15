import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import {
  RecurringCharge,
  SubscriptionProductService,
} from '@spartacus/subscription-billing/root';
import { OutletContextData } from '@spartacus/storefront';
@Component({
  selector: 'cx-subscription-order-confirmation',
  standalone: false,
  templateUrl: './subscription-order-confirmation.component.html',
})
export class SubscriptionOrderConfirmationComponent {
  protected cartItemContext = inject(CartItemContext);
  protected productService = inject(SubscriptionProductService);
  protected outletContext = inject<OutletContextData<any>>(OutletContextData);

  readonly orderEntry$: Signal<OrderEntry | null> = toSignal(
    this.cartItemContext.item$,
    { initialValue: null }
  );
  readonly mode = computed(
    () => this.outletContext?.context?.mode ?? 'confirmation'
  );

  isCurrentProductSubscription: Signal<boolean> = computed(() => {
    const product = this.orderEntry$()?.product;
    if (product !== null && product !== undefined) {
      return this.productService.isSubscription(product);
    } else {
      return false;
    }
  });
  readonly recurringCharges = computed((): RecurringCharge[] => {
    return this.orderEntry$()?.product?.sapPricePlan?.recurringCharges ?? [];
  });

  readonly billingTimeName = computed(() => {
    return this.orderEntry$()?.product?.sapSubscriptionTerm?.billingPlan
      ?.billingTime?.name;
  });
}
