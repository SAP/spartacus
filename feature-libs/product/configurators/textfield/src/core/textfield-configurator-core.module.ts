import { NgModule } from '@angular/core';
import { ConfiguratorTextfieldOccModule } from './occ/configurator-textfield-occ.module';
import { ConfiguratorTextfieldStoreModule } from './state/configurator-textfield-store.module';

/**
 * Exposes the textfield configurator core entities
 */
@NgModule({
  imports: [ConfiguratorTextfieldStoreModule, ConfiguratorTextfieldOccModule],
})
export class TextfieldConfiguratorCoreModule {}
