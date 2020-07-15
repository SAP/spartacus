import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { ConfigAttributeModule } from './../config-attribute/config-attribute.module';
import { ConfigFormComponent } from './config-form.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    ConfigAttributeModule,
  ],
  declarations: [ConfigFormComponent],
  exports: [ConfigFormComponent],
  entryComponents: [ConfigFormComponent],
})
export class ConfigFormModule {}
