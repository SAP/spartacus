import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfigAttributeFooterModule } from './../config-attribute/config-attribute-footer/config-attribute-footer.module';
import { ConfigAttributeHeaderModule } from './../config-attribute/config-attribute-header/config-attribute-header.module';
import { ConfigAttributeCheckboxListModule } from './../config-attribute/config-attribute-types/config-attribute-checkbox-list/config-attribute-checkbox-list.module';
import { ConfigAttributeCheckboxModule } from './../config-attribute/config-attribute-types/config-attribute-checkbox/config-attribute-checkbox.module';
import { ConfigAttributeDropDownModule } from './../config-attribute/config-attribute-types/config-attribute-drop-down/config-attribute-drop-down.module';
import { ConfigAttributeInputFieldModule } from './../config-attribute/config-attribute-types/config-attribute-input-field/config-attribute-input-field.module';
import { ConfigAttributeMultiSelectionImageModule } from './../config-attribute/config-attribute-types/config-attribute-multi-selection-image/config-attribute-multi-selection-image.module';
import { ConfigAttributeNumericInputFieldModule } from './../config-attribute/config-attribute-types/config-attribute-numeric-input-field/config-attribute-numeric-input-field.module';
import { ConfigAttributeRadioButtonModule } from './../config-attribute/config-attribute-types/config-attribute-radio-button/config-attribute-radio-button.module';
import { ConfigAttributeReadOnlyModule } from './../config-attribute/config-attribute-types/config-attribute-read-only/config-attribute-read-only.module';
import { ConfigAttributeSingleSelectionImageModule } from './../config-attribute/config-attribute-types/config-attribute-single-selection-image/config-attribute-single-selection-image.module';
import { ConfigConflictDescriptionModule } from './../config-conflict-description/config-conflict-description.module';
import { ConfigConflictSuggestionModule } from './../config-conflict-suggestion/config-conflict-suggestion.module';
import { ConfigFormComponent } from './config-form.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    NgSelectModule,
    ConfigAttributeInputFieldModule,
    ConfigAttributeHeaderModule,
    ConfigAttributeFooterModule,
    ConfigAttributeNumericInputFieldModule,
    ConfigAttributeHeaderModule,
    ConfigAttributeRadioButtonModule,
    ConfigAttributeReadOnlyModule,
    ConfigAttributeSingleSelectionImageModule,
    ConfigAttributeCheckboxModule,
    ConfigAttributeCheckboxListModule,
    ConfigAttributeDropDownModule,
    ConfigAttributeMultiSelectionImageModule,
    ConfigConflictDescriptionModule,
    ConfigConflictSuggestionModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationForm: {
          component: ConfigFormComponent,
        },
      },
    }),
  ],
  declarations: [ConfigFormComponent],
  exports: [ConfigFormComponent],
  entryComponents: [ConfigFormComponent],
})
export class ConfigFormModule {}
