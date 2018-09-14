import { NgModule } from '@angular/core';

import { CurrencySelectorModule } from './currency-selector/currency-selector.module';
import { LanguageSelectorModule } from './language-selector/language-selector.module';
import { ConfigModule } from '../config/config.module';
import { defaultConfig } from './site-context-module-config';

@NgModule({
  imports: [CurrencySelectorModule, LanguageSelectorModule, ConfigModule.withConfig(defaultConfig)],
  exports: [CurrencySelectorModule, LanguageSelectorModule]
})
export class SiteContextModule {}
