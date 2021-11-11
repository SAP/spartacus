import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeRadioButtonComponent } from './configurator-attribute-radio-button.component';

@NgModule({
  imports: [
    CommonModule,
    ConfiguratorAttributeQuantityModule,
    FormsModule,
    I18nModule,
    KeyboardFocusModule,
    ReactiveFormsModule,
    ConfiguratorPriceModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorAttributeRadioButton: {
          component: ConfiguratorAttributeRadioButtonComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorAttributeRadioButtonComponent],
  exports: [ConfiguratorAttributeRadioButtonComponent],
})
export class ConfiguratorAttributeRadioButtonModule {}
