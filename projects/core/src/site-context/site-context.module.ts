import { NgModule } from '@angular/core';

import { SiteContextOccModule } from './occ/site-context-occ.module';
import { SiteContextStoreModule } from './store/site-context-store.module';
import { LanguageService } from './facade/language.service';
import { CurrencyService } from './facade/currency.service';

@NgModule({
  imports: [SiteContextOccModule, SiteContextStoreModule],
  providers: [LanguageService, CurrencyService]
})
export class SiteContextModule {}
