import { CheckoutEffects } from './checkout.effect';
import { DeliveryCountriesEffects } from './delivery-countries.effect';
import { CardTypesEffects } from './card-types.effect';
import { AddressVerificationEffect } from './address-verification.effect';

export const effects: any[] = [
  CheckoutEffects,
  AddressVerificationEffect,
  DeliveryCountriesEffects,
  CardTypesEffects
];

export * from './checkout.effect';
export * from './delivery-countries.effect';
export * from './card-types.effect';
export * from './address-verification.effect';
