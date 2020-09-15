import { NgModule } from '@angular/core';
import { HamburgerMenuModule } from '../layout/index';
import { AnonymousConsentManagementBannerModule } from './anonymous-consent-management/anonymous-consent-management.module';
import { AsmModule } from './asm/asm.module';
import { CartComponentModule } from './cart/cart.module';
import { CheckoutComponentModule } from './checkout/checkout.module';
import { BannerCarouselModule } from './content/banner-carousel/banner-carousel.module';
import {
  BannerModule,
  CmsParagraphModule,
  LinkModule,
  TabParagraphContainerModule,
} from './content/index';
import { QualtricsModule, SiteContextSelectorModule } from './misc/index';
import {
  AddressBookModule,
  CloseAccountModule,
  ConsentManagementModule,
  ForgotPasswordModule,
  MyCouponsModule,
  MyInterestsModule,
  NotificationPreferenceModule,
  OrderCancellationModule,
  OrderDetailsModule,
  OrderHistoryModule,
  OrderReturnModule,
  PaymentMethodsModule,
  ReplenishmentOrderDetailsModule,
  ResetPasswordModule,
  ReturnRequestDetailModule,
  ReturnRequestListModule,
  UpdateEmailModule,
  UpdatePasswordModule,
  UpdateProfileModule,
  ReplenishmentOrderHistoryModule,
} from './myaccount/index';
import {
  BreadcrumbModule,
  CategoryNavigationModule,
  FooterNavigationModule,
  NavigationModule,
  SearchBoxModule,
} from './navigation/index';
import {
  OrderConfirmationModule,
  ReplenishmentOrderConfirmationModule,
} from './order-confirmation/index';
import {
  ProductCarouselModule,
  ProductFacetNavigationModule,
  ProductIntroModule,
  ProductListModule,
  ProductReferencesModule,
  ProductTabsModule,
  StockNotificationModule,
} from './product/index';
import { ProductImagesModule } from './product/product-images/product-images.module';
import { ProductSummaryModule } from './product/product-summary/product-summary.module';
import { ProductVariantsModule } from './product/product-variants/product-variants.module';
import { StoreFinderModule } from './storefinder/store-finder.module';
import { UserComponentModule } from './user/user.module';
import { WishListModule } from './wish-list/wish-list.module';

@NgModule({
  imports: [
    AnonymousConsentManagementBannerModule,
    AsmModule,
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
    QualtricsModule,
    AddressBookModule,
    OrderHistoryModule,
    OrderCancellationModule,
    OrderReturnModule,
    ReturnRequestListModule,
    ReturnRequestDetailModule,
    ProductListModule,
    ProductFacetNavigationModule,
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
    ProductVariantsModule,
    ProductIntroModule,
    CheckoutComponentModule,
    ForgotPasswordModule,
    ResetPasswordModule,
    BannerCarouselModule,
    UserComponentModule,
    MyCouponsModule,
    WishListModule,
    NotificationPreferenceModule,
    MyInterestsModule,
    StockNotificationModule,
    ReplenishmentOrderHistoryModule,
    ReplenishmentOrderConfirmationModule,
    ReplenishmentOrderDetailsModule,
  ],
})
export class CmsLibModule {}
