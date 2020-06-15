import { NgModule } from '@angular/core';
import { TextfieldConfiguratorModule } from './textfield-configurator/textfield-configurator.module';
import { VariantConfiguratorModule } from './variant-configurator/variant-configurator.module';

@NgModule({
  imports: [VariantConfiguratorModule, TextfieldConfiguratorModule],
  declarations: [],
  exports: [],
  entryComponents: [],
})
export class ProductConfigurationModule {}
