import { NgModule } from '@angular/core';

import { CurrencySelectorModule } from './currency-selector/currency-selector.module';
import { LanguageSelectorModule } from './language-selector/language-selector.module';
import { ConfigModule } from '../config/config.module';
import { defaultSiteContextModuleConfig } from './site-context-module-config';

@NgModule({
  imports: [CurrencySelectorModule, LanguageSelectorModule, ConfigModule.withConfig(defaultSiteContextModuleConfig)],
  exports: [CurrencySelectorModule, LanguageSelectorModule]
})
export class SiteContextModule {}
