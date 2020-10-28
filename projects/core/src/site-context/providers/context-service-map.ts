import { Provider, Type } from '@angular/core';
import { LanguageService } from '../facade/language.service';
import { CurrencyService } from '../facade/currency.service';
import { SiteContext } from '../facade/site-context.interface';
import { BaseSiteService } from '../facade/base-site.service';
import { BaseSitesService } from '../facade/base-sites.service';
import {
  BASE_SITE_CONTEXT_ID,
  BASE_SITES_CONTEXT_ID,
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
} from './context-ids';

export abstract class ContextServiceMap {
  [context: string]: Type<SiteContext<any>>;
}

export function serviceMapFactory() {
  return {
    [LANGUAGE_CONTEXT_ID]: LanguageService,
    [CURRENCY_CONTEXT_ID]: CurrencyService,
    [BASE_SITE_CONTEXT_ID]: BaseSiteService,
    [BASE_SITES_CONTEXT_ID]: BaseSitesService,
  };
}

export const contextServiceMapProvider: Provider = {
  provide: ContextServiceMap,
  useFactory: serviceMapFactory,
};
