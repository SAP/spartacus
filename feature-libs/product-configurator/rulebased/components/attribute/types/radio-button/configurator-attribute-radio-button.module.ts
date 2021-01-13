import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeRadioButtonComponent } from './configurator-attribute-radio-button.component';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';

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
  entryComponents: [ConfiguratorAttributeRadioButtonComponent],
})
export class ConfiguratorAttributeRadioButtonModule {}
