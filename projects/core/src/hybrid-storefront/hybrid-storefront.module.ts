import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '../config/config-providers';
import { defaultHybridStorefrontEndpointConfig } from './config/index';
import { hybridInitializerProviders } from './providers/hybrid-initializer-providers';

@NgModule({
  providers: [...hybridInitializerProviders],
})
export class HybridStorefrontModule {
  static forRoot(): ModuleWithProviders<HybridStorefrontModule> {
    return {
      ngModule: HybridStorefrontModule,
      providers: [provideDefaultConfig(defaultHybridStorefrontEndpointConfig)],
    };
  }
}
