/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OrderHistoryConnector } from './connectors/order-history.connector';
import { OrderConnector } from './connectors/order.connector';
import { ReorderOrderConnector } from './connectors/reorder-order.connector';
import { ReplenishmentOrderHistoryConnector } from './connectors/replenishment-order-history.connector';
import { ScheduledReplenishmentOrderConnector } from './connectors/scheduled-replenishment-order.connector';
import { facadeProviders } from './facade/facade-providers';
import { OrderStoreModule } from './store/order-store.module';
import { OrderAttachmentsConnector } from './connectors';

@NgModule({
  imports: [OrderStoreModule],
  providers: [
    ...facadeProviders,
    OrderHistoryConnector,
    ReplenishmentOrderHistoryConnector,
    OrderConnector,
    ScheduledReplenishmentOrderConnector,
    ReorderOrderConnector,
    OrderAttachmentsConnector,
  ],
})
export class OrderCoreModule {}
