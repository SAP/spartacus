import { CheckoutEffects } from './checkout.effect';
import { DeliveryCountriesEffects } from './delivery-countries.effect';
import { TitlesEffects } from './titles.effect';
import { CardTypesEffects } from './card-types.effect';

export const effects: any[] = [
  CheckoutEffects,
  TitlesEffects,
  DeliveryCountriesEffects,
  CardTypesEffects
];

export * from './checkout.effect';
export * from './delivery-countries.effect';
export * from './titles.effect';
export * from './card-types.effect';
