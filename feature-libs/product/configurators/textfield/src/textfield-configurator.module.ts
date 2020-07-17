import { NgModule } from '@angular/core';
import { TextfieldConfiguratorComponentsModule } from './components/textfield-configurator-components.module';
import { TextfieldConfiguratorCoreModule } from './core/textfield-configurator-core.module';

@NgModule({
  imports: [
    TextfieldConfiguratorCoreModule,
    TextfieldConfiguratorComponentsModule,
  ],
})
export class TextfieldConfiguratorModule {}
