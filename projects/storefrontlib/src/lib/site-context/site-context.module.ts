import { NgModule } from '@angular/core';

import { CurrencySelectorModule } from './currency-selector/currency-selector.module';
import { LanguageSelectorModule } from './language-selector/language-selector.module';
import { ConfigService } from '../../config.service';
import { DefaultConfigService } from '../../default-config.service';
import { ConfigurableModule } from '../../configurable-module';

@NgModule({
  imports: [CurrencySelectorModule, LanguageSelectorModule],
  providers: [{ provide: ConfigService, useClass: DefaultConfigService }],
  exports: [CurrencySelectorModule, LanguageSelectorModule]
})
export class SiteContextModule extends ConfigurableModule {
  static forRoot(config: any): any {
    const overriddenConfigProvider = this.getOverriddenConfigProvider(config);
    return {
      ngModule: SiteContextModule,
      providers: [overriddenConfigProvider]
    };
  }
}
