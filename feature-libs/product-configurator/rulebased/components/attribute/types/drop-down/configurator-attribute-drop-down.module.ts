import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import { ItemCounterModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeDropDownComponent } from './configurator-attribute-drop-down.component';

@NgModule({
  imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    NgSelectModule,
    ItemCounterModule,
  ],
  declarations: [ConfiguratorAttributeDropDownComponent],
  exports: [ConfiguratorAttributeDropDownComponent],
  entryComponents: [ConfiguratorAttributeDropDownComponent],
})
export class ConfiguratorAttributeDropDownModule {}
