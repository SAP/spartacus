import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ContentPage
import { CartPageModule } from './cart-page/cart-page.module';
import { OrderConfirmationPageModule } from './order-confirmation-page/order-confirmation-page.module';

import { RegisterPageModule } from './register-page/register-page.module';
import { LoginPageModule } from './login-page/login-page.module';
import { ResetPasswordPageModule } from './reset-password-page/reset-password-page.module';
import { StoreFinderPageModule } from './store-finder-page/store-finder-page.module';
import { ResetNewPasswordPageModule } from './reset-new-password-page/reset-new-password-page.module';
import { PageNotFoundModule } from './404-page/404-page.modules';

// ContentPage: my Account Pages
import { PaymentDetailsPageModule } from './myaccount/payment-details-page/payment-details-page.module';
import { OrderDetailsPageModule } from './myaccount/order-details-page/order-details-page.module';

// CategoryPage
import { CategoryPageModule } from './category-page/category-page.module';

// ProductPage
import { ProductPageModule } from './product-page/product-page.module';
import { RouterModule } from '@angular/router';
import { CmsPageGuards } from '../../cms/guards/cms-page.guard';
import { PageLayoutComponent } from '../../cms/page-layout/page-layout.component';
import { PageLayoutModule } from '../../cms/page-layout/page-layout.module';
import { AuthGuard } from '@spartacus/core';
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
  LoginPageModule,
  PaymentDetailsPageModule,
  ResetPasswordPageModule,
  StoreFinderPageModule,
  ResetNewPasswordPageModule,
  GuardsModule,
  PageNotFoundModule
  // new pages should be added above this line
];

@NgModule({
  imports: [
    CommonModule,
    ...pageModules,
    PageLayoutModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuards],
        component: PageLayoutComponent,
        data: { pageLabel: 'homepage', cxPath: 'home' }
      },
      {
        path: null,
        canActivate: [CmsPageGuards],
        component: PageLayoutComponent,
        data: { pageLabel: 'faq', cxPath: 'help' }
      },
      {
        path: null,
        canActivate: [CmsPageGuards],
        component: PageLayoutComponent,
        data: { pageLabel: 'sale', cxPath: 'sale' }
      },
      {
        path: null,
        canActivate: [CmsPageGuards],
        component: PageLayoutComponent,
        data: { pageLabel: 'contactUs', cxPath: 'contact' }
      },
      {
        path: null,
        canActivate: [CmsPageGuards],
        component: PageLayoutComponent,
        data: { pageLabel: 'termsAndConditions', cxPath: 'termsAndConditions' }
      },
      {
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
