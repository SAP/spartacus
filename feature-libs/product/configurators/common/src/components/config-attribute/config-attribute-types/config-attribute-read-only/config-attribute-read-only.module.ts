import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { ConfigAttributeReadOnlyComponent } from './config-attribute-read-only.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, I18nModule],
  declarations: [ConfigAttributeReadOnlyComponent],
  exports: [ConfigAttributeReadOnlyComponent],
  entryComponents: [ConfigAttributeReadOnlyComponent],
})
export class ConfigAttributeReadOnlyModule {}
