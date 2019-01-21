import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ContentPage
import { ContentPageModule } from './content-page/content-page.module';
import { HomePageModule } from './home-page/home-page.module';
import { PageNotFoundModule } from './404/404.module';
import { CartPageModule } from './cart-page/cart-page.module';

import { MultiStepCheckoutPageModule } from './multi-step-checkout-page/multi-step-checkout-page.module';

import { LoginPageModule } from './login/login-page/login-page.module';
import { RegisterPageModule } from './login/register-page/register-page.module';
import { ResetNewPasswordPageModule } from './login/reset-new-password-page/reset-new-password-page.module';
import { ResetPasswordPageModule } from './login/reset-password-page/reset-password-page.module';

import { StoreFinderPageModule } from './store-finder-page/store-finder-page.module';
import { PaymentDetailsPageModule } from './myaccount/payment-details-page/payment-details-page.module';

// order ContentPages
import { OrderHistoryPageModule } from './order/order-history-page/order-history-page.module';
import { OrderDetailsPageModule } from './order/order-details-page/order-details-page.module';
import { OrderConfirmationPageModule } from './order/order-confirmation-page/order-confirmation-page.module';

// account ContentPages
import { AddressBookPageModule } from './myaccount/address-book-page/address-book-page.module';

// CategoryPage
import { CategoryPageModule } from './category-page/category-page.module';

// ProductPage
import { ProductPageModule } from './product-page/product-page.module';
import { PageLayoutModule } from '../../cms/page-layout/page-layout.module';

const pageModules = [
  PageLayoutModule,
  ContentPageModule,

  HomePageModule,
  CategoryPageModule,
  ProductPageModule,
  CartPageModule,
  MultiStepCheckoutPageModule,

  OrderHistoryPageModule,
  OrderDetailsPageModule,
  OrderConfirmationPageModule,

  LoginPageModule,
  RegisterPageModule,
  ResetPasswordPageModule,
  ResetNewPasswordPageModule,

  AddressBookPageModule,
  PaymentDetailsPageModule,
  StoreFinderPageModule,
  // new pages should be added above this line
  PageNotFoundModule
];

@NgModule({
  imports: [CommonModule, ...pageModules],
  exports: [...pageModules]
})
export class PagesModule {}
