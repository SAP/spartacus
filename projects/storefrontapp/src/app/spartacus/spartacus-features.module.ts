/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  AnonymousConsentsModule,
  AuthModule,
  CostCenterOccModule,
  ExternalRoutesModule,
  FeatureToggles,
  ProductModule,
  ProductOccModule,
  UserModule,
  UserOccModule,
  provideFeatureTogglesFactory,
} from '@spartacus/core';
import {
  AnonymousConsentManagementBannerModule,
  AnonymousConsentsDialogModule,
  BannerCarouselModule,
  BannerModule,
  BreadcrumbModule,
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
  MyAccountV2Module,
  MyCouponsModule,
  MyInterestsModule,
  NavigationEventModule,
  NavigationModule,
  NotificationPreferenceModule,
  PDFModule,
  PageTitleModule,
  PaymentMethodsModule,
  ProductCarouselModule,
  ProductDetailsPageModule,
  ProductFacetNavigationModule,
  ProductImagesModule,
  ProductIntroModule,
  ProductListModule,
  ProductListingPageModule,
  ProductPageEventModule,
  ProductReferencesModule,
  ProductSummaryModule,
  ProductTabsModule,
  ScrollToTopModule,
  SearchBoxModule,
  SiteContextSelectorModule,
  StockNotificationModule,
  TabParagraphContainerModule,
  USE_MY_ACCOUNT_V2_CONSENT,
  USE_MY_ACCOUNT_V2_NOTIFICATION_PREFERENCE,
  VideoModule,
} from '@spartacus/storefront';
import { environment } from '../../environments/environment';
import { AsmCustomer360FeatureModule } from './features/asm/asm-customer-360-feature.module';
import { AsmFeatureModule } from './features/asm/asm-feature.module';
import { CartBaseFeatureModule } from './features/cart/cart-base-feature.module';
import { ImportExportFeatureModule } from './features/cart/cart-import-export-feature.module';
import { QuickOrderFeatureModule } from './features/cart/cart-quick-order-feature.module';
import { SavedCartFeatureModule } from './features/cart/cart-saved-cart-feature.module';
import { WishListFeatureModule } from './features/cart/wish-list-feature.module';
import { CdcFeatureModule } from './features/cdc/cdc-feature.module';
import { CdsFeatureModule } from './features/cds/cds-feature.module';
import { CheckoutFeatureModule } from './features/checkout/checkout-feature.module';
import { CustomerTicketingFeatureModule } from './features/customer-ticketing/customer-ticketing-feature.module';
import { DigitalPaymentsFeatureModule } from './features/digital-payments/digital-payments-feature.module';
import { EpdVisualizationFeatureModule } from './features/epd-visualization/epd-visualization-feature.module';
import { OrderFeatureModule } from './features/order/order-feature.module';
import { AccountSummaryFeatureModule } from './features/organization/organization-account-summary-feature.module';
import { AdministrationFeatureModule } from './features/organization/organization-administration-feature.module';
import { OrderApprovalFeatureModule } from './features/organization/organization-order-approval-feature.module';
import { UnitOrderFeatureModule } from './features/organization/organization-unit-order-feature.module';
import { PDFInvoicesFeatureModule } from './features/pdf-invoices/pdf-invoices-feature.module';
import { PickupInStoreFeatureModule } from './features/pickup-in-store/pickup-in-store-feature.module';
import { ProductConfiguratorRulebasedFeatureModule } from './features/product-configurator/product-configurator-rulebased-feature.module';
import { ProductConfiguratorTextfieldFeatureModule } from './features/product-configurator/product-configurator-textfield-feature.module';
import { BulkPricingFeatureModule } from './features/product/product-bulk-pricing-feature.module';
import { FutureStockFeatureModule } from './features/product/product-future-stock-feature.module';
import { ImageZoomFeatureModule } from './features/product/product-image-zoom-feature.module';
import { VariantsFeatureModule } from './features/product/product-variants-feature.module';
import { QualtricsFeatureModule } from './features/qualtrics/qualtrics-feature.module';
import { QuoteFeatureModule } from './features/quote-feature.module';
import { OrganizationUserRegistrationFeatureModule } from './features/registration-feature.module';
import { RequestedDeliveryDateFeatureModule } from './features/requested-delivery-date/requested-delivery-date-feature.module';
import { S4OMFeatureModule } from './features/s4om/s4om-feature.module';
import { SegmentRefsFeatureModule } from './features/segment-refs/segment-refs-feature.module';
import { SmartEditFeatureModule } from './features/smartedit/smartedit-feature.module';
import { StorefinderFeatureModule } from './features/storefinder/storefinder-feature.module';
import { TrackingFeatureModule } from './features/tracking/tracking-feature.module';
import { UserFeatureModule } from './features/user/user-feature.module';

const featureModules = [];

if (environment.b2b) {
  featureModules.push(
    AdministrationFeatureModule,
    AccountSummaryFeatureModule,
    BulkPricingFeatureModule,
    OrderApprovalFeatureModule,
    OrganizationUserRegistrationFeatureModule,
    UnitOrderFeatureModule,
    FutureStockFeatureModule
  );
} else {
  featureModules.push(PickupInStoreFeatureModule);
}

if (environment.cdc) {
  featureModules.push(CdcFeatureModule);
}

if (environment.cds) {
  featureModules.push(CdsFeatureModule);
}
if (environment.digitalPayments) {
  featureModules.push(DigitalPaymentsFeatureModule);
}
if (environment.epdVisualization) {
  featureModules.push(EpdVisualizationFeatureModule);
}
if (environment.pdfInvoices) {
  featureModules.push(PDFInvoicesFeatureModule);
}
if (environment.s4om) {
  featureModules.push(S4OMFeatureModule);
}
if (environment.segmentRefs) {
  featureModules.push(SegmentRefsFeatureModule);
}
if (environment.requestedDeliveryDate) {
  featureModules.push(RequestedDeliveryDateFeatureModule);
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
    PDFModule,
    ScrollToTopModule,
    VideoModule,

    // User Core
    UserModule,
    UserOccModule,
    // User UI
    PaymentMethodsModule,
    NotificationPreferenceModule,
    MyInterestsModule,
    MyAccountV2Module,
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

    // Cost Center
    CostCenterOccModule,

    // Page Events
    NavigationEventModule,
    HomePageEventModule,
    ProductPageEventModule,

    /************************* Opt-in features *************************/

    ExternalRoutesModule.forRoot(), // to opt-in explicitly, is added by default schematics
    JsonLdBuilderModule,

    /************************* Feature libraries *************************/
    UserFeatureModule,

    CartBaseFeatureModule,
    WishListFeatureModule,
    SavedCartFeatureModule,
    QuickOrderFeatureModule,
    ImportExportFeatureModule,

    OrderFeatureModule,

    CheckoutFeatureModule,

    TrackingFeatureModule,

    AsmFeatureModule,
    AsmCustomer360FeatureModule,

    StorefinderFeatureModule,

    QualtricsFeatureModule,

    SmartEditFeatureModule,

    VariantsFeatureModule,
    ImageZoomFeatureModule,

    QuoteFeatureModule,
    CustomerTicketingFeatureModule,

    ProductConfiguratorTextfieldFeatureModule,
    ProductConfiguratorRulebasedFeatureModule,
    ...featureModules,
  ],
  providers: [
    // Adding the provider here because consents feature is not code-splitted to separate library and not lazy-loaded
    {
      provide: USE_MY_ACCOUNT_V2_CONSENT,
      useValue: environment.myAccountV2,
    },
    {
      provide: USE_MY_ACCOUNT_V2_NOTIFICATION_PREFERENCE,
      useValue: environment.myAccountV2,
    },
    // CXSPA-6793: refactor to`provideFeatureToggles` and `satisfies` keyword
    provideFeatureTogglesFactory(() => {
      const appFeatureToggles: Required<FeatureToggles> = {
        showPromotionsInPDP: false,
        recentSearches: false,
        pdfInvoicesSortByInvoiceDate: false,
        storeFrontLibCardParagraphTruncated: true,
        productConfiguratorAttributeTypesV2: true,
        strictHttpAndNgrxErrorHandling: true,
        a11yRequiredAsterisks: true,
        a11yQuantityOrderTabbing: true,
        a11yNavigationUiKeyboardControls: true,
        a11yOrderConfirmationHeadingOrder: true,
        a11yStarRating: true,
        a11yViewChangeAssistiveMessage: true,
        a11yReorderDialog: true,
        a11yPopoverFocus: true,
        a11yScheduleReplenishment: true,
        a11yScrollToTop: true,
        a11ySavedCartsZoom: true,
        a11ySortingOptionsTruncation: true,
        a11yExpandedFocusIndicator: true,
        a11yCheckoutDeliveryFocus: true,
        a11yMobileVisibleFocus: true,
        a11yOrganizationsBanner: true,
        a11yOrganizationListHeadingOrder: true,
        a11yReplenishmentOrderFieldset: true,
        a11yListOversizedFocus: true,
        a11yStoreFinderOverflow: true,
        a11yCartSummaryHeadingOrder: true,
      };
      return appFeatureToggles;
    }),
  ],
})
export class SpartacusFeaturesModule { }
