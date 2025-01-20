/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import { QualtricsFeatureModule } from './features/qualtrics/qualtrics-feature.module';
import { QuoteFeatureModule } from './features/quote-feature.module';
import { OrganizationUserRegistrationFeatureModule } from './features/registration-feature.module';
import { RequestedDeliveryDateFeatureModule } from './features/requested-delivery-date/requested-delivery-date-feature.module';
import { S4ServiceFeatureModule } from './features/s4-service/s4-service-feature.module';
import { S4OMFeatureModule } from './features/s4om/s4om-feature.module';
import { SegmentRefsFeatureModule } from './features/segment-refs/segment-refs-feature.module';
import { SmartEditFeatureModule } from './features/smartedit/smartedit-feature.module';
import { StoreFinderFeatureModule } from './features/storefinder/storefinder-feature.module';
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
        showDeliveryOptionsTranslation: true,
        formErrorsDescriptiveMessages: true,
        showSearchingCustomerByOrderInASM: false,
        showStyleChangesInASM: false,
        shouldHideAddToCartForUnpurchasableProducts: false,
        useExtractedBillingAddressComponent: false,
        showBillingAddressInDigitalPayments: false,
        showDownloadProposalButton: false,
        showPromotionsInPDP: false,
        searchBoxV2: false,
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
        a11yUseProperTextColorForFutureStockAccordion: true,
        a11yNavMenuExpandStateReadout: true,
        a11yOrderConfirmationHeadingOrder: true,
        a11yStarRating: true,
        a11yViewChangeAssistiveMessage: true,
        a11yPreventHorizontalScroll: true,
        a11yReorderDialog: true,
        a11yPopoverFocus: true,
        a11yPopoverHighContrast: true,
        a11yTabsManualActivation: true,
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
        a11yAnonymousConsentMessageInDialog: true,
        a11yReplenishmentOrderFieldset: true,
        a11yListOversizedFocus: true,
        a11yStoreFinderOverflow: true,
        a11yMobileFocusOnFirstNavigationItem: true,
        a11yQuickOrderSearchListKeyboardNavigation: false,
        a11yCartSummaryHeadingOrder: true,
        a11ySearchBoxMobileFocus: true,
        a11yFacetKeyboardNavigation: true,
        a11yUnitsListKeyboardControls: true,
        a11ySearchboxLabel: true,
        a11yCartItemsLinksStyles: true,
        a11yStyleExternalLinksAsLinks: true,
        a11yHideSelectBtnForSelectedAddrOrPayment: true,
        a11ySelectLabelWithContextForSelectedAddrOrPayment: true,
        a11yFocusableCarouselControls: true,
        a11yUseTrapTabInsteadOfTrapInDialogs: true,
        cmsGuardsServiceUseGuardsComposer: true,
        cartQuickOrderRemoveListeningToFailEvent: true,
        a11yKeyboardAccessibleZoom: true,
        a11yOrganizationLinkableCells: true,
        a11yPreventSRFocusOnHiddenElements: true,
        a11yVisibleFocusOverflows: true,
        a11yTruncatedTextForResponsiveView: true,
        a11yTruncatedTextStoreFinder: true,
        a11yTruncatedTextUnitLevelOrderHistory: true,
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
        a11yPickupOptionsTabs: true,
        a11yNotificationsOnConsentChange: true,
        a11yDisabledCouponAndQuickOrderActionButtonsInsteadOfRequiredFields:
          true,
        a11yFacetsDialogFocusHandling: true,
        a11yResetFocusAfterNavigating: true,
        headerLayoutForSmallerViewports: true,
        a11yStoreFinderAlerts: true,
        a11yFormErrorMuteIcon: true,
        a11yStoreFinderLabel: true,
        a11yCxMessageFocus: true,
        occCartNameAndDescriptionInHttpRequestBody: true,
        a11yLinkBtnsToTertiaryBtns: true,
        a11yRepeatedPageTitleFix: true,
        a11yDeliveryModeRadiogroup: true,
        /**
         * Defaults to false cause ng-select options ariaLabels are working as expected
         * since Spartacus 2211.33
         * TODO: CXSPA-9005: Remove this flag and related code in next major release
         */
        a11yNgSelectOptionsCount: false,
        a11yNgSelectCloseDropdownOnEscape: true,
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
        a11yUpdatingCartNoNarration: true,
        a11yPasswordVisibliltyBtnValueOverflow: true,
        a11yItemCounterFocus: true,
        a11yScrollToReviewByShowReview: true,
        a11yViewHoursButtonIconContrast: true,
        a11yStoreInStockIconContrast: true,
        a11yCheckoutStepsLandmarks: true,
        a11yQTY2Quantity: true,
        a11yImproveButtonsInCardComponent: true,
        a11yMiniCartFocusOnMobile: true,
        a11yApprovalProcessWithNoClearable: true,
        a11yPostRegisterSuccessMessage: true,
        a11yDeleteButton2First: true,
        a11yShowLabelOfSelect: true,
        a11yShowDownArrowOnFocusedSelectMenu: true,
        a11yCroppedFocusRing: true,
        a11yTextSpacingAdjustments: true,
        a11yTableHeaderReadout: true,
        a11ySearchboxAssistiveMessage: true,
        updateConsentGivenInOnChanges: true,
        a11yDifferentiateFocusedAndSelected: true,
        a11yQuickOrderSearchBoxRefocusOnClose: true,
        a11yKeyboardFocusInSearchBox: true,
        a11yAddPaddingToCarouselPanel: true,
        a11yFocusOnCardAfterSelecting: true,
        a11ySearchableDropdownFirstElementFocus: true,
        a11yHideConsentButtonWhenBannerVisible: true,
        a11yRepeatingButtonsUniqueLabels: true,
        a11yHighContrastBorders: true,
        cmsBottomHeaderSlotUsingFlexStyles: true,
        useSiteThemeService: true,
        enableConsecutiveCharactersPasswordRequirement: true,
        enablePasswordsCannotMatchInPasswordUpdateForm: true,
        allPageMetaResolversEnabledInCsr: true,
        a11yPdpGridArrangement: true,
        a11yHamburgerMenuTrapFocus: true,
        useExtendedMediaComponentConfiguration: true,
        showRealTimeStockInPDP: false,
        a11yScrollToTopPositioning: false,
        a11yWrapReviewOrderInSection: true,
        enableCarouselCategoryProducts: true,
        enableSecurePasswordValidation: true,
        enableClaimCustomerCouponWithCodeInRequestBody: false,
      };
      return appFeatureToggles;
    }),
  ],
})
export class SpartacusFeaturesModule {}
