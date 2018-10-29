import { NgModule } from '@angular/core';

import { SiteContextModule as SiteContext } from '@spartacus/core';

import { CurrencySelectorModule } from './currency-selector/currency-selector.module';
import { LanguageSelectorModule } from './language-selector/language-selector.module';

@NgModule({
  imports: [SiteContext, CurrencySelectorModule, LanguageSelectorModule],
  exports: [CurrencySelectorModule, LanguageSelectorModule]
})
export class SiteContextModule {}
