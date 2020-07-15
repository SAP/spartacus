import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { ConfigAttributeFooterComponent } from './config-attribute-footer/config-attribute-footer.component';
import { ConfigAttributeHeaderComponent } from './config-attribute-header/config-attribute-header.component';
import { ConfigAttributeCheckBoxListComponent } from './config-attribute-types/config-attribute-checkbox-list/config-attribute-checkbox-list.component';
import { ConfigAttributeCheckBoxComponent } from './config-attribute-types/config-attribute-checkbox/config-attribute-checkbox.component';
import { ConfigAttributeDropDownComponent } from './config-attribute-types/config-attribute-drop-down/config-attribute-drop-down.component';
import { ConfigAttributeInputFieldComponent } from './config-attribute-types/config-attribute-input-field/config-attribute-input-field.component';
import { ConfigAttributeMultiSelectionImageComponent } from './config-attribute-types/config-attribute-multi-selection-image/config-attribute-multi-selection-image.component';
import { ConfigAttributeNumericInputFieldComponent } from './config-attribute-types/config-attribute-numeric-input-field/config-attribute-numeric-input-field.component';
import { ConfigAttributeRadioButtonComponent } from './config-attribute-types/config-attribute-radio-button/config-attribute-radio-button.component';
import { ConfigAttributeReadOnlyComponent } from './config-attribute-types/config-attribute-read-only/config-attribute-read-only.component';
import { ConfigAttributeSingleSelectionImageComponent } from './config-attribute-types/config-attribute-single-selection-image/config-attribute-single-selection-image.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, I18nModule],
  declarations: [
    ConfigAttributeFooterComponent,
    ConfigAttributeHeaderComponent,
    ConfigAttributeCheckBoxComponent,
    ConfigAttributeCheckBoxListComponent,
    ConfigAttributeDropDownComponent,
    ConfigAttributeInputFieldComponent,
    ConfigAttributeMultiSelectionImageComponent,
    ConfigAttributeNumericInputFieldComponent,
    ConfigAttributeRadioButtonComponent,
    ConfigAttributeReadOnlyComponent,
    ConfigAttributeSingleSelectionImageComponent,
  ],
  exports: [
    ConfigAttributeFooterComponent,
    ConfigAttributeHeaderComponent,
    ConfigAttributeCheckBoxComponent,
    ConfigAttributeCheckBoxListComponent,
    ConfigAttributeDropDownComponent,
    ConfigAttributeInputFieldComponent,
    ConfigAttributeMultiSelectionImageComponent,
    ConfigAttributeNumericInputFieldComponent,
    ConfigAttributeRadioButtonComponent,
    ConfigAttributeReadOnlyComponent,
    ConfigAttributeSingleSelectionImageComponent,
  ],
  entryComponents: [
    ConfigAttributeFooterComponent,
    ConfigAttributeHeaderComponent,
    ConfigAttributeCheckBoxComponent,
    ConfigAttributeCheckBoxListComponent,
    ConfigAttributeDropDownComponent,
    ConfigAttributeInputFieldComponent,
    ConfigAttributeMultiSelectionImageComponent,
    ConfigAttributeNumericInputFieldComponent,
    ConfigAttributeRadioButtonComponent,
    ConfigAttributeReadOnlyComponent,
    ConfigAttributeSingleSelectionImageComponent,
  ],
})
export class ConfigAttributeModule {}
