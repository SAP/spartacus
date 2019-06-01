import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigModule } from '@spartacus/core';
import { LogoutGuard } from '../../../cms-components/index';
import {
  PageLayoutComponent,
  PageLayoutModule,
} from '../../../cms-structure/page/index';
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
    RouterModule.forChild([
      {
        path: null,
        canActivate: [LogoutGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'logout' },
      },
    ]),
  ],
})
export class PagesModule {}
