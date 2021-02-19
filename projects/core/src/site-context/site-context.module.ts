import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '../config/config-providers';
import { provideConfigValidator } from '../config/config-validator/config-validator';
import { StateModule } from '../state/index';
import { baseSiteConfigValidator } from './config/base-site-config-validator';
import { defaultSiteContextConfigFactory } from './config/default-site-context-config';
import { SiteContextEventModule } from './events/site-context-event.module';
import { SiteContextPersistenceService } from './facade/site-context-persistence.service';
import { contextServiceMapProvider } from './providers/context-service-map';
import { contextServiceProviders } from './providers/context-service-providers';
import { siteContextParamsProviders } from './providers/site-context-params-providers';
import { SiteContextStoreModule } from './store/site-context-store.module';

export function siteContextStatePersistenceFactory(
  siteContextPersistenceService: SiteContextPersistenceService
) {
  const result = () => siteContextPersistenceService.initSync();
  return result;
}

// @dynamic
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
          provide: APP_INITIALIZER,
          useFactory: siteContextStatePersistenceFactory,
          deps: [SiteContextPersistenceService],
          multi: true,
        },
      ],
    };
  }
}
