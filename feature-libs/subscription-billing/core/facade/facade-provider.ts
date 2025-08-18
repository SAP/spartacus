import { Provider } from '@angular/core';
import { SubscriptionBillingService } from './subscription-billing.service';
import { CancelSubscriptionFacade, SubscriptionBillingFacade } from '@spartacus/subscription-billing/root';
import { SubscriptionBillingCancelService } from './subscription-billing-cancel.service';

export const facadeProviders: Provider[] = [
  SubscriptionBillingService,
  {
    provide: SubscriptionBillingFacade,
    useExisting: SubscriptionBillingService,
  },
  SubscriptionBillingCancelService,
  {
    provide: CancelSubscriptionFacade,
    useExisting: SubscriptionBillingCancelService,
  },
];
