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
  ConsentManagementModule,
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
  ProductReferencesModule,
  ProductTabsModule,
} from './product/index';
import { ProductImagesModule } from './product/product-images/product-images.module';
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
    ProductImagesModule,
    ForgotPasswordModule,
    ResetPasswordModule,
  ],
})
export class CmsLibModule {}
