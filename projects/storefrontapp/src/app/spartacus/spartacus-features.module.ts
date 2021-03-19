import { NgModule } from '@angular/core';
import {
  AnonymousConsentsModule,
  AuthModule,
  CartModule,
  CartOccModule,
  CheckoutModule,
  CheckoutOccModule,
  CostCenterOccModule,
  ExternalRoutesModule,
  ProductModule,
  ProductOccModule,
  UserModule,
  UserOccModule,
} from '@spartacus/core';
import {
  AddressBookModule,
  AnonymousConsentManagementBannerModule,
  AnonymousConsentsDialogModule,
  BannerCarouselModule,
  BannerModule,
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
  HomePageEventModule,
  JsonLdBuilderModule,
  LinkModule,
  MyCouponsModule,
  MyInterestsModule,
  NavigationEventModule,
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
import { environment } from '../../environments/environment';
import { AdministrationFeatureModule } from './features/administration-feature.module';
import { AsmFeatureModule } from './features/asm-feature.module';
import { BulkPricingFeatureModule } from './features/bulk-pricing-feature.module';
import { CdcFeatureModule } from './features/cdc-feature.module';
import { CdsFeatureModule } from './features/cds-feature.module';
import { OrderApprovalFeatureModule } from './features/order-approval-feature.module';
import { QualtricsFeatureModule } from './features/qualtrics-feature.module';
import { SavedCartFeatureModule } from './features/saved-cart-feature.module';
import { SmartEditFeatureModule } from './features/smartedit-feature.module';
import { StorefinderFeatureModule } from './features/storefinder-feature.module';
import { TrackingFeatureModule } from './features/tracking-feature.module';
import { VariantsFeatureModule } from './features/variants-feature.module';

const featureModules = [];

if (environment.b2b) {
  featureModules.push(
    AdministrationFeatureModule,
    OrderApprovalFeatureModule,
    SavedCartFeatureModule,
    BulkPricingFeatureModule
  );
}
if (environment.cdc) {
  featureModules.push(CdcFeatureModule);
}
if (environment.cds) {
  featureModules.push(CdsFeatureModule);
}

@NgModule({
  imports: [
    // Auth Core
    AuthModule.forRoot(),

    // Basic Cms Components
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

    // User Core
    UserModule.forRoot(),
    UserOccModule,
    // User UI
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

    // Anonymous Consents Core
    AnonymousConsentsModule.forRoot(),
    // Anonymous Consents UI
    AnonymousConsentsDialogModule,
    AnonymousConsentManagementBannerModule,

    // Product Core
    ProductModule.forRoot(),
    ProductOccModule,

    // Product UI
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

    // Cart Core
    CartModule.forRoot(),
    CartOccModule,
    // Cart UI
    CartComponentModule,
    WishListModule,

    // Checkout Core
    CheckoutModule.forRoot(),
    CheckoutOccModule,
    CostCenterOccModule,
    // Checkout UI
    CheckoutComponentModule,
    OrderConfirmationModule,

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

    // Page Events
    NavigationEventModule,
    HomePageEventModule,
    CartPageEventModule,
    PageEventModule,
    ProductPageEventModule,

    /************************* Opt-in features *************************/

    ExternalRoutesModule.forRoot(), // to opt-in explicitly, is added by default schematics
    JsonLdBuilderModule,

    /************************* External features *************************/

    AsmFeatureModule,
    StorefinderFeatureModule,
    QualtricsFeatureModule,
    SmartEditFeatureModule,
    TrackingFeatureModule,
    VariantsFeatureModule,
    ...featureModules,
  ],
})
export class SpartacusFeaturesModule {}
