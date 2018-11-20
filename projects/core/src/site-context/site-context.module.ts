import { NgModule } from '@angular/core';

import { SiteContextOccModule } from './occ/site-context-occ.module';
import { SiteContextStoreModule } from './store/site-context-store.module';
import { LanguageService } from './facade/language.service';
import { CurrencyService } from './facade/currency.service';

import { OccModule } from '../occ/occ.module';

@NgModule({
  imports: [OccModule, SiteContextOccModule, SiteContextStoreModule],
  providers: [LanguageService, CurrencyService]
})
export class SiteContextModule {}
