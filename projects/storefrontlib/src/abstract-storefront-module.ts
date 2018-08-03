import { ConfigService } from './config.service';
import { DefaultConfigService } from './default-config.service';

export class AbstractStorefrontModule {
  static getOverriddenConfigProvider(configOverride: any): any {
    const configServiceFactory = (
      overrideConfigService: any,
      defaultConfigService: DefaultConfigService
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
