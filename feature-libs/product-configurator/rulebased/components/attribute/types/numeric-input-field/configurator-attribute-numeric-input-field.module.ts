import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeNumericInputFieldComponent } from './configurator-attribute-numeric-input-field.component';

@NgModule({
  imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    IconModule,
  ],
  declarations: [ConfiguratorAttributeNumericInputFieldComponent],
  exports: [ConfiguratorAttributeNumericInputFieldComponent],
})
export class ConfiguratorAttributeNumericInputFieldModule {}
