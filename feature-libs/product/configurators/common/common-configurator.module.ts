import { NgModule } from '@angular/core';
import { CommonConfiguratorComponentsModule } from './components/common-configurator-components.module';
import { CommonConfiguratorCoreModule } from './core/common-configurator-core.module';
import { CommonConfiguratorOutletComponentsModule } from './outlet-components/common-configurator-outlet-components.module';

@NgModule({
  imports: [
    CommonConfiguratorCoreModule,
    CommonConfiguratorComponentsModule,
    CommonConfiguratorOutletComponentsModule,
  ],
})
export class CommonConfiguratorModule {}
