import { APP_INITIALIZER, Provider } from '@angular/core';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { OccConfigLoaderService } from './occ-config-loader.service';

/**
 * Initializes the Spartacus config asynchronously basing on the external config
 *
 * @internal
 */
export function initConfig(
  externalConfigService: OccConfigLoaderService,
  configInit: ConfigInitializerService
) {
  const result = () =>
    externalConfigService.getConfigChunks().then(chunks => {
      // spike todo use CONFIG_INITIALIZER after #5181:
      configInit.add(...chunks);
    });
  return result;
}

export const providers: Provider[] = [
  {
    provide: APP_INITIALIZER, // spike todo use CONFIG_INITIALIZER after #5181
    useFactory: initConfig,
    deps: [OccConfigLoaderService, ConfigInitializerService],
    multi: true,
  },
];
