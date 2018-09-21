import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';

import { CurrencySelectorModule } from './currency-selector/currency-selector.module';
import { LanguageSelectorModule } from './language-selector/language-selector.module';
import { SiteContextModuleConfig } from './site-context-module-config';

export function overrideSiteContextModuleConfig(configOverride: any) {
  return { ...new SiteContextModuleConfig(), ...configOverride };
}

export const SITE_CONTEXT_MODULE_CONFIG_OVERRIDE: InjectionToken<
  string
> = new InjectionToken<string>('SITE_CONTEXT_MODULE_CONFIG_OVERRIDE');

@NgModule({
  imports: [CurrencySelectorModule, LanguageSelectorModule],
  providers: [SiteContextModuleConfig],
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
          provide: SiteContextModuleConfig,
          useFactory: overrideSiteContextModuleConfig,
          deps: ['APP_CONFIG']
        }
      ]
    };
  }
}
