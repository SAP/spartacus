import { LanguagesEffects } from './languages.effect';
import { CurrenciesEffects } from './currencies.effect';
import { BaseSiteEffects } from './base-site.effect';
import { BaseSitesEffects } from './base-sites.effect';

export const effects: any[] = [
  LanguagesEffects,
  CurrenciesEffects,
  BaseSiteEffects,
  BaseSitesEffects,
];

export * from './languages.effect';
export * from './currencies.effect';
export * from './base-site.effect';
export * from './base-sites.effect';
