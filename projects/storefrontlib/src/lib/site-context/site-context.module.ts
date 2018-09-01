import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';

import { CurrencySelectorModule } from './currency-selector/currency-selector.module';
import { LanguageSelectorModule } from './language-selector/language-selector.module';
import { ConfigService } from './config.service';

export function overrideSiteContextModuleConfig(configOverride: any) {
  return { ...new ConfigService(), ...configOverride };
}

export const SITE_CONTEXT_MODULE_CONFIG_OVERRIDE: InjectionToken<
  string
> = new InjectionToken<string>('SITE_CONTEXT_MODULE_CONFIG_OVERRIDE');

@NgModule({
  imports: [CurrencySelectorModule, LanguageSelectorModule],
  providers: [ConfigService],
  exports: [CurrencySelectorModule, LanguageSelectorModule]
})
export class SiteContextModule {
  static forRoot(configOverride?: any): ModuleWithProviders {
    return {
      ngModule: SiteContextModule,
      providers: [
        {
          provide: SITE_CONTEXT_MODULE_CONFIG_OVERRIDE,
          useValue: configOverride
        },
        {
          provide: ConfigService,
          useFactory: overrideSiteContextModuleConfig,
          deps: [SITE_CONTEXT_MODULE_CONFIG_OVERRIDE]
        }
      ]
    };
  }
}
