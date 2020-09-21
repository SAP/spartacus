import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfigValidator } from '../config/config-validator/config-validator';
import { StateModule } from '../state/index';
import { baseSiteConfigValidator } from './config/base-site-config-validator';
import { defaultSiteContextConfigFactory } from './config/default-site-context-config';
import { contextServiceMapProvider } from './providers/context-service-map';
import { contextServiceProviders } from './providers/context-service-providers';
import { siteContextParamsProviders } from './providers/site-context-params-providers';
import { SiteContextStoreModule } from './store/site-context-store.module';
import { provideDefaultConfigFactory } from '../config/config-providers';

// @dynamic
@NgModule({
  imports: [StateModule, SiteContextStoreModule],
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
      ],
    };
  }
}
