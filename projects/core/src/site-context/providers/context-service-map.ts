import { Provider, Type } from '@angular/core';
import { LanguageService } from '../facade/language.service';
import { CurrencyService } from '../facade/currency.service';
import { SiteContext } from '../facade/site-context.interface';
import { BaseSiteService } from '../facade/base-site.service';

export abstract class ContextServiceMap {
  [context: string]: Type<SiteContext<any>>;
}

export const LANGUAGE_CONTEXT_ID = 'LANGUAGE';
export const CURRENCY_CONTEXT_ID = 'CURRENCY';
export const BASE_SITE_CONTEXT_ID = 'BASE_SITE';

export function serviceMapFactory() {
  return {
    [LANGUAGE_CONTEXT_ID]: LanguageService,
    [CURRENCY_CONTEXT_ID]: CurrencyService,
    [BASE_SITE_CONTEXT_ID]: BaseSiteService,
  };
}

export const contextServiceMapProvider: Provider = {
  provide: ContextServiceMap,
  useFactory: serviceMapFactory,
};
