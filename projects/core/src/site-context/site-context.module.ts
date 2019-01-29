import { NgModule, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';

import { OccConfig } from '../occ/index';
import { StateModule } from '../state/index';

import { CurrencyService } from './facade/currency.service';
import { LanguageService } from './facade/language.service';
import { interceptors } from './occ/index';
import { SiteContextOccModule } from './occ/site-context-occ.module';
import { SiteContextStoreModule } from './store/site-context-store.module';

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
  imports: [StateModule, SiteContextOccModule, SiteContextStoreModule],
  providers: [
    LanguageService,
    CurrencyService,
    {
      provide: APP_INITIALIZER,
      useFactory: inititializeContext,
      deps: [OccConfig, LanguageService, CurrencyService],
      multi: true
    }
  ]
})
export class SiteContextModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SiteContextModule,
      providers: [...interceptors]
    };
  }
}
