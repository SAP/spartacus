import { CheckoutEffects } from './checkout.effect';
import { DeliveryCountriesEffects } from './delivery-countries.effect';
import { TitlesEffects } from './titles.effect';
import { DeliveryModesEffects } from './delivery-modes.effect';

export const effects: any[] = [
  CheckoutEffects,
  DeliveryModesEffects,
  TitlesEffects,
  DeliveryCountriesEffects
];

export * from './checkout.effect';
export * from './delivery-countries.effect';
export * from './titles.effect';
export * from './delivery-modes.effect';
