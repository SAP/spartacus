import { ConsignmentTrackingEffects } from './consignment-tracking.effect';
import { UnitOrderDetailsEffect } from './order-details.effect';
import { UnitOrderEffect } from './unit-order.effect';

export const effects: any[] = [
    UnitOrderEffect,
    UnitOrderDetailsEffect,
    ConsignmentTrackingEffects,

];

export * from './unit-order.effect';
