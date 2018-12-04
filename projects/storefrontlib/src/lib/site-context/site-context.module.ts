import { NgModule } from '@angular/core';

import { CurrencySelectorModule } from './currency-selector/currency-selector.module';
import { LanguageSelectorModule } from './language-selector/language-selector.module';

@NgModule({
  imports: [CurrencySelectorModule, LanguageSelectorModule]
})
export class SiteContextModule {}
