import { APP_INITIALIZER, Provider } from '@angular/core';
import { LanguageService } from '../facade/language.service';
import { CurrencyService } from '../facade/currency.service';
import { OccConfig } from '../../occ/config/occ-config';
import { BaseSiteService } from '../facade/base-site.service';
import { SiteContextConfig } from '../config/site-context-config';
import { getContextParameterDefault } from '../config/context-config-utils';
import {
  BASE_SITE_CONTEXT_ID,
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
} from './context-service-map';

export function inititializeContext(
  config: SiteContextConfig,
  baseSiteService: BaseSiteService,
  langService: LanguageService,
  currService: CurrencyService
) {
  return () => {
    baseSiteService.initialize(
      getContextParameterDefault(config, BASE_SITE_CONTEXT_ID)
    );
    langService.initialize(
      getContextParameterDefault(config, LANGUAGE_CONTEXT_ID)
    );
    currService.initialize(
      getContextParameterDefault(config, CURRENCY_CONTEXT_ID)
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
