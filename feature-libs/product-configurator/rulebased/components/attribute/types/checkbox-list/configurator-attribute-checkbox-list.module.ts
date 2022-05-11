import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeCheckBoxListComponent } from './configurator-attribute-checkbox-list.component';

@NgModule({
  imports: [
    KeyboardFocusModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    ConfiguratorAttributeQuantityModule,
    ConfiguratorPriceModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorAttributeCheckBoxList: {
          component: ConfiguratorAttributeCheckBoxListComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorAttributeCheckBoxListComponent],
  exports: [ConfiguratorAttributeCheckBoxListComponent],
})
export class ConfiguratorAttributeCheckboxListModule {}
