import { NgModule } from '@angular/core';

import { CurrencySelectorModule } from './currency-selector/currency-selector.module';
import { LanguageSelectorModule } from './language-selector/language-selector.module';
import { Config, ConfigModule } from '../config/config.module';
import { defaultSiteContextModuleConfig, SiteContextModuleConfig } from './site-context-module-config';

@NgModule({
  imports: [CurrencySelectorModule, LanguageSelectorModule, ConfigModule.withConfig(defaultSiteContextModuleConfig)],
  exports: [CurrencySelectorModule, LanguageSelectorModule],
  providers: [
    { provide: SiteContextModuleConfig, useExisting: Config }
  ]
})
export class SiteContextModule {}
