import { NgModule } from '@angular/core';
import { CpqConfiguratorComponentsModule } from './components/cpq-configurator-components.module';
import { CpqConfiguratorCoreModule } from './core/cpq-configurator-core.module';

@NgModule({
  imports: [CpqConfiguratorCoreModule, CpqConfiguratorComponentsModule],
})
export class CpqConfiguratorModule {}
