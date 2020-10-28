import { APP_INITIALIZER, Provider } from '@angular/core';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { BaseSiteService } from '../facade/base-site.service';
import { BaseSitesService } from '../facade/base-sites.service';
import { CurrencyService } from '../facade/currency.service';
import { LanguageService } from '../facade/language.service';
import { SiteContextRoutesHandler } from '../services/site-context-routes-handler';

export function initializeContext(
  baseSiteService: BaseSiteService,
  baseSitesService: BaseSitesService,
  langService: LanguageService,
  currService: CurrencyService,
  configInit: ConfigInitializerService,
  siteContextRoutesHandler: SiteContextRoutesHandler
) {
  return () => {
    configInit.getStableConfig('context').then(() => {
      siteContextRoutesHandler.init().then(() => {
        baseSiteService.initialize();
        baseSitesService.initialize();
        langService.initialize();
        currService.initialize();
      });
    });
  };
}

export const contextServiceProviders: Provider[] = [
  BaseSiteService,
  BaseSitesService,
  LanguageService,
  CurrencyService,
  {
    provide: APP_INITIALIZER,
    useFactory: initializeContext,
    deps: [
      BaseSiteService,
      BaseSitesService,
      LanguageService,
      CurrencyService,
      ConfigInitializerService,
      SiteContextRoutesHandler,
    ],
    multi: true,
  },
];
