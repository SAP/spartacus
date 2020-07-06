import { NgModule } from '@angular/core';
import { TextfieldComponentsModule } from './components/textfield-components.module';
import { TextfieldCoreModule } from './core/textfield-core.module';

@NgModule({
  imports: [TextfieldCoreModule, TextfieldComponentsModule],
})
export class TextfieldConfiguratorModule {}
