import { NgModule } from '@angular/core';

import { ConfigModule, Config } from '../config/index';
import { defaultSiteContextConfig, SiteContextConfig } from './config/config';
import { SiteContextOccModule } from './occ';
import { SiteContextStoreModule } from './store/site-context-store.module';
import { LanguageService } from './language.service';

@NgModule({
  imports: [
    ConfigModule.withConfig(defaultSiteContextConfig),
    SiteContextOccModule,
    SiteContextStoreModule
  ],
  providers: [
    { provide: SiteContextConfig, useExisting: Config },
    LanguageService
  ]
})
export class SiteContextModule {}
