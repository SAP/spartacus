import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorAttributeFooterModule } from '../attribute/footer/configurator-attribute-footer.module';
import { ConfiguratorAttributeHeaderModule } from '../attribute/header/configurator-attribute-header.module';
import { ConfiguratorAttributeCheckboxListModule } from '../attribute/types/checkbox-list/configurator-attribute-checkbox-list.module';
import { ConfiguratorAttributeCheckboxModule } from '../attribute/types/checkbox/configurator-attribute-checkbox.module';
import { ConfiguratorAttributeDropDownModule } from '../attribute/types/drop-down/configurator-attribute-drop-down.module';
import { ConfiguratorAttributeInputFieldModule } from '../attribute/types/input-field/configurator-attribute-input-field.module';
import { ConfiguratorAttributeMultiSelectionBundleModule } from '../attribute/types/multi-selection-bundle/configurator-attribute-multi-selection-bundle.module';
import { ConfiguratorAttributeMultiSelectionImageModule } from '../attribute/types/multi-selection-image/configurator-attribute-multi-selection-image.module';
import { ConfiguratorAttributeNumericInputFieldModule } from '../attribute/types/numeric-input-field/configurator-attribute-numeric-input-field.module';
import { ConfiguratorAttributeRadioButtonModule } from '../attribute/types/radio-button/configurator-attribute-radio-button.module';
import { ConfiguratorAttributeReadOnlyModule } from '../attribute/types/read-only/configurator-attribute-read-only.module';
import { ConfiguratorAttributeSingleSelectionBundleDropdownModule } from '../attribute/types/single-selection-bundle-dropdown/configurator-attribute-single-selection-bundle-dropdown.module';
import { ConfiguratorAttributeSingleSelectionBundleModule } from '../attribute/types/single-selection-bundle/configurator-attribute-single-selection-bundle.module';
import { ConfiguratorAttributeSingleSelectionImageModule } from '../attribute/types/single-selection-image/configurator-attribute-single-selection-image.module';
import { ConfiguratorConflictDescriptionModule } from '../conflict-description/configurator-conflict-description.module';
import { ConfiguratorConflictSuggestionModule } from '../conflict-suggestion/configurator-conflict-suggestion.module';
import { ConfiguratorFormComponent } from './configurator-form.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    NgSelectModule,
    ConfiguratorAttributeInputFieldModule,
    ConfiguratorAttributeFooterModule,
    ConfiguratorAttributeNumericInputFieldModule,
    ConfiguratorAttributeHeaderModule,
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
    ConfiguratorConflictDescriptionModule,
    ConfiguratorConflictSuggestionModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorForm: {
          component: ConfiguratorFormComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorFormComponent],
  exports: [ConfiguratorFormComponent],
})
export class ConfiguratorFormModule {}
