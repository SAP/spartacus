import { NgModule } from '@angular/core';
import { ConfigAddToCartButtonModule } from './config-add-to-cart-button/config-add-to-cart-button.module';
import { ConfigFormModule } from './config-form/config-form.module';
import { ConfigGroupMenuModule } from './config-group-menu/config-group-menu.module';
import { ConfigGroupTitleModule } from './config-group-title/config-group-title.module';
import { ConfigurationMessageLoaderModule } from './config-message/config-message-loader.module';
import { ConfigMessageModule } from './config-message/config-message.module';
import { ConfigOverviewAttributeModule } from './config-overview-attribute/config-overview-attribute.module';
import { ConfigOverviewFormModule } from './config-overview-form/config-overview-form.module';
import { ConfigOverviewNotificationBannerModule } from './config-overview-notification-banner/config-overview-notification-banner.module';
import { ConfigPreviousNextButtonsModule } from './config-previous-next-buttons/config-previous-next-buttons.module';
import { ConfigPriceSummaryModule } from './config-price-summary/config-price-summary.module';
import { ConfigProductTitleModule } from './config-product-title/config-product-title.module';
import { ConfigTabBarModule } from './config-tab-bar/config-tab-bar.module';

@NgModule({
  imports: [
    ConfigPriceSummaryModule,
    ConfigAddToCartButtonModule,
    ConfigGroupMenuModule,
    ConfigProductTitleModule,
    ConfigTabBarModule,
    ConfigFormModule,
    ConfigGroupTitleModule,
    ConfigMessageModule,
    ConfigurationMessageLoaderModule,
    ConfigPreviousNextButtonsModule,
    ConfigOverviewAttributeModule,
    ConfigOverviewFormModule,
    ConfigOverviewNotificationBannerModule,
  ],
})
export class CommonConfiguratorComponentsModule {}
