import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { ItemCounterModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeCheckBoxListComponent } from './configurator-attribute-checkbox-list.component';
import { ConfiguratorAttributeCheckBoxQuantityComponent } from './checkbox-quantity/configurator-attribute-checkbox-quantity.component';

@NgModule({
  imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    ItemCounterModule,
  ],
  declarations: [
    ConfiguratorAttributeCheckBoxListComponent,
    ConfiguratorAttributeCheckBoxQuantityComponent,
  ],
  exports: [ConfiguratorAttributeCheckBoxListComponent],
  entryComponents: [ConfiguratorAttributeCheckBoxListComponent],
})
export class ConfiguratorAttributeCheckboxListModule {}
