/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConsignmentTrackingByIdEffects } from './consignment-tracking-by-id.effect';
import { ConsignmentTrackingEffects } from './consignment-tracking.effect';
import { OrderByIdEffect } from './order-by-id.effect';
import { OrderDetailsEffect } from './order-details.effect';
import { OrderReturnRequestEffect } from './order-return-request.effect';
import { OrdersEffect } from './orders.effect';
import { ReplenishmentOrderDetailsEffect } from './replenishment-order-details.effect';
import { ReplenishmentOrdersEffect } from './replenishment-orders.effect';

export const effects: any[] = [
  OrdersEffect,
  OrderDetailsEffect,
  ConsignmentTrackingEffects,
  OrderReturnRequestEffect,
  ReplenishmentOrderDetailsEffect,
  ReplenishmentOrdersEffect,
  ConsignmentTrackingByIdEffects,
  OrderByIdEffect,
];

export * from './consignment-tracking.effect';
export * from './order-details.effect';
export * from './order-return-request.effect';
export * from './orders.effect';
export * from './replenishment-order-details.effect';
export * from './replenishment-orders.effect';
export * from './consignment-tracking-by-id.effect';
export * from './order-by-id.effect';
