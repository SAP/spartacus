import { NgModule } from '@angular/core';
import {
  AddressBookModule,
  AnonymousConsentManagementBannerModule,
  AnonymousConsentsDialogModule,
  AsmModule,
  BannerCarouselModule,
  BannerModule,
  BaseStorefrontModule,
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
  AsmOccModule,
  AuthModule,
  BaseCoreModule,
  CartModule,
  CartOccModule,
  CheckoutModule,
  CheckoutOccModule,
  CostCenterOccModule,
  ExternalRoutesModule,
  PersonalizationModule,
  ProductModule,
  ProductOccModule,
  SmartEditModule,
  UserModule,
  UserOccModule,
} from '@spartacus/core';

@NgModule({
  imports: [
    // Core
    BaseCoreModule.forRoot(),

    // Occ for features
    AsmOccModule,
    CartOccModule,
    CheckoutOccModule,
    CostCenterOccModule,
    ProductOccModule,
    UserOccModule,

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

    // Storefront
    BaseStorefrontModule,

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
  exports: [BaseStorefrontModule],
})
export class SpartacusSetupModule {}
