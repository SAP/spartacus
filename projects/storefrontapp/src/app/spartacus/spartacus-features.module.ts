/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
  SiteThemeSwitcherModule,
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
import { CartImportExportFeatureModule } from './features/cart/cart-import-export-feature.module';
import { CartQuickOrderFeatureModule } from './features/cart/cart-quick-order-feature.module';
import { CartSavedCartFeatureModule } from './features/cart/cart-saved-cart-feature.module';
import { WishListFeatureModule } from './features/cart/wish-list-feature.module';
import { CdcFeatureModule } from './features/cdc/cdc-feature.module';
import { CdsFeatureModule } from './features/cds/cds-feature.module';
import { CheckoutFeatureModule } from './features/checkout/checkout-feature.module';
import { CpqQuoteFeatureModule } from './features/cpq-quote/cpq-quote-feature.module';
import { CustomerTicketingFeatureModule } from './features/customer-ticketing/customer-ticketing-feature.module';
import { DigitalPaymentsFeatureModule } from './features/digital-payments/digital-payments-feature.module';
import { EpdVisualizationFeatureModule } from './features/epd-visualization/epd-visualization-feature.module';
import { EstimatedDeliveryDateFeatureModule } from './features/estimated-delivery-date/estimated-delivery-date-feature.module';
import { OmfFeatureModule } from './features/omf/omf-feature.module';
import { OpfFeatureModule } from './features/opf/opf-feature.module';
import { OppsFeatureModule } from './features/opps/opps-feature.module';
import { OrderDocumentFlowFeatureModule } from './features/order/order-document-flow-feature.module';
import { OrderFeatureModule } from './features/order/order-feature.module';
import { AccountSummaryFeatureModule } from './features/organization/organization-account-summary-feature.module';
import { AdministrationFeatureModule } from './features/organization/organization-administration-feature.module';
import { OrderApprovalFeatureModule } from './features/organization/organization-order-approval-feature.module';
import { UnitOrderFeatureModule } from './features/organization/organization-unit-order-feature.module';
import { PDFInvoicesFeatureModule } from './features/pdf-invoices/pdf-invoices-feature.module';
import { PickupInStoreFeatureModule } from './features/pickup-in-store/pickup-in-store-feature.module';
import { ProductConfiguratorRulebasedFeatureModule } from './features/product-configurator/product-configurator-rulebased-feature.module';
import { ProductConfiguratorTextfieldFeatureModule } from './features/product-configurator/product-configurator-textfield-feature.module';
import { ProductMultiDimensionalListFeatureModule } from './features/product-multi-dimensional/product-multi-dimensional-list-feature.module';
import { ProductMultiDimensionalSelectorFeatureModule } from './features/product-multi-dimensional/product-multi-dimensional-selector-feature.module';
import { BulkPricingFeatureModule } from './features/product/product-bulk-pricing-feature.module';
import { FutureStockFeatureModule } from './features/product/product-future-stock-feature.module';
import { ProductImageZoomFeatureModule } from './features/product/product-image-zoom-feature.module';
import { ProductVariantsFeatureModule } from './features/product/product-variants-feature.module';
import { PunchoutFeatureModule } from './features/punchout/punchout-feature.module';
import { QualtricsFeatureModule } from './features/qualtrics/qualtrics-feature.module';
import { QuoteFeatureModule } from './features/quote-feature.module';
import { OrganizationUserRegistrationFeatureModule } from './features/registration-feature.module';
import { RequestedDeliveryDateFeatureModule } from './features/requested-delivery-date/requested-delivery-date-feature.module';
import { S4ServiceFeatureModule } from './features/s4-service/s4-service-feature.module';
import { S4OMFeatureModule } from './features/s4om/s4om-feature.module';
import { SegmentRefsFeatureModule } from './features/segment-refs/segment-refs-feature.module';
import { SmartEditFeatureModule } from './features/smartedit/smartedit-feature.module';
import { StoreFinderFeatureModule } from './features/storefinder/storefinder-feature.module';
import { SubscriptionBillingFeatureModule } from './features/subscription-billing/subscription-billing-feature.module';
import { PersonalizationFeatureModule } from './features/tracking/personalization-feature.module';
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
if (environment.s4Service) {
  featureModules.push(S4ServiceFeatureModule);
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
if (environment.opps) {
  featureModules.push(OppsFeatureModule);
}
if (environment.s4om) {
  featureModules.push(S4OMFeatureModule);
}
if (environment.opf) {
  featureModules.push(OpfFeatureModule);
}
if (environment.punchout) {
  featureModules.push(PunchoutFeatureModule);
}
if (environment.segmentRefs) {
  featureModules.push(SegmentRefsFeatureModule);
}
if (environment.requestedDeliveryDate) {
  featureModules.push(RequestedDeliveryDateFeatureModule);
}
if (environment.estimatedDeliveryDate) {
  featureModules.push(EstimatedDeliveryDateFeatureModule);
}
if (environment.omf) {
  featureModules.push(OmfFeatureModule);
}
if (environment.cpq) {
  featureModules.push(CpqQuoteFeatureModule);
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
    SiteThemeSwitcherModule,

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
    CartSavedCartFeatureModule,
    CartQuickOrderFeatureModule,
    CartImportExportFeatureModule,

    OrderFeatureModule,
    OrderDocumentFlowFeatureModule,

    CheckoutFeatureModule,

    PersonalizationFeatureModule,

    AsmFeatureModule,
    AsmCustomer360FeatureModule,

    StoreFinderFeatureModule,

    QualtricsFeatureModule,

    SmartEditFeatureModule,

    ProductVariantsFeatureModule,
    ProductMultiDimensionalSelectorFeatureModule,
    ProductMultiDimensionalListFeatureModule,
    ProductImageZoomFeatureModule,

    QuoteFeatureModule,
    CustomerTicketingFeatureModule,

    ProductConfiguratorTextfieldFeatureModule,
    ProductConfiguratorRulebasedFeatureModule,
    SubscriptionBillingFeatureModule,
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
    provideFeatureTogglesFactory(() => {
      const appFeatureToggles: Required<FeatureToggles> = {
        improvedTabStyling: true,
        alignNavigationMenuWithHeader: true,
        a11yKeyboardAccessibleZoom: true,
        a11yPreventCartItemsFormRedundantRecreation: true,
        a11yStoreFinderLabel: true,
        a11yStoreFinderFocusOnBackButton: true,
        a11yB2BRegisterComponent: true,
        a11yIncreaseContastGlobalMessageCloseButton: true,
        a11yLinkBtnsToTertiaryBtns: true,
        a11yAddPaddingToCarouselPanel: true,
        dispatchLoginActionOnlyWhenTokenReceived: true,
        a11yNgSelectUnicodeCarets: true,
        productListItemSummaryReadMore: true,
        productReviewCharactersLeft: true,
        a11yFutureStockAccordionAriaControls: true,
        productCarouselScrolling: true,
        cdsLoginEventsToken: true,
        lazyLoadImagesByDefault: true,
        incrementProcessesCountForMergeCart: true,
        authorizationCodeFlowByDefault: true,
        navigationMenuCloseOnSameLinkClick: true,
        enablePasswordExpiredErrorTranslation: true,
        enableQuotePurchaseOrderNumber: true,
        enableReturnOrderReturnableQuantityConsigmentFallback: true,
        enableMediaPrefix: true,
        a11yCustomerTicketingVisualFocusFix: true,
        a11yStoreFinderListItemFocus: true,
        a11yFixSearchBoxDoubleFocus: true,
        a11yFacetFilterByLabel: true,
        removeDuplicatedOrderHistoryHeader: true,
        a11yCardNotificationMessage: true,
        searchBoxRecentSearchesRemoval: true,
        cdsBottomHeaderSlotAdjustPosition: true,
        enableB2BUnitSearch: true,
        enableB2BCostCenterSearch: true,
        enableB2BCustomerSearch: true,
        a11yCarouselPreventNavigationFocus: true,
        a11yNgSelectReadonlyInputValue: true,
        a11yPasswordVisibilityToggle: true,
        a11yPreventWindowsHighContrastOverride: true,
        a11yQuickOrderResetFocus: true,
        showOnlyActiveCurrencies: true,
        a11yAddedToCartDialogHeading: true,
        a11yListSemanticsForFacets: true,
        a11yFilteredFacetAnnouncement: true,
        a11yCartItemListHideEmptyOutlets: true,
        a11yReviewsKeyboardControls: true,
        a11yCartQuickOrderFormEnableSubmitAndAddValidation: true,
        a11yConsentManagementFocusPreservation: true,
        a11yDeliveryModeFocusPreservation: true,
        a11yVocalizeDropdownItemCount: true,
        a11yRestoreFocusOnNgSelect: true,
        a11yKeepFocusOnConsentManagementButtons: true,
        useEnhancedSecurePasswordValidators: true,
        enableRemoveVoucherEndpoint: true,
        showSortFieldsOnlyAtTop: true,
        showRequiredAsterisks: true,
        enableExpiredRefreshTokenHandlers: true,
        enableCartReloadOnContextChange: true,
        a11yCouponNotificationChannelsLinkStyling: true,
        a11ySiteContextCaretClick: true,
        opfPaymentVerificationCheckProcessingCartOnErrorOnly: true,
        authorizationCodeFlowByDefaultCsrfTokenRefresh: true,
        redirectOnlyOnTrueNavigationEnd: true,
        pageLinkSanitizeCanonicalUrl: true,
        opfUseDestroyRef: true,
        enableHierarchicalAddressFormat: true,
        opfCheckoutUseUpdatePaymentTransaction: true,
        a11yRegistrationTermsAsteriskMargin: true,
        a11yAddToWishListBtnMargin: true,
        a11yProductListItemNameMargin: true,
        propagateLogoutToAllTabs: true,
        asyncAuthConfigInitializer: false as boolean, // exception until sample data is updated
        siteIsolationForCustomLoginPage: true,
        applyBaseSiteThemeFromCms: true,
        b2bCheckoutShippingAddressFilter: true,
      };
      return appFeatureToggles;
    }),
  ],
})
export class SpartacusFeaturesModule {}
