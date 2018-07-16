import { CheckoutEffects } from './checkout.effect';
import { CardTypesEffects } from './card-types.effect';
import { AddressVerificationEffect } from './address-verification.effect';

export const effects: any[] = [
  CheckoutEffects,
  AddressVerificationEffect,
  CardTypesEffects
];

export * from './checkout.effect';
export * from './card-types.effect';
export * from './address-verification.effect';
