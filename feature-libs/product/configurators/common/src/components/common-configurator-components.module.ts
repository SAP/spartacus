import { NgModule } from '@angular/core';
import { ConfigGroupTitleModule } from './config-group-title/config-group-title.module';
import { ConfigurationMessageLoaderModule } from './config-message/config-message-loader.module';
import { ConfigMessageModule } from './config-message/config-message.module';
import { ConfigPreviousNextButtonsModule } from './config-previous-next-buttons/config-previous-next-buttons.module';
import { ConfigPriceSummaryModule } from './config-price-summary/config-price-summary.module';
import { ConfigProductTitleModule } from './config-product-title/config-product-title.module';
import { ConfigTabBarModule } from './config-tab-bar/config-tab-bar.module';

@NgModule({
  imports: [
    ConfigPriceSummaryModule,
    ConfigProductTitleModule,
    ConfigTabBarModule,
    ConfigGroupTitleModule,
    ConfigMessageModule,
    ConfigurationMessageLoaderModule,
    ConfigPreviousNextButtonsModule,
  ],
})
export class CommonConfiguratorComponentsModule {}
