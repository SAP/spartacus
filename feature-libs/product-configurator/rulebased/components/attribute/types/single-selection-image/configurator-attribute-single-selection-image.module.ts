import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import { ConfiguratorAttributeSingleSelectionImageComponent } from './configurator-attribute-single-selection-image.component';

@NgModule({
  imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    ConfiguratorPriceModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorAttributeSingleSelectionImage: {
          component: ConfiguratorAttributeSingleSelectionImageComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorAttributeSingleSelectionImageComponent],
  exports: [ConfiguratorAttributeSingleSelectionImageComponent],
})
export class ConfiguratorAttributeSingleSelectionImageModule {}
