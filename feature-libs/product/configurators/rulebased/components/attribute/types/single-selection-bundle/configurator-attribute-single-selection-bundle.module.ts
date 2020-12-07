import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeSingleSelectionBundleComponent } from './configurator-attribute-single-selection-bundle.component';
import { ConfiguratorShowMoreModule } from '../../../show-more/configurator-show-more.module';
@NgModule({
  imports: [
    ConfiguratorShowMoreModule,
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
  ],
  declarations: [ConfiguratorAttributeSingleSelectionBundleComponent],
  exports: [ConfiguratorAttributeSingleSelectionBundleComponent],
  entryComponents: [ConfiguratorAttributeSingleSelectionBundleComponent],
})
export class ConfiguratorAttributeSingleSelectionBundleModule {}
