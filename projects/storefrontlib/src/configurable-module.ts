import { ConfigService } from './lib/site-context/config.service';
import { DefaultConfigService } from './default-config.service';

export class ConfigurableModule {
  static getOverriddenConfigProvider(configOverride: any): any {
    const configServiceFactory = (
      overrideConfigService: ConfigService,
      defaultConfigService: ConfigService
    ) => {
      console.log(
        'SiteContextModule configServiceFactory provided appConfigService',
        overrideConfigService
      );
      console.log(
        'SiteContextModule configServiceFactory provided defaultConfigService',
        defaultConfigService
      );
      return { ...defaultConfigService, ...overrideConfigService };
    };
    const configServiceProvider = {
      provide: ConfigService,
      useFactory: configServiceFactory,
      deps: [configOverride, DefaultConfigService]
    };
    return configServiceProvider;
  }
}
