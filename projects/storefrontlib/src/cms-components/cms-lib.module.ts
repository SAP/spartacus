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
import { SiteContextSelectorModule } from './misc/index';
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
  ReplenishmentOrderHistoryModule,
  ResetPasswordModule,
  ReturnRequestDetailModule,
  ReturnRequestListModule,
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
import { UserComponentModule } from './user/user.module';
import { WishListModule } from './wish-list/wish-list.module';

/**
 * @deprecated since 3.1, use individual imports instead
 */
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
    ConsentManagementModule,
    CartComponentModule,
    TabParagraphContainerModule,
    OrderConfirmationModule,
    ProductImagesModule,
    ProductSummaryModule,
    ProductVariantsModule,
    ProductIntroModule,
    CheckoutComponentModule,
    BannerCarouselModule,
    MyCouponsModule,
    WishListModule,
    NotificationPreferenceModule,
    MyInterestsModule,
    StockNotificationModule,
    ReplenishmentOrderHistoryModule,
    ReplenishmentOrderConfirmationModule,
    ReplenishmentOrderDetailsModule,

    // moved to user lib

    UserComponentModule, // almost empty

    CloseAccountModule,
    UpdateEmailModule,
    UpdatePasswordModule,
    UpdateProfileModule,
    ForgotPasswordModule,
    ResetPasswordModule,
  ],
})
export class CmsLibModule {}
