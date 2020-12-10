import { CommonModule } from '@angular/common';
import { ConfiguratorAttributeProductCardComponent } from './configurator-attribute-product-card.component';
import { ConfiguratorShowMoreModule } from '../../show-more/configurator-show-more.module';
import { I18nModule, UrlModule } from '@spartacus/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ConfiguratorAttributeProductCardComponent],
  entryComponents: [ConfiguratorAttributeProductCardComponent],
  exports: [ConfiguratorAttributeProductCardComponent],
  imports: [
    CommonModule,
    ConfiguratorShowMoreModule,
    I18nModule,
    RouterModule,
    UrlModule,
  ],
})
export class ConfiguratorAttributeProductCardModule {}
