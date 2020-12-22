import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ItemCounterModule } from '@spartacus/storefront';
import { ConfiguratorShowMoreModule } from '../../show-more/configurator-show-more.module';
import { ConfiguratorAttributeProductCardComponent } from './configurator-attribute-product-card.component';

@NgModule({
  declarations: [ConfiguratorAttributeProductCardComponent],
  entryComponents: [ConfiguratorAttributeProductCardComponent],
  exports: [ConfiguratorAttributeProductCardComponent],
  imports: [
    CommonModule,
    ConfiguratorShowMoreModule,
    I18nModule,
    ItemCounterModule,
    RouterModule,
    UrlModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ConfiguratorAttributeProductCardModule {}
