import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ContentPage
import { CartPageModule } from './cart-page/cart-page.module';
import { OrderConfirmationPageModule } from './order-confirmation-page/order-confirmation-page.module';

import { RegisterPageModule } from './register-page/register-page.module';
import { ResetPasswordPageModule } from './reset-password-page/reset-password-page.module';
import { StoreFinderPageModule } from './store-finder-page/store-finder-page.module';
import { ResetNewPasswordPageModule } from './reset-new-password-page/reset-new-password-page.module';

// ContentPage: my Account Pages
import { OrderDetailsPageModule } from './myaccount/order-details-page/order-details-page.module';

// CategoryPage
import { CategoryPageModule } from './category-page/category-page.module';

// ProductPage
import { ProductPageModule } from './product-page/product-page.module';
import { RouterModule } from '@angular/router';
import { CmsPageGuards } from '../../cms/guards/cms-page.guard';
import { PageLayoutComponent } from '../../cms/page-layout/page-layout.component';
import { PageLayoutModule } from '../../cms/page-layout/page-layout.module';
import { AuthGuard, NotAuthGuard } from '@spartacus/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HardcodedCheckoutComponent } from './checkout-page.interceptor';
import { GuardsModule } from './guards/guards.module';
import { CartNotEmptyGuard } from './guards/cart-not-empty.guard';

const pageModules = [
  CategoryPageModule,
  CartPageModule,
  OrderDetailsPageModule,
  OrderConfirmationPageModule,
  ProductPageModule,
  RegisterPageModule,
  ResetPasswordPageModule,
  StoreFinderPageModule,
  ResetNewPasswordPageModule,
  GuardsModule
];

@NgModule({
  imports: [
    CommonModule,
    ...pageModules,
    PageLayoutModule,
    RouterModule.forChild([
      {
        // This route can be dropped only when we have a mapping path to page label for content pages
        path: null,
        canActivate: [CmsPageGuards],
        component: PageLayoutComponent,
        data: { pageLabel: 'homepage', cxPath: 'home' }
      },
      {
        // This route can be dropped only when the link from CMS in MyAccount dropdown menu ("my-account/address-book")
        // is the same as the page label ("address-book"). Or when we have a mapping for content pages.
        path: null,
        canActivate: [AuthGuard, CmsPageGuards],
        data: { pageLabel: 'address-book', cxPath: 'addressBook' },
        component: PageLayoutComponent
      },
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuards],
        component: PageLayoutComponent,
        data: { pageLabel: 'orders', cxPath: 'orders' }
      },
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuards, CartNotEmptyGuard],
        component: PageLayoutComponent,
        data: { pageLabel: 'multiStepCheckoutSummaryPage', cxPath: 'checkout' }
      },
      {
        path: null,
        canActivate: [NotAuthGuard, CmsPageGuards],
        component: PageLayoutComponent,
        data: { pageLabel: 'login', cxPath: 'login' }
      },
      {
        path: null,
        canActivate: [CmsPageGuards],
        component: PageLayoutComponent,
        data: { cxPath: 'product' }
      },
      {
        path:
          'Open-Catalogue/:category1/:category2/:category3/:category4/p/:productCode',
        redirectTo: null,
        data: { cxRedirectTo: 'product' }
      },
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuards],
        data: { pageLabel: 'payment-details', cxPath: 'paymentManagement' },
        component: PageLayoutComponent
      },
      // PLEASE ADD ALL ROUTES ABOVE THIS LINE ===============================
      {
        path: '**',
        canActivate: [CmsPageGuards],
        component: PageLayoutComponent
      }
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HardcodedCheckoutComponent,
      multi: true
    }
  ]
})
export class PagesModule {}
