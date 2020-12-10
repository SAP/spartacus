import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ItemCounterModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeSingleSelectionBundleComponent } from './configurator-attribute-single-selection-bundle.component';
import { ConfiguratorShowMoreModule } from '../../../show-more/configurator-show-more.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ConfiguratorShowMoreModule,
    FormsModule,
    I18nModule,
    ItemCounterModule,
    KeyboardFocusModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
  ],
  declarations: [ConfiguratorAttributeSingleSelectionBundleComponent],
  exports: [ConfiguratorAttributeSingleSelectionBundleComponent],
  entryComponents: [ConfiguratorAttributeSingleSelectionBundleComponent],
})
export class ConfiguratorAttributeSingleSelectionBundleModule {}
