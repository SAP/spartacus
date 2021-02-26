import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  CartOutlets,
  IconModule,
  OutletPosition,
  provideOutlet,
} from '@spartacus/storefront';
import { ConfigureCartEntryModule } from '../configure-cart-entry/configure-cart-entry.module';
import { ConfiguratorIssuesNotificationComponent } from './configurator-issues-notification.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    IconModule,
    ConfigureCartEntryModule,
  ],
  declarations: [ConfiguratorIssuesNotificationComponent],
  providers: [
    provideOutlet({
      id: CartOutlets.ITEM,
      position: OutletPosition.BEFORE,
      component: ConfiguratorIssuesNotificationComponent,
    }),
  ],
  exports: [ConfiguratorIssuesNotificationComponent],
})
export class ConfiguratorIssuesNotificationModule {}
