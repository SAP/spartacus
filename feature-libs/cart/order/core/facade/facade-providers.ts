import { Provider } from '@angular/core';
import {
  OrderFacade,
  OrderReturnRequestFacade,
  ReplenishmentOrderFacade,
} from '@spartacus/cart/order/root';
import { OrderReturnRequestService } from './order-return-request.service';
import { OrderService } from './order.service';
import { ReplenishmentOrderService } from './replenishment-order.service';

export const facadeProviders: Provider[] = [
  OrderReturnRequestService,
  {
    provide: OrderReturnRequestFacade,
    useExisting: OrderReturnRequestService,
  },
  {
    provide: OrderFacade,
    useExisting: OrderService,
  },
  {
    provide: ReplenishmentOrderFacade,
    useExisting: ReplenishmentOrderService,
  },
];
