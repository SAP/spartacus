import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { ConfigAttributeSingleSelectionImageComponent } from './config-attribute-single-selection-image.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, I18nModule],
  declarations: [ConfigAttributeSingleSelectionImageComponent],
  exports: [ConfigAttributeSingleSelectionImageComponent],
  entryComponents: [ConfigAttributeSingleSelectionImageComponent],
})
export class ConfigAttributeSingleSelectionImageModule {}
