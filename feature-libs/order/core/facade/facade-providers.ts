import { Provider } from '@angular/core';
import {
  OrderFacade,
  OrderHistoryFacade,
  OrderReturnRequestFacade,
  ReplenishmentOrderHistoryFacade,
  ScheduledReplenishmentFacade,
} from '@spartacus/order/root';
import { OrderHistoryService } from './order-history.service';
import { OrderReturnRequestService } from './order-return-request.service';
import { OrderService } from './order.service';
import { ReplenishmentOrderHistoryService } from './replenishment-order-history.service';
import { ScheduledReplenishmentService } from './scheduled-replenishment.service';

export const facadeProviders: Provider[] = [
  OrderReturnRequestService,
  {
    provide: OrderReturnRequestFacade,
    useExisting: OrderReturnRequestService,
  },
  OrderHistoryService,
  {
    provide: OrderHistoryFacade,
    useExisting: OrderHistoryService,
  },
  ReplenishmentOrderHistoryService,
  {
    provide: ReplenishmentOrderHistoryFacade,
    useExisting: ReplenishmentOrderHistoryService,
  },
  ScheduledReplenishmentService,
  {
    provide: ScheduledReplenishmentFacade,
    useExisting: ScheduledReplenishmentService,
  },
  OrderService,
  {
    provide: OrderFacade,
    useExisting: OrderService,
  },
];
