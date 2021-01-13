import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { ConfiguratorShowMoreModule } from '../../show-more/configurator-show-more.module';
import { ConfiguratorAttributeQuantityModule } from '../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeProductCardComponent } from './configurator-attribute-product-card.component';

@NgModule({
  declarations: [ConfiguratorAttributeProductCardComponent],
  entryComponents: [ConfiguratorAttributeProductCardComponent],
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
  ],
})
export class ConfiguratorAttributeProductCardModule {}
