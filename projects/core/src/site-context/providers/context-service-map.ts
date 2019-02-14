import { Provider, Type } from '@angular/core';
import { LanguageService } from '../facade/language.service';
import { CurrencyService } from '../facade/currency.service';
import { SiteContext } from '../facade/site-context.interface';

export abstract class ContextServiceMap {
  [context: string]: Type<SiteContext<any>>;
}

export const LANGUAGE_CONTEXT_ID = 'LANGUAGE';
export const CURRENCY_CONTEXT_ID = 'CURRENCY';

export function serviceMapFactory() {
  return {
    [LANGUAGE_CONTEXT_ID]: LanguageService,
    [CURRENCY_CONTEXT_ID]: CurrencyService
  };
}

export const contextServiceMapProvider: Provider = {
  provide: ContextServiceMap,
  useFactory: serviceMapFactory
};
