import { APP_INITIALIZER, Provider } from '@angular/core';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { BaseSiteService } from '../facade/base-site.service';
import { CurrencyService } from '../facade/currency.service';
import { LanguageService } from '../facade/language.service';

/**
 * @deprecated since 1.3 - should be removed from public API and the logic should be moved to the function `initializeContext`
 */
export function inititializeContext(
  baseSiteService: BaseSiteService,
  langService: LanguageService,
  currService: CurrencyService
) {
  return () => {
    baseSiteService.initialize();
    currService.initialize();
    langService.initialize();
  };
}

export function initializeContext(
  baseSiteService: BaseSiteService,
  langService: LanguageService,
  currService: CurrencyService,
  configInit: ConfigInitializerService
) {
  return () => {
    const initialize = inititializeContext(
      baseSiteService,
      langService,
      currService
    );

    configInit.getStableConfig('context').then(() => {
      initialize();
    });
  };
}

/**
 * @deprecated since 1.3 - should be removed
 */
export const deprecatedContextServiceProviders: Provider[] = [
  BaseSiteService,
  LanguageService,
  CurrencyService,
  {
    provide: APP_INITIALIZER,
    useFactory: inititializeContext,
    deps: [BaseSiteService, LanguageService, CurrencyService],
    multi: true,
  },
];

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
    ],
    multi: true,
  },
];
