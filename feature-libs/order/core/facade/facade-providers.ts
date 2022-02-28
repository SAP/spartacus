import { Provider } from '@angular/core';
import {
  OrderHistoryFacade,
  OrderReturnRequestFacade,
  ReplenishmentOrderHistoryFacade,
  UnnamedFacade,
  UnnamedScheduledReplenishmentFacade,
} from '@spartacus/order/root';
import { OrderHistoryService } from './order-history.service';
import { OrderReturnRequestService } from './order-return-request.service';
import { ReplenishmentOrderHistoryService } from './replenishment-order-history.service';
import { UnnamedScheduledReplenishmentService } from './unnamed-scheduled-replenishment.service';
import { UnnamedService } from './unnamed.service';

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
