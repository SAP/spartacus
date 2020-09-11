import { NgModule } from '@angular/core';
import { ConfiguratorTextfieldStoreModule } from './state/configurator-textfield-store.module';

/**
 * Exposes the textfield configurator core entities
 */
@NgModule({
  imports: [ConfiguratorTextfieldStoreModule],
})
export class TextfieldConfiguratorCoreModule {}
