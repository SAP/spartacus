import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfiguratorTextfieldOccModule } from './occ/configurator-textfield-occ.module';
import { ConfiguratorTextfieldStoreModule } from './state/configurator-textfield-store.module';

/**
 * Exposes the configurator core entities
 */
@NgModule({
  imports: [
    CommonModule,
    ConfiguratorTextfieldStoreModule,
    ConfiguratorTextfieldOccModule,
  ],
})
export class TextfieldConfiguratorCoreModule {}
