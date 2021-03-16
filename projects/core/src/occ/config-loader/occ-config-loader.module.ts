import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  ConfigInitializer,
  CONFIG_INITIALIZER,
} from '../../config/config-initializer/config-initializer';
import { FeatureConfigService } from '../../features-config/services/feature-config.service';
import { SiteContextConfig } from '../../site-context/config/site-context-config';
import { BASE_SITE_CONTEXT_ID } from '../../site-context/providers/context-ids';
import { OccConfigLoaderService } from './occ-config-loader.service';

/**
 * Initializes the Spartacus config asynchronously basing on the external config
 *
 * @deprecated since 3.2 - use `initSiteContextConfig()` from `SiteContextModule` instead.
 * Not a public API though.
 */
// TODO(#11515): drop it 4.0
export function initConfig(
  configLoader: OccConfigLoaderService,
  config: SiteContextConfig,
  featureConfigService?: FeatureConfigService
): ConfigInitializer | null {
  if (featureConfigService && featureConfigService.isLevel('3.2')) {
    return null;
  }
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
 *
 * @deprecated since 3.2, use `SiteContextConfigLoaderModule` instead
 */
// TODO(#11515): drop it 4.0
@NgModule()
export class OccConfigLoaderModule {
  static forRoot(): ModuleWithProviders<OccConfigLoaderModule> {
    return {
      ngModule: OccConfigLoaderModule,
      providers: [
        {
          provide: CONFIG_INITIALIZER,
          useFactory: initConfig,
          deps: [
            OccConfigLoaderService,
            SiteContextConfig,
            FeatureConfigService,
          ],
          multi: true,
        },
      ],
    };
  }
}
