import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigModule } from '@spartacus/core';
import { PageLayoutModule } from '../../../cms-structure/page/index';
import { CartPageModule } from './cart-page/cart-page.module';
import { defaultRoutingConfig } from './default-routing-config';
import { OrderConfirmationPageModule } from './order-confirmation-page/order-confirmation-page.module';

const pageModules = [CartPageModule, OrderConfirmationPageModule];

@NgModule({
  imports: [
    ConfigModule.withConfig(defaultRoutingConfig),
    CommonModule,
    ...pageModules,
    PageLayoutModule,
  ],
})
export class PagesModule {}
