import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfigInitializer } from '../../config/config-initializer/config-initializer';
import { SiteContextConfig } from '../../site-context/config/site-context-config';
import { BASE_SITE_CONTEXT_ID } from '../../site-context/providers/context-ids';
import { OccConfigLoaderService } from './occ-config-loader.service';

/**
 * Initializes the Spartacus config asynchronously basing on the external config
 */
export function initConfig(
  configLoader: OccConfigLoaderService,
  config: SiteContextConfig
): ConfigInitializer | null {
  /**
   * Load config for `context` from backend only when there is no static config for `context.baseSite`
   */
  if (!config.context || !config.context[BASE_SITE_CONTEXT_ID]) {
    return {
      scopes: ['context', 'i18n.fallbackLang'],
      configFactory: () => configLoader.loadConfig(),
    };
  }
  return null;
}

/**
 * Re-provides the external config chunk given before Angular bootstrap
 */
@NgModule()
export class OccConfigLoaderModule {
  static forRoot(): ModuleWithProviders<OccConfigLoaderModule> {
    return {
      ngModule: OccConfigLoaderModule,
      providers: [
        /*{
          provide: CONFIG_INITIALIZER,
          useFactory: initConfig,
          deps: [OccConfigLoaderService, SiteContextConfig],
          multi: true,
        },*/
      ],
    };
  }
}
