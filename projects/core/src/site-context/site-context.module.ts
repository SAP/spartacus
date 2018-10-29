import { NgModule } from '@angular/core';

import { ConfigModule, Config } from '../config/index';
import { defaultSiteContextConfig, SiteContextConfig } from './config/config';
import { SiteContextOccModule } from './occ';
import { SiteContextStoreModule } from './store/site-context-store.module';

@NgModule({
  imports: [
    ConfigModule.withConfig(defaultSiteContextConfig),
    SiteContextOccModule,
    SiteContextStoreModule
  ],
  providers: [{ provide: SiteContextConfig, useExisting: Config }]
})
export class SiteContextModule {}
