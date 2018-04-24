import { UserDetailsEffects } from './user-details.effect';
import { UserTokenEffects } from './user-token.effect';
import { UserAddressesEffects } from './user-addresses.effect';

export const effects: any[] = [
  UserDetailsEffects,
  UserTokenEffects,
  UserAddressesEffects
];

export * from './user-token.effect';
export * from './user-details.effect';
export * from './user-addresses.effect';
