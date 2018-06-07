import { UserDetailsEffects } from './user-details.effect';
import { UserTokenEffects } from './user-token.effect';
import { UserAddressesEffects } from './user-addresses.effect';
import { UserPaymentMethodsEffects } from './payment-methods.effect';
import { UserRegisterEffects } from './user-register.effect';

export const effects: any[] = [
  UserDetailsEffects,
  UserTokenEffects,
  UserAddressesEffects,
  UserPaymentMethodsEffects,
  UserRegisterEffects
];

export * from './user-token.effect';
export * from './user-details.effect';
export * from './user-addresses.effect';
export * from './payment-methods.effect';
export * from './user-register.effect';
