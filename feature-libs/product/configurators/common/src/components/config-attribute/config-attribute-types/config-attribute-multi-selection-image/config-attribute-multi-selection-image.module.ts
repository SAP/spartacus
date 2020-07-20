import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { ConfigAttributeMultiSelectionImageComponent } from './config-attribute-multi-selection-image.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, I18nModule],
  declarations: [ConfigAttributeMultiSelectionImageComponent],
  exports: [ConfigAttributeMultiSelectionImageComponent],
  entryComponents: [ConfigAttributeMultiSelectionImageComponent],
})
export class ConfigAttributeMultiSelectionImageModule {}
