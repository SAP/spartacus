import { LanguagesEffects } from './languages.effect';
import { CurrenciesEffects } from './currencies.effect';
import { BaseSiteEffects } from './base-site.effect';

export const effects: any[] = [
  LanguagesEffects,
  CurrenciesEffects,
  BaseSiteEffects,
];

export * from './languages.effect';
export * from './currencies.effect';
export * from './base-site.effect';
