import { NgModule } from '@angular/core';

import { ConfigModule, Config } from '../config/index';
import {
  defaultSiteContextModuleConfig,
  SiteContextModuleConfig
} from './site-context-config/site-context-config';

@NgModule({
  imports: [ConfigModule.withConfig(defaultSiteContextModuleConfig)],
  providers: [{ provide: SiteContextModuleConfig, useExisting: Config }]
})
export class SiteContextModule {}
