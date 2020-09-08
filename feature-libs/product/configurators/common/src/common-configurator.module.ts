import { NgModule } from '@angular/core';
import { CommonConfiguratorComponentsModule } from './components/common-configurator-components.module';
import { ConfigurationMessageLoaderModule } from './components/config-message/config-message-loader.module';
import { CommonConfiguratorCoreModule } from './core/common-configurator-core.module';

@NgModule({
  imports: [
    CommonConfiguratorCoreModule,
    CommonConfiguratorComponentsModule,
    ConfigurationMessageLoaderModule,
  ],
})
export class CommonConfiguratorModule {}
