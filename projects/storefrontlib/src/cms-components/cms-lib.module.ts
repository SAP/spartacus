import { NgModule } from '@angular/core';
import { HamburgerMenuModule, SkipLinkModule } from '../layout/index';
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
  OrderDetailsModule,
  OrderHistoryModule,
  PaymentMethodsModule,
  UpdateEmailModule,
  UpdatePasswordModule,
  UpdateProfileModule,
  ForgotPasswordModule,
  ResetPasswordModule,
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
    OrderDetailsModule,
    PaymentMethodsModule,
    UpdateEmailModule,
    UpdatePasswordModule,
    UpdateProfileModule,
    CartComponentModule,
    CloseAccountModule,
    TabParagraphContainerModule,
    StoreFinderModule,
    ForgotPasswordModule,
    ResetPasswordModule,
  ],
})
export class CmsLibModule {}
