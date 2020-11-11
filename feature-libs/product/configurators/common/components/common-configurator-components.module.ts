import { NgModule } from '@angular/core';
import { ConfiguratorIssuesNotificationModule } from './configurator-issues-notification/configurator-issues-notification.module';
import { ConfigureCartEntryModule } from './configure-cart-entry/configure-cart-entry.module';
import { CommonConfiguratorOutletComponentsModule } from './outlets/common-configurator-outlet-components.module';

@NgModule({
  imports: [
    ConfiguratorIssuesNotificationModule,
    ConfigureCartEntryModule,
    CommonConfiguratorOutletComponentsModule,
  ],
})
export class CommonConfiguratorComponentsModule {}
