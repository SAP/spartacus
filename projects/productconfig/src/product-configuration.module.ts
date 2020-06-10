import { NgModule } from '@angular/core';
import { TextfieldConfiguratorModule } from './textfield-configurator/textfield-configurator.module';
import { InteractiveConfigurationModule } from './variant-configurator/interactive-configuration.module';
import { OverviewModule } from './variant-configurator/overview.module';

@NgModule({
  imports: [
    InteractiveConfigurationModule,
    OverviewModule,
    TextfieldConfiguratorModule,
  ],
  declarations: [],
  exports: [],
  entryComponents: [],
})
export class ProductConfigurationModule {}
