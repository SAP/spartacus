import { NgModule } from '@angular/core';
import { CommonConfiguratorComponentsModule } from './components/common-configurator-components.module';
import { CommonConfiguratorOccModule } from './occ/common-configurator-occ.module';

@NgModule({
  imports: [CommonConfiguratorOccModule, CommonConfiguratorComponentsModule],
})
export class CommonConfiguratorModule {}
