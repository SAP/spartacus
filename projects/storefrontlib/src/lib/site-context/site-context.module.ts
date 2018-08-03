import { NgModule } from '@angular/core';

import { CurrencySelectorModule } from './currency-selector/currency-selector.module';
import { LanguageSelectorModule } from './language-selector/language-selector.module';
import { ConfigService } from './config.service';
import { DefaultConfigService } from '../../default-config.service';

@NgModule({
  imports: [CurrencySelectorModule, LanguageSelectorModule],
  providers: [{ provide: ConfigService, useClass: DefaultConfigService }],
  exports: [CurrencySelectorModule, LanguageSelectorModule]
})
export class SiteContextModule {
  static forRoot(config: any): any {
    const configServiceFactory = (
      appConfigService: ConfigService,
      defaultConfigService: ConfigService
    ) => {
      console.log(
        'SiteContextModule configServiceFactory provided appConfigService',
        appConfigService
      );
      console.log(
        'SiteContextModule configServiceFactory provided defaultConfigService',
        defaultConfigService
      );
      return { ...defaultConfigService, ...appConfigService };
    };
    const configServiceProvider = {
      provide: ConfigService,
      useFactory: configServiceFactory,
      deps: [config, DefaultConfigService]
    };
    return {
      ngModule: SiteContextModule,
      providers: [configServiceProvider]
    };
  }
}
