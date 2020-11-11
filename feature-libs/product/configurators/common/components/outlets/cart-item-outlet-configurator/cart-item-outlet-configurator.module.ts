import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  CartItemComponentOutlets,
  IconModule,
  provideOutlet,
} from '@spartacus/storefront';
import { ConfiguratorIssuesNotificationModule } from '../../../components/configurator-issues-notification/configurator-issues-notification.module';
import { ConfigureCartEntryModule } from '../../../components/configure-cart-entry/configure-cart-entry.module';
import { CartItemOutletConfiguratorComponent } from './cart-item-outlet-configurator.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    IconModule,
    ConfiguratorIssuesNotificationModule,
    ConfigureCartEntryModule,
  ],
  declarations: [CartItemOutletConfiguratorComponent],

  providers: [
    provideOutlet({
      id: CartItemComponentOutlets.CONFIGURATOR,
      component: CartItemOutletConfiguratorComponent,
    }),
  ],
})
export class CartItemOutletConfiguratorModule {}
