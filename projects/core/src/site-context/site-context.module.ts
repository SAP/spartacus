import { NgModule } from '@angular/core';

import { ConfigModule, Config } from '../config/config.module';
import { defaultSiteContextConfig, SiteContextConfig } from './config/config';
import { SiteContextOccModule } from './occ/site-context-occ.module';
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
