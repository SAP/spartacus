import { CheckoutEffects } from './checkout.effect';
import { ReplenishmentOrderEffects } from './replenishment-order.effect';

export const effects: any[] = [CheckoutEffects, ReplenishmentOrderEffects];

export * from './checkout.effect';
export * from './replenishment-order.effect';
