import { APP_INITIALIZER, Provider } from '@angular/core';
import { BaseSiteInitializer } from '../services/base-site-initializer';
import { CurrencyInitializer } from '../services/currency-initializer';
import { LanguageInitializer } from '../services/language-initializer';

export function initializeCurrency(currencyInitializer: CurrencyInitializer) {
  const result = () => {
    currencyInitializer.initialize();
  };
  return result;
}
export function initializeLanguage(languageInitializer: LanguageInitializer) {
  const result = () => {
    languageInitializer.initialize();
  };
  return result;
}

export function initializeBaseSite(baseSiteInitializer: BaseSiteInitializer) {
  const result = () => {
    baseSiteInitializer.initialize();
  };
  return result;
}

export const contextInitializerProviders: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: initializeLanguage,
    deps: [LanguageInitializer],
    multi: true,
  },
  {
    provide: APP_INITIALIZER,
    useFactory: initializeCurrency,
    deps: [CurrencyInitializer],
    multi: true,
  },
  {
    provide: APP_INITIALIZER,
    useFactory: initializeBaseSite,
    deps: [BaseSiteInitializer],
    multi: true,
  },
];
