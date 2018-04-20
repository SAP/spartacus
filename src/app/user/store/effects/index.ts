import { UserDetailsEffects } from './user-details.effect';
import { UserTokenEffects } from './user-token.effect';
import { UserAddressesEffects } from './user-addresses.effect';
import { UserPaymentMethodsEffects } from './user-payment-methods.effect';

export const effects: any[] = [
  UserDetailsEffects,
  UserTokenEffects,
  UserAddressesEffects,
  UserPaymentMethodsEffects
];

export * from './user-token.effect';
export * from './user-details.effect';
export * from './user-addresses.effect';
export * from './user-payment-methods.effect';
