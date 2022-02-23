import { Provider } from '@angular/core';
import {
  OrderFacade,
  OrderReturnRequestFacade,
  ReplenishmentOrderFacade,
  UnnamedFacade,
  UnnamedScheduledReplenishmentFacade,
} from '@spartacus/order/root';
import { OrderReturnRequestService } from './order-return-request.service';
import { OrderService } from './order.service';
import { ReplenishmentOrderService } from './replenishment-order.service';
import { UnnamedScheduledReplenishmentService } from './unnamed-scheduled-replenishment.service';
import { UnnamedService } from './unnamed.service';

export const facadeProviders: Provider[] = [
  OrderReturnRequestService,
  {
    provide: OrderReturnRequestFacade,
    useExisting: OrderReturnRequestService,
  },
  OrderService,
  {
    provide: OrderFacade,
    useExisting: OrderService,
  },
  ReplenishmentOrderService,
  {
    provide: ReplenishmentOrderFacade,
    useExisting: ReplenishmentOrderService,
  },
  UnnamedScheduledReplenishmentService,
  {
    provide: UnnamedScheduledReplenishmentFacade,
    useExisting: UnnamedScheduledReplenishmentService,
  },
  UnnamedService,
  {
    provide: UnnamedFacade,
    useExisting: UnnamedService,
  },
];
