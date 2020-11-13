import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  CartItemComponentOutlets,
  IconModule,
  provideOutlet,
} from '@spartacus/storefront';
import { ConfiguratorIssuesNotificationModule } from '../configurator-issues-notification/configurator-issues-notification.module';
import { ConfigureCartEntryModule } from '../configure-cart-entry/configure-cart-entry.module';
import { ConfiguratorCartEntryInfoComponent } from './configurator-cart-entry-info.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    IconModule,
    ConfiguratorIssuesNotificationModule,
    ConfigureCartEntryModule,
  ],
  declarations: [ConfiguratorCartEntryInfoComponent],

  providers: [
    provideOutlet({
      id: CartItemComponentOutlets.INFORMATION,
      component: ConfiguratorCartEntryInfoComponent,
    }),
  ],
})
export class ConfiguratorCartEntryInfoModule {}
