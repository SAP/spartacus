import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { ConfigAttributeInputFieldComponent } from './config-attribute-input-field.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, I18nModule],
  declarations: [ConfigAttributeInputFieldComponent],
  exports: [ConfigAttributeInputFieldComponent],
  entryComponents: [ConfigAttributeInputFieldComponent],
})
export class ConfigAttributeInputFieldModule {}
