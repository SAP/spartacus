import { APP_INITIALIZER, Provider } from '@angular/core';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { BaseSiteService } from '../facade/base-site.service';
import { CurrencyService } from '../facade/currency.service';
import { LanguageService } from '../facade/language.service';

export function inititializeContext(
  baseSiteService: BaseSiteService,
  langService: LanguageService,
  currService: CurrencyService,
  configInit?: ConfigInitializerService
) {
  return () => {
    function initialize() {
      baseSiteService.initialize();
      langService.initialize();
      currService.initialize();
    }

    if (configInit) {
      configInit.getStableConfig('context').then(() => {
        initialize();
      });
    } else {
      initialize();
    }
  };
}

export const contextServiceProviders: Provider[] = [
  BaseSiteService,
  LanguageService,
  CurrencyService,
  {
    provide: APP_INITIALIZER,
    useFactory: inititializeContext,
    deps: [
      BaseSiteService,
      LanguageService,
      CurrencyService,
      ConfigInitializerService,
    ],
    multi: true,
  },
];
