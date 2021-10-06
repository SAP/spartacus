import { NgModule } from '@angular/core';
import { ConfiguratorTextfieldConnector } from './connectors/configurator-textfield.connector';
import { ConfiguratorTextfieldStoreModule } from './state/configurator-textfield-store.module';

/**
 * Exposes the textfield configurator core entities.
 * Explicit providing of connector because otherwise lazy loading does not work
 */
@NgModule({
  imports: [ConfiguratorTextfieldStoreModule],
  providers: [ConfiguratorTextfieldConnector],
})
export class TextfieldConfiguratorCoreModule {}
