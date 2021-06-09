import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import { ConfiguratorAttributeProductCardModule } from '../../product-card/configurator-attribute-product-card.module';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeMultiSelectionBundleComponent } from './configurator-attribute-multi-selection-bundle.component';

@NgModule({
  declarations: [ConfiguratorAttributeMultiSelectionBundleComponent],
  exports: [ConfiguratorAttributeMultiSelectionBundleComponent],
  imports: [
    CommonModule,
    ConfiguratorAttributeProductCardModule,
    FormsModule,
    I18nModule,
    KeyboardFocusModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    ConfiguratorAttributeQuantityModule,
    ConfiguratorPriceModule,
  ],
})
export class ConfiguratorAttributeMultiSelectionBundleModule {}
