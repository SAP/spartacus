import { NgModule } from '@angular/core';
import { InteractiveConfigurationModule } from './variant-configurator/interactive-configuration.module';
import { OverviewModule } from './variant-configurator/overview.module';

@NgModule({
  imports: [InteractiveConfigurationModule, OverviewModule],
  declarations: [],
  exports: [],
  entryComponents: [],
})
export class ProductConfigurationModule {}
