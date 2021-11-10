import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfiguratorAttributeCheckboxListModule } from './checkbox-list/configurator-attribute-checkbox-list.module';
import { ConfiguratorAttributeCheckboxModule } from './checkbox/configurator-attribute-checkbox.module';
import { ConfiguratorAttributeTypeComponent } from './configurator-attribute-type.component';
import { ConfiguratorAttributeDropDownModule } from './drop-down/configurator-attribute-drop-down.module';
import { ConfiguratorAttributeInputFieldModule } from './input-field/configurator-attribute-input-field.module';
import { ConfiguratorAttributeMultiSelectionBundleModule } from './multi-selection-bundle/configurator-attribute-multi-selection-bundle.module';
import { ConfiguratorAttributeMultiSelectionImageModule } from './multi-selection-image/configurator-attribute-multi-selection-image.module';
import { ConfiguratorAttributeNumericInputFieldModule } from './numeric-input-field/configurator-attribute-numeric-input-field.module';
import { ConfiguratorAttributeRadioButtonModule } from './radio-button/configurator-attribute-radio-button.module';
import { ConfiguratorAttributeReadOnlyModule } from './read-only/configurator-attribute-read-only.module';
import { ConfiguratorAttributeSingleSelectionBundleDropdownModule } from './single-selection-bundle-dropdown/configurator-attribute-single-selection-bundle-dropdown.module';
import { ConfiguratorAttributeSingleSelectionBundleModule } from './single-selection-bundle/configurator-attribute-single-selection-bundle.module';
import { ConfiguratorAttributeSingleSelectionImageModule } from './single-selection-image/configurator-attribute-single-selection-image.module';

@NgModule({
  imports: [
    CommonModule,

    ConfiguratorAttributeInputFieldModule,
    ConfiguratorAttributeNumericInputFieldModule,
    ConfiguratorAttributeRadioButtonModule,
    ConfiguratorAttributeSingleSelectionBundleModule,
    ConfiguratorAttributeMultiSelectionBundleModule,
    ConfiguratorAttributeReadOnlyModule,
    ConfiguratorAttributeSingleSelectionImageModule,
    ConfiguratorAttributeSingleSelectionBundleDropdownModule,
    ConfiguratorAttributeCheckboxModule,
    ConfiguratorAttributeCheckboxListModule,
    ConfiguratorAttributeDropDownModule,
    ConfiguratorAttributeMultiSelectionImageModule,
  ],

  declarations: [ConfiguratorAttributeTypeComponent],
  exports: [ConfiguratorAttributeTypeComponent],
})
export class ConfiguratorAttributeTypeModule {}
