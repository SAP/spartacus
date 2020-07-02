import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextfieldConfiguratorCoreModule } from './textfield-configurator/textfield-configurator-core.module';

/**
 * Exposes the configurator core entities
 */
@NgModule({
  imports: [CommonModule, TextfieldConfiguratorCoreModule],
})
export class ConfigurationCoreModule {}
