import { CommonModule } from '@angular/common';
import { ConfiguratorAttributeMultiSelectionBundleComponent } from './configurator-attribute-multi-selection-bundle.component';
import { ConfiguratorAttributeProductCardModule } from '../../product-card/configurator-attribute-product-card.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ItemCounterModule, KeyboardFocusModule } from '@spartacus/storefront';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ConfiguratorAttributeMultiSelectionBundleComponent],
  entryComponents: [ConfiguratorAttributeMultiSelectionBundleComponent],
  exports: [ConfiguratorAttributeMultiSelectionBundleComponent],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    ConfiguratorAttributeProductCardModule,
    FormsModule,
    I18nModule,
    ItemCounterModule,
    KeyboardFocusModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
  ],
})
export class ConfiguratorAttributeMultiSelectionBundleModule {}
