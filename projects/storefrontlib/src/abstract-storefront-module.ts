import { ConfigService } from './config.service';
import { DefaultConfigService } from './default-config.service';

export abstract class AbstractStorefrontModule {
  static configServiceFactory = (
    overrideConfigService: any,
    defaultConfigService: DefaultConfigService
  ) => {
    return { ...defaultConfigService, ...overrideConfigService };
  }; // tslint:disable-line
  // Prettier adds the semicolon and tslint complains that the semicolon should not be used for functions.

  static getOverriddenConfigProvider(configOverride: any): any {
    const configServiceProvider = {
      provide: ConfigService,
      useFactory: this.configServiceFactory,
      deps: [configOverride, DefaultConfigService]
    };
    return configServiceProvider;
  }
}
