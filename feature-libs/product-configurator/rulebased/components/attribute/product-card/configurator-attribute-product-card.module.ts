import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { KeyboardFocusModule, MediaModule } from '@spartacus/storefront';
import { ConfiguratorPriceModule } from '../../price/configurator-price.module';
import { ConfiguratorShowMoreModule } from '../../show-more/configurator-show-more.module';
import { ConfiguratorAttributeQuantityModule } from '../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeProductCardComponent } from './configurator-attribute-product-card.component';

@NgModule({
  declarations: [ConfiguratorAttributeProductCardComponent],
  exports: [ConfiguratorAttributeProductCardComponent],
  imports: [
    CommonModule,
    ConfiguratorShowMoreModule,
    ConfiguratorAttributeQuantityModule,
    I18nModule,
    RouterModule,
    UrlModule,
    FormsModule,
    ReactiveFormsModule,
    MediaModule,
    ConfiguratorPriceModule,
    KeyboardFocusModule,
  ],
})
export class ConfiguratorAttributeProductCardModule {}
