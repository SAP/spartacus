import { NgModule } from '@angular/core';

import { ConfigModule, Config } from '../config/index';
import { defaultSiteContextConfig, SiteContextConfig } from './config/config';

@NgModule({
  imports: [ConfigModule.withConfig(defaultSiteContextConfig)],
  providers: [{ provide: SiteContextConfig, useExisting: Config }]
})
export class SiteContextModule {}
