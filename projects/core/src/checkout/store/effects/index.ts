import { AddressVerificationEffect } from './address-verification.effect';
import { CardTypesEffects } from './card-types.effect';
import { CheckoutEffects } from './checkout.effect';
import { PaymentTypesEffects } from './payment-types.effect';

export const effects: any[] = [
  CheckoutEffects,
  AddressVerificationEffect,
  CardTypesEffects,
  PaymentTypesEffects,
];

export * from './address-verification.effect';
export * from './card-types.effect';
export * from './checkout.effect';
export * from './payment-types.effect';
