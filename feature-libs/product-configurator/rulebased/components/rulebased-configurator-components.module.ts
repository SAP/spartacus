import { NgModule } from '@angular/core';
import { ConfiguratorAddToCartButtonModule } from './add-to-cart-button/configurator-add-to-cart-button.module';
import { ConfiguratorFormModule } from './form/configurator-form.module';
import { ConfiguratorGroupMenuModule } from './group-menu/configurator-group-menu.module';
import { ConfiguratorGroupTitleModule } from './group-title/configurator-group-title.module';
import { ConfiguratorOverviewAttributeModule } from './overview-attribute/configurator-overview-attribute.module';
import { ConfiguratorOverviewFormModule } from './overview-form/configurator-overview-form.module';
import { ConfiguratorOverviewNotificationBannerModule } from './overview-notification-banner/configurator-overview-notification-banner.module';
import { ConfiguratorPreviousNextButtonsModule } from './previous-next-buttons/configurator-previous-next-buttons.module';
import { ConfiguratorPriceSummaryModule } from './price-summary/configurator-price-summary.module';
import { ConfiguratorProductTitleModule } from './product-title/configurator-product-title.module';
import { ConfiguratorTabBarModule } from './tab-bar/configurator-tab-bar.module';
import { ConfiguratorUpdateMessageModule } from './update-message/configurator-update-message.module';
import { ConfiguratorConflictAndErrorMessagesModule } from './configurator-conflict-and-error-messages/configurator-conflict-and-error-messages.module';
import { ConfiguratorExitButtonModule } from './exit-button/configurator-exit-button.module';

@NgModule({
  imports: [
    ConfiguratorPriceSummaryModule,
    ConfiguratorAddToCartButtonModule,
    ConfiguratorGroupMenuModule,
    ConfiguratorProductTitleModule,
    ConfiguratorTabBarModule,
    ConfiguratorFormModule,
    ConfiguratorGroupTitleModule,
    ConfiguratorUpdateMessageModule,
    ConfiguratorPreviousNextButtonsModule,
    ConfiguratorOverviewAttributeModule,
    ConfiguratorOverviewFormModule,
    ConfiguratorOverviewNotificationBannerModule,
    ConfiguratorConflictAndErrorMessagesModule,
    ConfiguratorExitButtonModule,
  ],
})
export class RulebasedConfiguratorComponentsModule {}
