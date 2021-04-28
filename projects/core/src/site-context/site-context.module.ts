import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import {
  ConfigInitializer,
  CONFIG_INITIALIZER,
} from '../config/config-initializer/config-initializer';
import { ConfigInitializerService } from '../config/config-initializer/config-initializer.service';
import { provideDefaultConfigFactory } from '../config/config-providers';
import { provideConfigValidator } from '../config/config-validator/config-validator';
import { FeatureConfigService } from '../features-config/services/feature-config.service';
import { StateModule } from '../state/index';
import { baseSiteConfigValidator } from './config/base-site-config-validator';
import { SiteContextConfigInitializer } from './config/config-loader/site-context-config-initializer';
import { defaultSiteContextConfigFactory } from './config/default-site-context-config';
import { SiteContextConfig } from './config/site-context-config';
import { SiteContextEventModule } from './events/site-context-event.module';
import { CurrencyStatePersistenceService } from './facade/currency-state-persistence.service';
import { LanguageStatePersistenceService } from './facade/language-state-persistence.service';
import { BASE_SITE_CONTEXT_ID } from './providers/context-ids';
import { contextServiceMapProvider } from './providers/context-service-map';
import { contextServiceProviders } from './providers/context-service-providers';
import { siteContextParamsProviders } from './providers/site-context-params-providers';
import { SiteContextStoreModule } from './store/site-context-store.module';

/**
 * Initializes the site context config
 */
export function initSiteContextConfig(
  configInitializer: SiteContextConfigInitializer,
  config: SiteContextConfig,
  featureConfigService: FeatureConfigService
): ConfigInitializer | null {
  // TODO(#11515): remove it in 4.0
  if (!featureConfigService.isLevel('3.2')) {
    return null;
  }
  /**
   * Load config for `context` from backend only when there is no static config for `context.baseSite`
   */
  if (!config.context || !config.context[BASE_SITE_CONTEXT_ID]) {
    return configInitializer;
  }
  return null;
}
export function currencyStatePersistenceFactory(
  currencyPersistenceService: CurrencyStatePersistenceService,
  configInit: ConfigInitializerService
) {
  const result = () =>
    configInit.getStableConfig('context').then(() => {
      console.log('Before init CONTEXT');
      currencyPersistenceService.initSync();
    });
  return result;
}
export function languageStatePersistenceFactory(
  languagePersistenceService: LanguageStatePersistenceService,
  configInit: ConfigInitializerService
) {
  const result = () =>
    configInit
      .getStableConfig('context')
      .then(() => languagePersistenceService.initSync());
  return result;
}

@NgModule({
  imports: [StateModule, SiteContextStoreModule, SiteContextEventModule],
})
export class SiteContextModule {
  static forRoot(): ModuleWithProviders<SiteContextModule> {
    return {
      ngModule: SiteContextModule,
      providers: [
        provideDefaultConfigFactory(defaultSiteContextConfigFactory),
        contextServiceMapProvider,
        ...contextServiceProviders,
        ...siteContextParamsProviders,
        provideConfigValidator(baseSiteConfigValidator),
        {
          provide: CONFIG_INITIALIZER,
          useFactory: initSiteContextConfig,
          deps: [
            SiteContextConfigInitializer,
            SiteContextConfig,
            FeatureConfigService,
          ],
          multi: true,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: languageStatePersistenceFactory,
          deps: [LanguageStatePersistenceService, ConfigInitializerService],
          multi: true,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: currencyStatePersistenceFactory,
          deps: [CurrencyStatePersistenceService, ConfigInitializerService],
          multi: true,
        },
      ],
    };
  }
}
