import { NgModule } from '@angular/core';
import { CommonConfiguratorComponentsModule } from './components/common-configurator-components.module';
import { CommonConfiguratorCoreModule } from './core/common-configurator-core.module';

@NgModule({
  imports: [CommonConfiguratorCoreModule, CommonConfiguratorComponentsModule],
})
export class CommonConfiguratorModule {}
