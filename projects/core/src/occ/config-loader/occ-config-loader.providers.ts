import { APP_INITIALIZER, Provider } from '@angular/core';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { BASE_SITE_CONTEXT_ID, SiteContextConfig } from '../../site-context';
import { OccConfigLoaderService } from './occ-config-loader.service';

/**
 * Initializes the Spartacus config asynchronously basing on the external config
 *
 * @internal
 */
export function initConfig(
  externalConfigService: OccConfigLoaderService,
  configInit: ConfigInitializerService,
  config: SiteContextConfig
) {
  const result = () => {
    // when there is no static config for 'context.baseSite', load it from backend
    if (!config.context || !config.context[BASE_SITE_CONTEXT_ID]) {
      return externalConfigService.getConfigChunks().then(chunks => {
        // spike todo use CONFIG_INITIALIZER after #5181:
        configInit.add(...chunks);
      });
    } else {
      //spike todo remove after #5181 - it's just to resolve promise for now, when the base site is already provided
      configInit.add();
    }
  };
  return result;
}

export const providers: Provider[] = [
  {
    provide: APP_INITIALIZER, // spike todo use CONFIG_INITIALIZER after #5181
    useFactory: initConfig,
    deps: [OccConfigLoaderService, ConfigInitializerService, SiteContextConfig],
    multi: true,
  },
];
