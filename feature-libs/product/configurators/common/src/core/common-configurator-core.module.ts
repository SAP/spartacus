import { NgModule } from '@angular/core';
import { CommonConfiguratorFacadeModule } from './facade/common-configurator-facade.module';

@NgModule({
  imports: [CommonConfiguratorFacadeModule.forRoot()],
})
export class CommonConfiguratorCoreModule {}
