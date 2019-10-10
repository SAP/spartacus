import { NgModule } from '@angular/core';
import { HamburgerMenuModule } from '../layout/index';
import { AssistedServiceModule } from './asm/assisted-service.module';
import { CartComponentModule } from './cart/cart.module';
import { CheckoutComponentModule } from './checkout/checkout.module';
import { BannerCarouselModule } from './content/banner-carousel/banner-carousel.module';
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
import { OrderConfirmationModule } from './order-confirmation/index';
import {
  ProductCarouselModule,
  ProductIntroModule,
  ProductListModule,
  ProductReferencesModule,
  ProductTabsModule,
} from './product/index';
import { ProductImagesModule } from './product/product-images/product-images.module';
import { ProductSummaryModule } from './product/product-summary/product-summary.module';
import { StoreFinderModule } from './storefinder/store-finder.module';
import { UserComponentModule } from './user/user.module';

@NgModule({
  imports: [
    AssistedServiceModule,
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
    OrderConfirmationModule,
    StoreFinderModule,
    ProductImagesModule,
    ProductSummaryModule,
    ProductIntroModule,
    CheckoutComponentModule,
    ForgotPasswordModule,
    ResetPasswordModule,
    BannerCarouselModule,
    UserComponentModule,
  ],
})
export class CmsLibModule {}
