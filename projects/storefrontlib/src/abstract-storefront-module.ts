import { ConfigService } from './config.service';
import { DefaultConfigService } from './default-config.service';

export abstract class AbstractStorefrontModule {
  static configServiceFactory(
    overrideConfigService: any,
    defaultConfigService: DefaultConfigService
  ) {
    return { ...defaultConfigService, ...overrideConfigService };
  }

  static getConfigOverrideProvider(configOverride: any): any {
    const configServiceProvider = {
      provide: ConfigService,
      useFactory: this.configServiceFactory,
      deps: [configOverride, DefaultConfigService]
    };
    return configServiceProvider;
  }
}
