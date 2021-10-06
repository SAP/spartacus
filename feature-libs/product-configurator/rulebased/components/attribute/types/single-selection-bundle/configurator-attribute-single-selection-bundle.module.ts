import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ItemCounterModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeProductCardModule } from '../../product-card/configurator-attribute-product-card.module';
import { ConfiguratorAttributeSingleSelectionBundleComponent } from './configurator-attribute-single-selection-bundle.component';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';

@NgModule({
  imports: [
    CommonModule,
    ConfiguratorAttributeProductCardModule,
    ConfiguratorAttributeQuantityModule,
    FormsModule,
    I18nModule,
    ItemCounterModule,
    KeyboardFocusModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    ConfiguratorPriceModule,
  ],
  declarations: [ConfiguratorAttributeSingleSelectionBundleComponent],
  exports: [ConfiguratorAttributeSingleSelectionBundleComponent],
})
export class ConfiguratorAttributeSingleSelectionBundleModule {}
