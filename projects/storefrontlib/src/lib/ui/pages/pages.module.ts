import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, ConfigModule } from '@spartacus/core';
import { LogoutGuard } from '../../../cms-components/index';
import {
  PageLayoutComponent,
  PageLayoutModule,
} from '../../../cms-structure/page/index';
import { CmsPageGuard } from '../../cms/guards/cms-page.guard';
import { CartPageModule } from './cart-page/cart-page.module';
import { HardcodedCheckoutComponent } from './checkout-page.interceptor';
import { defaultRoutingConfig } from './default-routing-config';
import { CartNotEmptyGuard } from './guards/cart-not-empty.guard';
import { GuardsModule } from './guards/guards.module';
import { OrderConfirmationPageModule } from './order-confirmation-page/order-confirmation-page.module';
import { ProductPageModule } from './product-page/product-page.module';

const pageModules = [
  CartPageModule,
  OrderConfirmationPageModule,
  ProductPageModule,
  GuardsModule,
];

@NgModule({
  imports: [
    ConfigModule.withConfig(defaultRoutingConfig),
    CommonModule,
    ...pageModules,
    PageLayoutModule,
    RouterModule.forChild([
      {
        // This route can be dropped only when we have a mapping path to page label for content pages
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { pageLabel: 'homepage', cxRoute: 'home' },
      },
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuard, CartNotEmptyGuard],
        component: PageLayoutComponent,
        data: {
          pageLabel: 'multiStepCheckoutSummaryPage',
          cxRoute: 'checkout',
        },
      },
      {
        path: null,
        canActivate: [LogoutGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'logout' },
      },
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { pageLabel: 'search', cxRoute: 'search' },
      },
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'category' },
      },
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'brand' },
      },
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { pageLabel: 'order', cxRoute: 'orderDetails' },
      },
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HardcodedCheckoutComponent,
      multi: true,
    },
  ],
})
export class PagesModule {}
