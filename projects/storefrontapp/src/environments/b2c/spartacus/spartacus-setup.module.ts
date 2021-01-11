import { NgModule } from '@angular/core';
import {
  AddressBookModule,
  AnonymousConsentManagementBannerModule,
  AnonymousConsentsDialogModule,
  AsmModule,
  BannerCarouselModule,
  BannerModule,
  BaseUiModule,
  BreadcrumbModule,
  CartComponentModule,
  CartPageEventModule,
  CategoryNavigationModule,
  CheckoutComponentModule,
  CloseAccountModule,
  CmsParagraphModule,
  ConsentManagementModule,
  FooterNavigationModule,
  ForgotPasswordModule,
  HamburgerMenuModule,
  LinkModule,
  MyCouponsModule,
  MyInterestsModule,
  NavigationModule,
  NotificationPreferenceModule,
  OrderCancellationModule,
  OrderConfirmationModule,
  OrderDetailsModule,
  OrderHistoryModule,
  OrderReturnModule,
  PageEventModule,
  PaymentMethodsModule,
  ProductCarouselModule,
  ProductDetailsPageModule,
  ProductFacetNavigationModule,
  ProductImagesModule,
  ProductIntroModule,
  ProductListingPageModule,
  ProductListModule,
  ProductPageEventModule,
  ProductReferencesModule,
  ProductSummaryModule,
  ProductTabsModule,
  ProductVariantsModule,
  QualtricsModule,
  ReplenishmentOrderConfirmationModule,
  ReplenishmentOrderDetailsModule,
  ReplenishmentOrderHistoryModule,
  ResetPasswordModule,
  ReturnRequestDetailModule,
  ReturnRequestListModule,
  SearchBoxModule,
  SiteContextSelectorModule,
  StockNotificationModule,
  TabParagraphContainerModule,
  UpdateEmailModule,
  UpdatePasswordModule,
  UpdateProfileModule,
  UserComponentModule,
  WishListModule,
} from '@spartacus/storefront';
import {
  AnonymousConsentsModule,
  AuthModule,
  BaseCoreModule,
  CartModule,
  CheckoutModule,
  ExternalRoutesModule,
  PersonalizationModule,
  ProductModule,
  SmartEditModule,
  UserModule,
} from '@spartacus/core';

@NgModule({
  imports: [
    // Core
    BaseCoreModule.forRoot(),

    // Core Features
    AuthModule.forRoot(),
    AnonymousConsentsModule.forRoot(),
    CartModule.forRoot(),
    CheckoutModule.forRoot(),
    UserModule.forRoot(),
    ProductModule.forRoot(),

    SmartEditModule.forRoot(),
    PersonalizationModule.forRoot(),

    ExternalRoutesModule.forRoot(), // to opt-in explicitly, is added by default schematics

    // UI
    BaseUiModule,

    // Events
    CartPageEventModule,
    PageEventModule,
    ProductPageEventModule,

    // Anonymous Consents
    AnonymousConsentsDialogModule,
    AnonymousConsentManagementBannerModule,

    // Cms
    HamburgerMenuModule,
    SiteContextSelectorModule,
    LinkModule,
    BannerModule,
    CmsParagraphModule,
    TabParagraphContainerModule,
    BannerCarouselModule,
    CategoryNavigationModule,
    NavigationModule,
    FooterNavigationModule,
    BreadcrumbModule,

    // User
    UserComponentModule,
    AddressBookModule,
    UpdateEmailModule,
    UpdatePasswordModule,
    UpdateProfileModule,
    CloseAccountModule,
    ForgotPasswordModule,
    ResetPasswordModule,
    PaymentMethodsModule,

    NotificationPreferenceModule,
    MyInterestsModule,
    StockNotificationModule,

    ConsentManagementModule,
    MyCouponsModule,

    // Order
    OrderHistoryModule,
    OrderDetailsModule,
    OrderCancellationModule,
    OrderReturnModule,
    ReturnRequestListModule,
    ReturnRequestDetailModule,
    ReplenishmentOrderHistoryModule,
    ReplenishmentOrderDetailsModule,
    ReplenishmentOrderConfirmationModule,

    // Product
    ProductDetailsPageModule,
    ProductListingPageModule,
    ProductListModule,
    SearchBoxModule,
    ProductFacetNavigationModule,
    ProductTabsModule,
    ProductCarouselModule,
    ProductReferencesModule,
    ProductImagesModule,
    ProductSummaryModule,
    ProductVariantsModule,
    ProductIntroModule,

    // Cart
    CartComponentModule,
    WishListModule,

    // Checkout
    CheckoutComponentModule,
    OrderConfirmationModule,

    QualtricsModule,
    AsmModule,
  ],
  exports: [BaseUiModule],
})
export class SpartacusSetupModule {}
