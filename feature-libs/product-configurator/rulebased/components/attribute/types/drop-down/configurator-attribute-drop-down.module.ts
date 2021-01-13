import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import { ItemCounterModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeDropDownComponent } from './configurator-attribute-drop-down.component';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';

@NgModule({
  imports: [
    CommonModule,
    ConfiguratorAttributeQuantityModule,
    FormsModule,
    I18nModule,
    ItemCounterModule,
    KeyboardFocusModule,
    NgSelectModule,
    ReactiveFormsModule,
  ],
  declarations: [ConfiguratorAttributeDropDownComponent],
  exports: [ConfiguratorAttributeDropDownComponent],
  entryComponents: [ConfiguratorAttributeDropDownComponent],
})
export class ConfiguratorAttributeDropDownModule {}
