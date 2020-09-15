import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { StorefrontConfig } from '@spartacus/storefront';
import { CommonConfiguratorComponentsModule } from './components/common-configurator-components.module';
import { ConfigurationMessageLoaderModule } from './components/message/configurator-message-loader.module';
import { CommonConfiguratorCoreModule } from './core/common-configurator-core.module';

@NgModule({
  imports: [
    CommonConfiguratorCoreModule,
    CommonConfiguratorComponentsModule,
    ConfigurationMessageLoaderModule,
  ],
})
export class CommonConfiguratorModule {
  static withConfig(
    config?: StorefrontConfig
  ): ModuleWithProviders<CommonConfiguratorModule> {
    return {
      ngModule: CommonConfiguratorModule,
      providers: [provideConfig(config)],
    };
  }
}
