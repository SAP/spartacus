import { CheckoutEffects } from './checkout.effect';
import { PaymentTypesEffects } from './payment-types.effect';
import { ReplenishmentOrderEffects } from './replenishment-order.effect';

export const effects: any[] = [
  CheckoutEffects,
  PaymentTypesEffects,
  ReplenishmentOrderEffects,
];

export * from './checkout.effect';
export * from './payment-types.effect';
export * from './replenishment-order.effect';
