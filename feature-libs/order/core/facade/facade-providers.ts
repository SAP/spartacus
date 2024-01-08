/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import {
  OrderFacade,
  OrderHistoryFacade,
  OrderReturnRequestFacade,
  ReorderOrderFacade,
  ReplenishmentOrderHistoryFacade,
  ScheduledReplenishmentOrderFacade,
} from '@spartacus/order/root';
import { MyAccountV2OrderHistoryService } from './my-account-v2-order-history.service';
import { OrderHistoryService } from './order-history.service';
import { OrderReturnRequestService } from './order-return-request.service';
import { OrderService } from './order.service';
import { ReorderOrderService } from './reorder-order.service';
import { ReplenishmentOrderHistoryService } from './replenishment-order-history.service';
import { ScheduledReplenishmentOrderService } from './scheduled-replenishment-order.service';

export const facadeProviders: Provider[] = [
  OrderReturnRequestService,
  {
    provide: OrderReturnRequestFacade,
    useExisting: OrderReturnRequestService,
  },
  MyAccountV2OrderHistoryService,
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
  ReorderOrderService,
  {
    provide: ReorderOrderFacade,
    useExisting: ReorderOrderService,
  },
];
