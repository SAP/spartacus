import { Provider } from '@angular/core';
import {
  ConfigInitializer,
  CONFIG_INITIALIZER,
} from '../../config/config-initializer/config-initializer';
import { BASE_SITE_CONTEXT_ID, SiteContextConfig } from '../../site-context';
import { OccConfigLoaderService } from './occ-config-loader.service';

/**
 * Initializes the Spartacus config asynchronously basing on the external config
 *
 * @internal
 */
export function initConfig(
  configLoader: OccConfigLoaderService,
  config: SiteContextConfig
): ConfigInitializer {
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

export const providers: Provider[] = [
  {
    provide: CONFIG_INITIALIZER,
    useFactory: initConfig,
    deps: [OccConfigLoaderService, SiteContextConfig],
    multi: true,
  },
];
