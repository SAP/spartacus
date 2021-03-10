import { APP_INITIALIZER, Provider } from '@angular/core';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { BaseSiteService } from '../facade/base-site.service';
import { CurrencyService } from '../facade/currency.service';
import { LanguageService } from '../facade/language.service';
import { SiteContextRoutesHandler } from '../services/site-context-routes-handler';

export function initializeContext(
  baseSiteService: BaseSiteService,
  langService: LanguageService,
  currService: CurrencyService,
  configInit: ConfigInitializerService,
  siteContextRoutesHandler: SiteContextRoutesHandler
) {
  return async () => {
    await configInit.getStableConfig('context');
    siteContextRoutesHandler.init();
    baseSiteService.initialize();
    langService.initialize();
    currService.initialize();
  };
}

export const contextServiceProviders: Provider[] = [
  BaseSiteService,
  LanguageService,
  CurrencyService,
  {
    provide: APP_INITIALIZER,
    useFactory: initializeContext,
    deps: [
      BaseSiteService,
      LanguageService,
      CurrencyService,
      ConfigInitializerService,
      SiteContextRoutesHandler,
    ],
    multi: true,
  },
];
