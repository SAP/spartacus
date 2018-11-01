import { NgModule } from '@angular/core';

import { ConfigModule, Config } from '../config/index';
import { defaultSiteContextConfig, SiteContextConfig } from './config/config';
import { SiteContextOccModule } from './occ';
import { SiteContextStoreModule } from './store/site-context-store.module';
import { LanguageService } from './facade/language.service';
import { CurrencyService } from './facade/currency.service';

@NgModule({
  imports: [
    ConfigModule.withConfig(defaultSiteContextConfig),
    SiteContextOccModule,
    SiteContextStoreModule
  ],
  providers: [
    { provide: SiteContextConfig, useExisting: Config },
    LanguageService,
    CurrencyService
  ]
})
export class SiteContextModule {}
