import { CheckoutEffects } from './checkout.effect';
import { DeliveryCountriesEffects } from './delivery-countries.effect';
import { TitlesEffects } from './titles.effect';

export const effects: any[] = [
  CheckoutEffects,
  TitlesEffects,
  DeliveryCountriesEffects
];

export * from './checkout.effect';
export * from './delivery-countries.effect';
export * from './titles.effect';
