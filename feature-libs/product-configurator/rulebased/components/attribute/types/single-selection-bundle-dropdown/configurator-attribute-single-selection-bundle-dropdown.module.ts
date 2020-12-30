import { CommonModule } from '@angular/common';
import { ConfiguratorAttributeSingleSelectionBundleDropdownComponent } from './configurator-attribute-single-selection-bundle-dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfiguratorAttributeProductCardModule } from '../../product-card/configurator-attribute-product-card.module';

@NgModule({
  imports: [
    CommonModule,
    ConfiguratorAttributeProductCardModule,
    FormsModule,
    I18nModule,
    KeyboardFocusModule,
    NgSelectModule,
    ReactiveFormsModule,
  ],
  declarations: [ConfiguratorAttributeSingleSelectionBundleDropdownComponent],
  exports: [ConfiguratorAttributeSingleSelectionBundleDropdownComponent],
  entryComponents: [
    ConfiguratorAttributeSingleSelectionBundleDropdownComponent,
  ],
})
export class ConfiguratorAttributeSingleSelectionBundleDropdownModule {}
