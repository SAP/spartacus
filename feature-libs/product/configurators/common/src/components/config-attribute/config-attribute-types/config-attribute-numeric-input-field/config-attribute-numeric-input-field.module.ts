import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfigAttributeNumericInputFieldComponent } from './config-attribute-numeric-input-field.component';

@NgModule({
  imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
  ],
  declarations: [ConfigAttributeNumericInputFieldComponent],
  exports: [ConfigAttributeNumericInputFieldComponent],
  entryComponents: [ConfigAttributeNumericInputFieldComponent],
})
export class ConfigAttributeNumericInputFieldModule {}
