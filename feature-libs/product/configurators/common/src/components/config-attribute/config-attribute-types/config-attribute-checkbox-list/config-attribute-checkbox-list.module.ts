import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { ConfigAttributeCheckBoxListComponent } from './config-attribute-checkbox-list.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, I18nModule],
  declarations: [ConfigAttributeCheckBoxListComponent],
  exports: [ConfigAttributeCheckBoxListComponent],
  entryComponents: [ConfigAttributeCheckBoxListComponent],
})
export class ConfigAttributeCheckboxListModule {}
