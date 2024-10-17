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
import { CheckoutFeatureModule } from './features/checkout/checkout-feature.module';
import { OrderFeatureModule } from './features/order/order-feature.module';
import { VariantsFeatureModule } from './features/product/product-variants-feature.module';
import { SmartEditFeatureModule } from './features/smartedit/smartedit-feature.module';
import { StorefinderFeatureModule } from './features/storefinder/storefinder-feature.module';
import { TrackingFeatureModule } from './features/tracking/tracking-feature.module';
import { UserFeatureModule } from './features/user/user-feature.module';

// const featureModules = [];

// if (environment.b2b) {
//   featureModules.push(
//     AdministrationFeatureModule,
//     AccountSummaryFeatureModule,
//     BulkPricingFeatureModule,
//     OrderApprovalFeatureModule,
//     OrganizationUserRegistrationFeatureModule,
//     UnitOrderFeatureModule,
//     FutureStockFeatureModule
//   );
// } else {
//   featureModules.push(PickupInStoreFeatureModule);
// }

// if (environment.cdc) {
//   featureModules.push(CdcFeatureModule);
// }
// if (environment.s4Service) {
//   featureModules.push(S4ServiceFeatureModule);
// }
// if (environment.cds) {
//   featureModules.push(CdsFeatureModule);
// }
// if (environment.digitalPayments) {
//   featureModules.push(DigitalPaymentsFeatureModule);
// }
// if (environment.epdVisualization) {
//   featureModules.push(EpdVisualizationFeatureModule);
// }
// if (environment.pdfInvoices) {
//   featureModules.push(PDFInvoicesFeatureModule);
// }
// if (environment.opps) {
//   featureModules.push(OppsFeatureModule);
// }
// if (environment.s4om) {
//   featureModules.push(S4OMFeatureModule);
// }
// if (environment.segmentRefs) {
//   featureModules.push(SegmentRefsFeatureModule);
// }
// if (environment.requestedDeliveryDate) {
//   featureModules.push(RequestedDeliveryDateFeatureModule);
// }
// if (environment.estimatedDeliveryDate) {
//   featureModules.push(EstimatedDeliveryDateFeatureModule);
// }
// if (environment.omf) {
//   featureModules.push(OmfFeatureModule);
// }
// if (environment.cpq) {
//   featureModules.push(CpqQuoteFeatureModule);
// }
@NgModule({
  imports: [
    // SPIKE - OLD, ORIGINAL:

    // // Auth Core
    // AuthModule.forRoot(),
    // LogoutModule, // will be come part of auth package
    // LoginRouteModule, // will be come part of auth package

    // // Basic Cms Components
    // HamburgerMenuModule,
    // SiteContextSelectorModule,
    // LinkModule,
    // BannerModule,
    // CmsParagraphModule,
    // TabParagraphContainerModule,
    // BannerCarouselModule,
    // CategoryNavigationModule,
    // NavigationModule,
    // FooterNavigationModule,
    // PageTitleModule,
    // BreadcrumbModule,
    // PDFModule,
    // ScrollToTopModule,
    // VideoModule,
    // SiteThemeSwitcherModule,

    // // User Core
    // UserModule,
    // UserOccModule,
    // // User UI
    // PaymentMethodsModule,
    // NotificationPreferenceModule,
    // MyInterestsModule,
    // MyAccountV2Module,
    // StockNotificationModule,
    // ConsentManagementModule,
    // MyCouponsModule,

    // // Anonymous Consents Core
    // AnonymousConsentsModule.forRoot(),
    // // Anonymous Consents UI
    // AnonymousConsentsDialogModule,
    // AnonymousConsentManagementBannerModule,

    // // Product Core
    // ProductModule.forRoot(),
    // ProductOccModule,

    // // Product UI
    // ProductDetailsPageModule,
    // ProductListingPageModule,
    // ProductListModule,
    // SearchBoxModule,
    // ProductFacetNavigationModule,
    // ProductTabsModule,
    // ProductCarouselModule,
    // ProductReferencesModule,
    // ProductImagesModule,
    // ProductSummaryModule,
    // ProductIntroModule,

    // // Cost Center
    // CostCenterOccModule,

    // // Page Events
    // NavigationEventModule,
    // HomePageEventModule,
    // ProductPageEventModule,

    // /************************* Opt-in features *************************/

    // ExternalRoutesModule.forRoot(), // to opt-in explicitly, is added by default schematics
    // JsonLdBuilderModule,

    // /************************* Feature libraries *************************/
    // UserFeatureModule,

    // CartBaseFeatureModule,
    // WishListFeatureModule,
    // SavedCartFeatureModule,
    // QuickOrderFeatureModule,
    // ImportExportFeatureModule,

    // OrderFeatureModule,

    // CheckoutFeatureModule,

    // TrackingFeatureModule,

    // AsmFeatureModule,
    // AsmCustomer360FeatureModule,

    // StorefinderFeatureModule,

    // QualtricsFeatureModule,

    // SmartEditFeatureModule,

    // VariantsFeatureModule,
    // ProductMultiDimensionalSelectorFeatureModule,
    // ProductMultiDimensionalListFeatureModule,
    // ImageZoomFeatureModule,

    // QuoteFeatureModule,
    // CustomerTicketingFeatureModule,

    // ProductConfiguratorTextfieldFeatureModule,
    // ProductConfiguratorRulebasedFeatureModule,
    // ...featureModules,

    // SPIKE NEW - COPIED FROM A FRESH APP:
    AuthModule.forRoot(),
    LogoutModule,
    LoginRouteModule,
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
    ScrollToTopModule,
    PageTitleModule,
    VideoModule,
    PDFModule,
    UserModule,
    UserOccModule,
    PaymentMethodsModule,
    NotificationPreferenceModule,
    MyInterestsModule,
    MyAccountV2Module,
    StockNotificationModule,
    ConsentManagementModule,
    MyCouponsModule,
    AnonymousConsentsModule.forRoot(),
    AnonymousConsentsDialogModule,
    AnonymousConsentManagementBannerModule,
    ProductModule.forRoot(),
    ProductOccModule,
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
    CostCenterOccModule,
    NavigationEventModule,
    HomePageEventModule,
    ProductPageEventModule,
    ExternalRoutesModule.forRoot(),
    UserFeatureModule,
    CartBaseFeatureModule,

    // CartSavedCartFeatureModule,
    SavedCartFeatureModule, /// our replacement for a module from fresh app

    WishListFeatureModule,

    // CartQuickOrderFeatureModule,
    QuickOrderFeatureModule, /// our replacement for a module from fresh app

    // CartImportExportFeatureModule,
    ImportExportFeatureModule, /// our replacement for a module from fresh app

    OrderFeatureModule,
    CheckoutFeatureModule,

    // PersonalizationFeatureModule,
    TrackingFeatureModule, /// our replacement for a module from fresh app

    // StoreFinderFeatureModule,
    StorefinderFeatureModule,

    AsmFeatureModule,
    AsmCustomer360FeatureModule,
    SmartEditFeatureModule,

    // ProductVariantsFeatureModule,
    VariantsFeatureModule, /// our replacement for a module from fresh app

    // ProductImageZoomFeatureModule,
    AsmFeatureModule, /// our replacement for a module from fresh app
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
        showDeliveryOptionsTranslation: true,
        formErrorsDescriptiveMessages: true,
        showSearchingCustomerByOrderInASM: false,
        showStyleChangesInASM: false,
        shouldHideAddToCartForUnpurchasableProducts: false,
        useExtractedBillingAddressComponent: false,
        showBillingAddressInDigitalPayments: false,
        showDownloadProposalButton: false,
        showPromotionsInPDP: false,
        recentSearches: true,
        trendingSearches: false,
        pdfInvoicesSortByInvoiceDate: true,
        storeFrontLibCardParagraphTruncated: true,
        useProductCarouselBatchApi: true,
        productConfiguratorAttributeTypesV2: true,
        propagateErrorsToServer: true,
        ssrStrictErrorHandlingForHttpAndNgrx: true,
        productConfiguratorDeltaRendering: true,
        a11yRequiredAsterisks: true,
        a11yQuantityOrderTabbing: true,
        a11yNavigationUiKeyboardControls: true,
        a11yNavMenuExpandStateReadout: true,
        a11yOrderConfirmationHeadingOrder: true,
        a11yStarRating: true,
        a11yViewChangeAssistiveMessage: true,
        a11yPreventHorizontalScroll: true,
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
        a11yCartImportConfirmationMessage: true,
        a11yReplenishmentOrderFieldset: true,
        a11yListOversizedFocus: true,
        a11yStoreFinderOverflow: true,
        a11yMobileFocusOnFirstNavigationItem: true,
        a11yCartSummaryHeadingOrder: true,
        a11ySearchBoxMobileFocus: true,
        a11yFacetKeyboardNavigation: true,
        a11yUnitsListKeyboardControls: true,
        a11yCartItemsLinksStyles: true,
        a11yHideSelectBtnForSelectedAddrOrPayment: true,
        a11yFocusableCarouselControls: true,
        a11yUseTrapTabInsteadOfTrapInDialogs: true,
        cmsGuardsServiceUseGuardsComposer: true,
        cartQuickOrderRemoveListeningToFailEvent: true,
        a11yKeyboardAccessibleZoom: true,
        a11yOrganizationLinkableCells: true,
        a11yPreventSRFocusOnHiddenElements: true,
        a11yVisibleFocusOverflows: true,
        a11yTruncatedTextForResponsiveView: true,
        a11ySemanticPaginationLabel: true,
        a11yPreventCartItemsFormRedundantRecreation: true,
        a11yMyAccountLinkOutline: true,
        a11yCloseProductImageBtnFocus: true,
        a11yNotificationPreferenceFieldset: true,
        a11yImproveContrast: true,
        a11yEmptyWishlistHeading: true,
        a11yScreenReaderBloatFix: true,
        a11yUseButtonsForBtnLinks: true,
        a11yTabComponent: true,
        a11yCarouselArrowKeysNavigation: true,
        a11yNotificationsOnConsentChange: true,
        a11yDisabledCouponAndQuickOrderActionButtonsInsteadOfRequiredFields:
          true,
        a11yFacetsDialogFocusHandling: true,
        a11yStoreFinderAlerts: true,
        a11yFormErrorMuteIcon: true,
        a11yCxMessageFocus: true,
        occCartNameAndDescriptionInHttpRequestBody: true,
        a11yLinkBtnsToTertiaryBtns: true,
        a11yRepeatedPageTitleFix: true,
        a11yDeliveryModeRadiogroup: true,
        a11yNgSelectOptionsCount: true,
        a11yRepeatedCancelOrderError: true,
        a11yAddedToCartActiveDialog: true,
        a11yNgSelectMobileReadout: true,
        a11yDeliveryMethodFieldset: true,
        a11yShowMoreReviewsBtnFocus: true,
        a11yQuickOrderAriaControls: true,
        a11yRemoveStatusLoadedRole: true,
        a11yDialogsHeading: true,
        a11yDialogTriggerRefocus: true,
        a11yAddToWishlistFocus: true,
        a11ySearchBoxFocusOnEscape: true,
        cmsBottomHeaderSlotUsingFlexStyles: true,
        useSiteThemeService: false,
        enableConsecutiveCharactersPasswordRequirement: true,
        enablePasswordsCannotMatchInPasswordUpdateForm: true,
        allPageMetaResolversEnabledInCsr: true,
      };
      return appFeatureToggles;
    }),
  ],
})
export class SpartacusFeaturesModule {}
