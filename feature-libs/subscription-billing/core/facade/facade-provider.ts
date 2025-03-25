import { Provider } from '@angular/core';
import { SubscriptionBillingService } from './subscription-billing.service';
import { SubscriptionBillingFacade } from '@spartacus/subscription-billing/root';

export const facadeProviders: Provider[] = [
  SubscriptionBillingService,
  {
    provide: SubscriptionBillingFacade,
    useExisting: SubscriptionBillingService,
  },
];
