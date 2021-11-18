import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeCheckBoxComponent } from './configurator-attribute-checkbox.component';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';

@NgModule({
  imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    FeaturesConfigModule,
    ConfiguratorPriceModule,
  ],
  declarations: [ConfiguratorAttributeCheckBoxComponent],
  exports: [ConfiguratorAttributeCheckBoxComponent],
})
export class ConfiguratorAttributeCheckboxModule {}
