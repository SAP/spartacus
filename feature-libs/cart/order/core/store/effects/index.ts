import { ConsignmentTrackingEffects } from './consignment-tracking.effect';
import { OrderDetailsEffect } from './order-details.effect';
import { OrderReturnRequestEffect } from './order-return-request.effect';
import { UserOrdersEffect } from './orders.effect';
import { ReplenishmentOrderDetailsEffect } from './replenishment-order-details.effect';
import { UserReplenishmentOrdersEffect } from './replenishment-orders.effect';

export const effects: any[] = [
  UserOrdersEffect,
  OrderDetailsEffect,
  ConsignmentTrackingEffects,
  OrderReturnRequestEffect,
  ReplenishmentOrderDetailsEffect,
  UserReplenishmentOrdersEffect,
];

export * from './consignment-tracking.effect';
export * from './order-details.effect';
export * from './order-return-request.effect';
export * from './orders.effect';
export * from './replenishment-order-details.effect';
export * from './replenishment-orders.effect';
