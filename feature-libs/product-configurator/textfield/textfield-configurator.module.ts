import { NgModule } from '@angular/core';
import { TextfieldConfiguratorComponentsModule } from './components/textfield-configurator-components.module';
import { TextfieldConfiguratorCoreModule } from './core/textfield-configurator-core.module';
import { TextfieldConfiguratorOccModule } from './occ/textfield-configurator-occ.module';

/**
 * Exposes the textfield configurator, a small configurator that only provides 3 attributes at product level without any dependencies between them,
 * and in the first place serves as a template for other configurator implementations.
 */
@NgModule({
  imports: [
    TextfieldConfiguratorCoreModule,
    TextfieldConfiguratorComponentsModule,
    TextfieldConfiguratorOccModule,
  ],
})
export class TextfieldConfiguratorModule {}
