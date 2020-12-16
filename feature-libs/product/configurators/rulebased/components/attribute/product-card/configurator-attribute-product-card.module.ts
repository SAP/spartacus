import { CommonModule } from '@angular/common';
import { ConfiguratorAttributeProductCardComponent } from './configurator-attribute-product-card.component';
import { ConfiguratorShowMoreModule } from '../../show-more/configurator-show-more.module';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ItemCounterModule } from '@spartacus/storefront';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
