import { NgModule } from '@angular/core';
import { HamburgerMenuModule, SkipLinkModule } from '../layout/index';
import { CheckoutComponentModule } from '../lib/checkout/checkout.module';
import { CartComponentModule } from './checkout/cart/cart.module';
import {
  BannerModule,
  CmsParagraphModule,
  LinkModule,
  TabParagraphContainerModule,
} from './content/index';
import { SiteContextSelectorModule } from './misc/index';
import {
  AddressBookModule,
  CloseAccountModule,
  ConsentManagementModule,
  ForgotPasswordModule,
  OrderDetailsModule,
  OrderHistoryModule,
  PaymentMethodsModule,
  ResetPasswordModule,
  UpdateEmailModule,
  UpdatePasswordModule,
  UpdateProfileModule,
} from './myaccount/index';
import {
  BreadcrumbModule,
  CategoryNavigationModule,
  FooterNavigationModule,
  NavigationModule,
  SearchBoxModule,
} from './navigation/index';
import {
  ProductCarouselModule,
  ProductListModule,
  ProductReferencesModule,
  ProductTabsModule,
} from './product/index';
import { StoreFinderModule } from './storefinder/index';

@NgModule({
  imports: [
    SkipLinkModule,
    HamburgerMenuModule,
    CmsParagraphModule,
    LinkModule,
    BannerModule,
    CategoryNavigationModule,
    NavigationModule,
    FooterNavigationModule,
    BreadcrumbModule,
    SearchBoxModule,
    SiteContextSelectorModule,
    AddressBookModule,
    OrderHistoryModule,
    ProductListModule,
    ProductTabsModule,
    ProductCarouselModule,
    ProductReferencesModule,
    OrderDetailsModule,
    PaymentMethodsModule,
    UpdateEmailModule,
    UpdatePasswordModule,
    UpdateProfileModule,
    ConsentManagementModule,
    CloseAccountModule,
    CartComponentModule,
    TabParagraphContainerModule,
    StoreFinderModule,
    CheckoutComponentModule,
    ForgotPasswordModule,
    ResetPasswordModule,
  ],
})
export class CmsLibModule {}
