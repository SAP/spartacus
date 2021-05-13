import { APP_INITIALIZER, Provider } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { BaseSiteService } from '../facade/base-site.service';
import { CurrencyService } from '../facade/currency.service';
import { LanguageService } from '../facade/language.service';
import { SiteContextRoutesHandler } from '../services/site-context-routes-handler';

export function initializeContext(
  configInit: ConfigInitializerService,
  siteContextRoutesHandler: SiteContextRoutesHandler
) {
  return () => {
    return configInit
      .getStable('context')
      .pipe(
        tap(() => {
          siteContextRoutesHandler.init();
        })
      )
      .toPromise();
  };
}

export const contextServiceProviders: Provider[] = [
  BaseSiteService,
  LanguageService,
  CurrencyService,
  {
    provide: APP_INITIALIZER,
    useFactory: initializeContext,
    deps: [ConfigInitializerService, SiteContextRoutesHandler],
    multi: true,
  },
];
