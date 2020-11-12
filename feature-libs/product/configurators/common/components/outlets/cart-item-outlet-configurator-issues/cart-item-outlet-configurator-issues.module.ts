import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  CartItemComponentOutlets,
  IconModule,
  provideOutlet,
} from '@spartacus/storefront';
import { ConfiguratorIssuesNotificationModule } from '../../../components/configurator-issues-notification/configurator-issues-notification.module';
import { CartItemOutletConfiguratorIssuesComponent } from './cart-item-outlet-configurator-issues.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    IconModule,
    ConfiguratorIssuesNotificationModule,
  ],
  declarations: [CartItemOutletConfiguratorIssuesComponent],

  providers: [
    provideOutlet({
      id: CartItemComponentOutlets.INFORMATION,
      component: CartItemOutletConfiguratorIssuesComponent,
    }),
  ],
})
export class CartItemOutletConfiguratorIssuesModule {}
