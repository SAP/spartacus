import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeCheckBoxListComponent } from './configurator-attribute-checkbox-list.component';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';

@NgModule({
  imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    ConfiguratorAttributeQuantityModule,
    ConfiguratorPriceModule,
  ],
  declarations: [ConfiguratorAttributeCheckBoxListComponent],
  exports: [ConfiguratorAttributeCheckBoxListComponent],
})
export class ConfiguratorAttributeCheckboxListModule {}
