import { NgModule, APP_INITIALIZER } from '@angular/core';

import { SiteContextOccModule } from './occ/site-context-occ.module';
import { SiteContextStoreModule } from './store/site-context-store.module';
import { LanguageService } from './facade/language.service';
import { CurrencyService } from './facade/currency.service';

function inititializeContext(
  langService: LanguageService,
  currService: CurrencyService
) {
  return () => {
    langService.initialize();
    currService.initialize();
  };
}

@NgModule({
  imports: [SiteContextOccModule, SiteContextStoreModule],

  providers: [
    LanguageService,
    CurrencyService,
    {
      provide: APP_INITIALIZER,
      useFactory: inititializeContext,
      deps: [LanguageService, CurrencyService],
      multi: true
    }
  ]
})
export class SiteContextModule {}
