import { NgModule } from '@angular/core';
import {
  AnonymousConsentsModule,
  AuthModule,
  CartModule,
  CartOccModule,
  CostCenterOccModule,
  ExternalRoutesModule,
  OrderOccModule,
  ProductModule,
  ProductOccModule,
  UserOccTransitional_4_2_Module,
  UserTransitional_4_2_Module,
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
  CmsParagraphModule,
  ConsentManagementModule,
  FooterNavigationModule,
  HamburgerMenuModule,
  HomePageEventModule,
  JsonLdBuilderModule,
  LinkModule,
  LoginRouteModule,
  LogoutModule,
  MyCouponsModule,
  MyInterestsModule,
  NavigationEventModule,
  NavigationModule,
  NotificationPreferenceModule,
  PageTitleModule,
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
  SearchBoxModule,
  SiteContextSelectorModule,
  StockNotificationModule,
  TabParagraphContainerModule,
  WishListModule,
} from '@spartacus/storefront';
import { environment } from '../../environments/environment';
import { AdministrationFeatureModule } from './features/administration-feature.module';
import { AsmFeatureModule } from './features/asm-feature.module';
import { BulkPricingFeatureModule } from './features/bulk-pricing-feature.module';
import { CdcFeatureModule } from './features/cdc-feature.module';
import { CdsFeatureModule } from './features/cds-feature.module';
import { ImportExportFeatureModule } from './features/import-export-feature.module';
import { CheckoutFeatureModule } from './features/checkout-feature.module';
import { OrderApprovalFeatureModule } from './features/order-approval-feature.module';
import { OrderFeatureModule } from './features/order-feature.module';
import { DigitalPaymentsFeatureModule } from './features/digital-payments-feature.module';
import { ProductConfiguratorRulebasedCpqFeatureModule } from './features/product-configurator-rulebased-cpq-feature.module';
import { ProductConfiguratorRulebasedFeatureModule } from './features/product-configurator-rulebased-feature.module';
import { ProductConfiguratorTextfieldFeatureModule } from './features/product-configurator-textfield-feature.module';
import { QualtricsFeatureModule } from './features/qualtrics-feature.module';
import { QuickOrderFeatureModule } from './features/quick-order-feature.module';
import { SavedCartFeatureModule } from './features/saved-cart-feature.module';
import { SmartEditFeatureModule } from './features/smartedit-feature.module';
import { StorefinderFeatureModule } from './features/storefinder-feature.module';
import { TrackingFeatureModule } from './features/tracking-feature.module';
import { UserFeatureModule } from './features/user-feature.module';
import { VariantsFeatureModule } from './features/variants-feature.module';
import { ImageZoomFeatureModule } from './features/image-zoom-feature.module';

const featureModules = [];

if (environment.b2b) {
  featureModules.push(
    AdministrationFeatureModule,
    BulkPricingFeatureModule,
    OrderApprovalFeatureModule
  );
}
if (environment.cdc) {
  featureModules.push(CdcFeatureModule);
}
if (environment.cds) {
  featureModules.push(CdsFeatureModule);
}
if (environment.cpq) {
  featureModules.push(ProductConfiguratorRulebasedCpqFeatureModule);
} else {
  featureModules.push(ProductConfiguratorRulebasedFeatureModule);
}
if (environment.digitalPayments) {
  featureModules.push(DigitalPaymentsFeatureModule);
}

@NgModule({
  imports: [
    // Auth Core
    AuthModule.forRoot(),
    LogoutModule, // will be come part of auth package
    LoginRouteModule, // will be come part of auth package

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
    PageTitleModule,
    BreadcrumbModule,

    // User Core
    UserTransitional_4_2_Module,
    UserOccTransitional_4_2_Module,
    // User UI
    AddressBookModule,
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
    ProductIntroModule,

    // Cart Core
    CartModule.forRoot(),
    CartOccModule,
    // Cart UI
    CartComponentModule,
    WishListModule,

    // Cost Center
    CostCenterOccModule,

    // Order
    OrderOccModule,

    // Page Events
    NavigationEventModule,
    HomePageEventModule,
    CartPageEventModule,
    ProductPageEventModule,

    /************************* Opt-in features *************************/

    ExternalRoutesModule.forRoot(), // to opt-in explicitly, is added by default schematics
    JsonLdBuilderModule,

    /************************* Feature libraries *************************/
    UserFeatureModule,
    CheckoutFeatureModule,
    AsmFeatureModule,
    StorefinderFeatureModule,
    QualtricsFeatureModule,
    SmartEditFeatureModule,
    TrackingFeatureModule,
    VariantsFeatureModule,
    SavedCartFeatureModule,
    OrderFeatureModule,
    QuickOrderFeatureModule,
    ImportExportFeatureModule,
    ProductConfiguratorTextfieldFeatureModule,
    ImageZoomFeatureModule,
    ...featureModules,
  ],
})
export class SpartacusFeaturesModule {}
