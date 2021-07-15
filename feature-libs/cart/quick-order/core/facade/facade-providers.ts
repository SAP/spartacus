import { Provider } from '@angular/core';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import { QuickOrderService } from '../services/quick-order.service';

export const facadeProviders: Provider[] = [
  QuickOrderService,
  {
    provide: QuickOrderFacade,
    useExisting: QuickOrderService,
  },
];
