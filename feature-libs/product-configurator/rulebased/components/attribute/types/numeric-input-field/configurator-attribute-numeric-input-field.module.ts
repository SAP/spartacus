import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeNumericInputFieldComponent } from './configurator-attribute-numeric-input-field.component';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';

@NgModule({
  imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    ConfiguratorPriceModule,
  ],
  declarations: [ConfiguratorAttributeNumericInputFieldComponent],
  exports: [ConfiguratorAttributeNumericInputFieldComponent],
  entryComponents: [ConfiguratorAttributeNumericInputFieldComponent],
})
export class ConfiguratorAttributeNumericInputFieldModule {}
