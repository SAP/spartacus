import { APP_INITIALIZER, Provider } from '@angular/core';
import { ConfigInitializerService } from '../config/config-initializer/config-initializer.service';
import { ExternalConfigService } from './external-config.service';

export const EXTERNAL_CONFIG_TRANSFER_ID = 'cx-external-config';

/**
 * Initializes the Spartacus config asynchronously basing on the external config
 */
export function initConfig(
  externalConfigService: ExternalConfigService,
  configService: ConfigInitializerService
) {
  const result = () =>
    externalConfigService.getConfigChunks().then(chunks => {
      configService.add(...chunks);
    });
  return result;
}

export const providers: Provider[] = [
  {
    provide: APP_INITIALIZER, // spike todo use CONFIG_INITIALIZER after #5181
    useFactory: initConfig,
    deps: [ExternalConfigService, ConfigInitializerService],
    multi: true,
  },
];
