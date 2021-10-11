import { CheckoutEffects } from './checkout.effect';
import { PaymentTypesEffects } from './payment-types.effect';

export const effects: any[] = [CheckoutEffects, PaymentTypesEffects];

export * from './checkout.effect';
export * from './payment-types.effect';
