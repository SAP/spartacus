import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeRadioButtonComponent } from './configurator-attribute-radio-button.component';

@NgModule({
  imports: [
    CommonModule,
    ConfiguratorAttributeQuantityModule,
    FormsModule,
    I18nModule,
    KeyboardFocusModule,
    ReactiveFormsModule,
  ],
  declarations: [ConfiguratorAttributeRadioButtonComponent],
  exports: [ConfiguratorAttributeRadioButtonComponent],
})
export class ConfiguratorAttributeRadioButtonModule {}
