import { APP_INITIALIZER, Provider } from '@angular/core';
import { LanguageService } from '../facade/language.service';
import { CurrencyService } from '../facade/currency.service';
import { OccConfig } from '../../occ/config/occ-config';
import { BaseSiteService } from '../facade/base-site.service';
import { SiteContextConfig } from '../config/site-context-config';

export function inititializeContext(
  config: SiteContextConfig,
  baseSiteService: BaseSiteService,
  langService: LanguageService,
  currService: CurrencyService
) {
  return () => {
    const contextParams = config.context && config.context.parameters;

    baseSiteService.initialize(
      contextParams.baseSite && contextParams.baseSite.default
    );
    langService.initialize(
      contextParams.language && contextParams.language.default
    );
    currService.initialize(
      contextParams.currency && contextParams.currency.default
    );
  };
}

export const contextServiceProviders: Provider[] = [
  BaseSiteService,
  LanguageService,
  CurrencyService,
  {
    provide: APP_INITIALIZER,
    useFactory: inititializeContext,
    deps: [OccConfig, BaseSiteService, LanguageService, CurrencyService],
    multi: true,
  },
];
