import { Provider } from '@angular/core';
import { CheckoutScheduledReplenishmentFacade } from '@spartacus/checkout/scheduled-replenishment/root';
import { CheckoutScheduledReplenishmentService } from './checkout-scheduled-replenishment.service';

export const facadeProviders: Provider[] = [
  CheckoutScheduledReplenishmentService,
  {
    provide: CheckoutScheduledReplenishmentFacade,
    useExisting: CheckoutScheduledReplenishmentService,
  },
];
