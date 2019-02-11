import { NgModule } from '@angular/core';
import { SiteContextOccModule } from './occ/site-context-occ.module';
import { SiteContextStoreModule } from './store/site-context-store.module';
import { StateModule } from '../state/index';
import { Config, ConfigModule } from '../config/config.module';
import { defaultSiteContextConfig } from './config/default-site-context-config';
import { SiteContextConfig } from './config/site-context-config';
import { contextServiceMapProvider } from './providers/context-service-map';
import { contextServiceProviders } from './providers/context-service-providers';
import { siteContextParamsProviders } from './providers/site-context-params-providers';
import { interceptors } from './occ/index';

// @dynamic
@NgModule({
  imports: [
    ConfigModule.withConfig(defaultSiteContextConfig),
    StateModule,
    SiteContextOccModule,
    SiteContextStoreModule
  ],
  providers: [
    contextServiceMapProvider,
    ...contextServiceProviders,
    ...siteContextParamsProviders,
    { provide: SiteContextConfig, useExisting: Config }
  ]
})
export class SiteContextModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SiteContextModule,
      providers: [...interceptors]
    };
  }
}
