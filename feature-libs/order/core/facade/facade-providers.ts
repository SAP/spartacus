/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import {
  OrderFacade,
  OrderHistoryFacade,
  OrderReturnRequestFacade,
  ReplenishmentOrderHistoryFacade,
  ScheduledReplenishmentOrderFacade,
} from '@spartacus/order/root';
import { OrderHistoryService } from './order-history.service';
import { OrderReturnRequestService } from './order-return-request.service';
import { OrderService } from './order.service';
import { ReplenishmentOrderHistoryService } from './replenishment-order-history.service';
import { ScheduledReplenishmentOrderService } from './scheduled-replenishment-order.service';

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
  ScheduledReplenishmentOrderService,
  {
    provide: ScheduledReplenishmentOrderFacade,
    useExisting: ScheduledReplenishmentOrderService,
  },
  OrderService,
  {
    provide: OrderFacade,
    useExisting: OrderService,
  },
];
