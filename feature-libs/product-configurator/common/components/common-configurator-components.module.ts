import { NgModule } from '@angular/core';
import { ConfiguratorCartEntryInfoModule } from './configurator-cart-entry-info/configurator-cart-entry-info.module';
import { ConfiguratorIssuesNotificationModule } from './configurator-issues-notification/configurator-issues-notification.module';
import { ConfigureCartEntryModule } from './configure-cart-entry/configure-cart-entry.module';
import { ConfigureProductModule } from './configure-product/configure-product.module';
import { ConfiguratorCartEntryBundleInfoModule } from './configurator-cart-entry-bundle-info/configurator-cart-entry-bundle-info.module';

@NgModule({
  imports: [
    ConfiguratorIssuesNotificationModule,
    ConfiguratorCartEntryInfoModule,
    ConfiguratorCartEntryBundleInfoModule,
    ConfigureCartEntryModule,
    ConfigureProductModule,
  ],
})
export class CommonConfiguratorComponentsModule {}
