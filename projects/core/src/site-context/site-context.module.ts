import { NgModule, APP_INITIALIZER, Type } from '@angular/core';

import { SiteContextOccModule } from './occ/site-context-occ.module';
import { SiteContextStoreModule } from './store/site-context-store.module';
import { LanguageService } from './facade/language.service';
import { CurrencyService } from './facade/currency.service';
import { OccConfig } from '../occ/index';
import { StateModule } from '../state/index';
import { SiteContext } from './facade/site-context.interface';
import { Config, ConfigModule } from '../config/config.module';
import { defaultSiteContextConfig } from './config/default-site-context-config';
import { SiteContextConfig } from './config/site-context-config';

export abstract class ContextServiceMap {
  [context: string]: Type<SiteContext<any>>;
}

export const LANGUAGE_CONTEXT_ID = 'language';
export const CURRENCY_CONTEXT_ID = 'currency';

export function inititializeContext(
  config: OccConfig,
  langService: LanguageService,
  currService: CurrencyService
) {
  return () => {
    langService.initialize(config.site.language);
    currService.initialize(config.site.currency);
  };
}

// @dynamic
@NgModule({
  imports: [ConfigModule.withConfig(defaultSiteContextConfig), StateModule, SiteContextOccModule, SiteContextStoreModule],
  providers: [
    LanguageService,
    CurrencyService,
    {
      provide: ContextServiceMap,
      useValue: {
        [LANGUAGE_CONTEXT_ID]: LanguageService,
        [CURRENCY_CONTEXT_ID]: CurrencyService
      }
    },
    {
      provide: APP_INITIALIZER,
      useFactory: inititializeContext,
      deps: [OccConfig, LanguageService, CurrencyService],
      multi: true
    },
    { provide: SiteContextConfig, useExisting: Config }
  ]
})
export class SiteContextModule {}
