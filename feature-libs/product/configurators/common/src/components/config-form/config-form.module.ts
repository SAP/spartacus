import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { ConfigFormComponent } from './config-form.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, I18nModule],
  declarations: [ConfigFormComponent],
  exports: [ConfigFormComponent],
  entryComponents: [ConfigFormComponent],
})
export class ConfigFormModule {}
