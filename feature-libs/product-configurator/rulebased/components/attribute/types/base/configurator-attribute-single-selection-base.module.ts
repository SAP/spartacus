import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from './configurator-attribute-single-selection-base.component';

@NgModule({
  imports: [
    CommonModule,
    ConfiguratorAttributeQuantityModule,
    FormsModule,
    I18nModule,
    KeyboardFocusModule,
    ReactiveFormsModule,
  ],
  declarations: [ConfiguratorAttributeSingleSelectionBaseComponent],
  exports: [ConfiguratorAttributeSingleSelectionBaseComponent],
  entryComponents: [ConfiguratorAttributeSingleSelectionBaseComponent],
})
export class ConfiguratorAttributeSingleSelectionBaseComponentModule {}
