import { UserDetailsEffects } from './user-details.effect';
import { UserAddressesEffects } from './user-addresses.effect';
import { UserPaymentMethodsEffects } from './payment-methods.effect';
import { UserRegisterEffects } from './user-register.effect';
import { UserOrdersEffect } from './user-orders.effect';
import { TitlesEffects } from './titles.effect';
import { DeliveryCountriesEffects } from './delivery-countries.effect';
import { RegionsEffects } from './regions.effect';
import { OrderDetailsEffect } from './order-details.effect';

export const effects: any[] = [
  DeliveryCountriesEffects,
  RegionsEffects,
  TitlesEffects,
  UserDetailsEffects,
  UserAddressesEffects,
  UserPaymentMethodsEffects,
  UserRegisterEffects,
  UserOrdersEffect,
  OrderDetailsEffect
];

export * from './user-details.effect';
export * from './user-addresses.effect';
export * from './payment-methods.effect';
export * from './user-register.effect';
export * from './user-orders.effect';
export * from './titles.effect';
export * from './delivery-countries.effect';
export * from './regions.effect';
export * from './order-details.effect';
