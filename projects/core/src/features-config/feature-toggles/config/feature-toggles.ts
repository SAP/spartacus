/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// Let's NOT add here any wildcard property like
//  `[key: string]: boolean | undefined;`
// We want this interface to be STRICT and cause a compilation error when a removed property is used.
// Thanks to that, customers using a property that was recently removed, will know they have to adapt their code.
export interface FeatureTogglesInterface {
  /**
   * In 'ProductListItemComponent' and 'ProductGridItemComponent', it hides the 'Add to cart' button
   * when a product does not have a defined price or its purchasable field is set to false
   */
  shouldHideAddToCartForUnpurchasableProducts?: boolean;

  /**
   * In `FormErrorsComponent` it uses more descriptive validation error messages
   * in all UI form fields existing before v2211.25.
   *
   * 1. The `FormErrorsComponent` uses new i18n keys:
   * `formErrors.labeled.<validatorName>` instead of `formErrors.<validatorName>`,
   * for example `formErrors.labeled.required` instead of `formErrors.required`.
   *
   * 2. The existing usages of `CustomFormValidators.passwordValidator` are replaced with
   * an array of new, more specific validators `CustomFormValidators.passwordValidators`
   * (with the plural `...Validators`)
   */
  formErrorsDescriptiveMessages?: boolean;

  /**
   * In `CheckoutPaymentFormComponent`, use the extracted billing address component instead of embedded billing address form.
   */
  useExtractedBillingAddressComponent?: boolean;

  /**
   * In `DpPaymentCallbackComponent` it shows the billing address form.
   */
  showBillingAddressInDigitalPayments?: boolean;

  /**
   * In `QuoteLinksComponent` it shows the download button.
   * API for this button is available in commerce 2211.16 and above
   */
  showDownloadProposalButton?: boolean;

  /**
   * In `ProductSummaryComponent` it shows the promotions info.
   */
  showPromotionsInPDP?: boolean;

  /**
   * In `ASM` it shows searching customer by order ID.
   */
  showSearchingCustomerByOrderInASM?: boolean;

  /**
   * In `SearchBoxComponent` it shows the recent searches.
   */
  recentSearches?: boolean;

  /**
   * In `InvoicesListComponent` it sorts invoices by the date of the invoice itself.
   * Previously the sorting was done by the date of creating an invoice entry.
   */
  pdfInvoicesSortByInvoiceDate?: boolean;

  /**
   * In `CardComponent` it truncates the paragraph text
   * (analogically to the existing truncating of the label).
   */
  storeFrontLibCardParagraphTruncated?: boolean;

  /**
   * In `ConfiguratorAttributeDropDownComponent`, `ConfiguratorAttributeSingleSelectionImageComponent`
   * and in 'ConfiguratorAttributeMultiSelectionImageComponent' some HTML changes were done
   * to render read-only attribute with images and a long description at the value level accordingly.
   *
   * In `cx-configurator-price`, `cx-configurator-show-more`,`cx-configurator-attribute-drop-down`,
   * `cx-configurator-attribute-selection-image`, `cx-configurator-attribute-single-selection-bundle-dropdown`,
   * `cx-configurator-attribute-type` and `cx-configurator-form-group` some styling changes were done
   * to render read-only attribute with images and a long description at the value level accordingly.
   */
  productConfiguratorAttributeTypesV2?: boolean;

  /**
   * Adds asterisks to required form fields in all components existing before v2211.20
   */
  a11yRequiredAsterisks?: boolean;

  /**
   * In `QuantityCounterComponent` the numeric input is no longer made focused
   * after an increment/decrement button is clicked.
   */
  a11yQuantityOrderTabbing?: boolean;

  /**
   * Improves keyboard navigation inside of 'NavigationUIComponent'.
   */
  a11yNavigationUiKeyboardControls?: boolean;

  /**
   * Fixes heading gap present in 'OrderConfirmationItemsComponent' template.
   */
  a11yOrderConfirmationHeadingOrder?: boolean;

  /**
   * Improves accessibility of 'StarRatingComponent' i.e.
   * Provides a clear rating value to screen readers.
   * Includes information on whether it is interactive.
   */
  a11yStarRating?: boolean;

  /**
   * 'ViewComponent' will trigger an assistive message after active view changes.
   */
  a11yViewChangeAssistiveMessage?: boolean;

  /**
   * Refocuses inside of 'ReorderDialogComponent' after its content updates.
   */
  a11yReorderDialog?: boolean;

  /**
   * Element containing the 'PopoverDirective' will be refocused after the popover is closed.
   */
  a11yPopoverFocus?: boolean;

  /**
   * Adds Datepicker label and corrects heading order for 'CheckoutScheduleReplenishmentOrderComponent'.
   */
  a11yScheduleReplenishment?: boolean;

  /**
   * When 'ScrollToTopComponent' is trigged with a keyboard, focus remains on the
   * button and preserves the user's context.
   */
  a11yScrollToTop?: boolean;

  /**
   * Fixes 'cx-saved-cart-list-label' dissapering on 200% zoom in 'SavedCartListComponent'.
   */
  a11ySavedCartsZoom?: boolean;

  /**
   * Stops dropdown options labels from truncating inside 'ProductListComponent'.
   */
  a11ySortingOptionsTruncation?: boolean;

  /**
   * Fixes unnecessarily expanded focus indicator in 'ProductListItemComponent' and 'AddToSavedCartComponent'.
   */
  a11yExpandedFocusIndicator?: boolean;

  /**
   * Fixes 'CheckoutDeliveryModeComponent' losing focus after delivery methods update.
   */
  a11yCheckoutDeliveryFocus?: boolean;

  /**
   * Prevents the focus indicator of 'VisibleFocusDirective' from overflowing on mobile/while zoomed.
   */
  a11yMobileVisibleFocus?: boolean;

  /**
   * Improves screen reader readout of 'BannerComponent' on organization page.
   * The anchor tag will no longer contain unnecessary text that would otherwise be read out.
   */
  a11yOrganizationsBanner?: boolean;

  /**
   * Corrects heading order inside 'ListComponent' template.
   */
  a11yOrganizationListHeadingOrder?: boolean;

  /**
   * Changes 'order days' check list into a fieldset inside of 'CheckoutScheduleReplenishmentOrderComponent'.
   */
  a11yReplenishmentOrderFieldset?: boolean;

  /**
   * Corrects oversized focus indicator from list items inside 'ListComponent'.
   */
  a11yListOversizedFocus?: boolean;

  /**
   * Adjuststs the styles of 'StoreFinderMapComponent' to stop the Google map from overflowing on zoomed/mobile screens.
   */
  a11yStoreFinderOverflow?: boolean;

  /**
   * Corrects heading order inside 'OrderSummaryComponent' template.
   */
  a11yCartSummaryHeadingOrder?: boolean;

  /**
   * Improves focus behaviour of 'SearchBoxComponent'.
   * On mobile, search box will no longer open on focus.
   */
  a11ySearchBoxMobileFocus?: boolean;

  /**
   * Modifies 'FacetComponent' to enable keyboard navigation for facets in the product list page.
   */
  a11yFacetKeyboardNavigation?: boolean;

  /**
   * Allows users to navigate through the list of units using the arrow keys.
   * Enables keyboard controls inside 'ToggleLinkCellComponent' and
   * adjusts 'ListComponent' styles to accomodate.
   */
  a11yUnitsListKeyboardControls?: boolean;

  /**
   * When set to `true`, product titles in `CartItemComponent`, `QuickOrderItemComponent`, `WishListItemComponent`
   * adopt a more link-like style, appearing blue with an underline. This enhances visual cues for clickable elements,
   * providing a more intuitive user experience.
   */
  a11yCartItemsLinksStyles?: boolean;

  /**
   * If enabled, the "Select this address/payment" button
   * will not be displayed in `CheckoutPaymentMethodComponent`
   * and `CheckoutDeliveryAddressComponent` when the address
   * or payment method is already selected.
   */
  a11yHideSelectBtnForSelectedAddrOrPayment?: boolean;

  /**
   * Determines whether the controls in the `CarouselComponent` are focusable and accessible from the keyboard.
   */
  a11yFocusableCarouselControls?: boolean;

  /**
   * In `CmsGuardsService`, it uses the `GuardsComposer` instead of
   * calling its own deprecated method `canActivateGuard()`.
   */
  cmsGuardsServiceUseGuardsComposer?: boolean;

  /**
   * In `CartQuickOrderFormComponent` it stops calling the deprecated method
   * `watchAddEntryFailEvent()`, which listens to the `CartAddEntryFailEvent`.
   *
   * It avoids showing an unnecessary duplicated error message on the failure
   * of adding to the cart.
   */
  cartQuickOrderRemoveListeningToFailEvent?: boolean;

  /**
   * Adds a keyboard accessible zoom button to the `ProductImageZoomViewComponent`.
   */
  a11yKeyboardAccessibleZoom?: boolean;

  /**
   * Sets 'linkable' property in 'CellComponent' to be false by default.
   * Modifies all table configs to acomodate this change.
   * This stops unnecessary anchor tags from being rendered in the table cells.
   */
  a11yOrganizationLinkableCells?: boolean;

  /**
   * Stops the focus indicator from overflowing and being obstructed by other elements.
   * Modifies the 'visible-focus' mixin. Includes style changes for:
   * 'StarRatingComponent', AddToWishListComponent, StarRatingComponent
   */
  a11yVisibleFocusOverflows?: boolean;

  /**
   * When enabled then on mobile(320px) responsive view:
   * 1. `ProductListComponent` - grid view button is aligned correctly
   * 2. `QuickOrderFormComponent` - search combobox options are not truncated
   * 3. `BreadcrumbComponent` - breadcrumb heading is not truncated
   * 4. `CheckoutProgressMobileTopComponent` - checkout step names do not have huge vertical white space
   */
  a11yTruncatedTextForResponsiveView?: boolean;

  /**
   * Modifies getAriaLabel method in 'PaginationComponent' to return a sematic label.
   */
  a11ySemanticPaginationLabel?: boolean;

  /**
   * When using CartItemListComponent as an outlet ([cxOutlet]="CartOutlets.CART_ITEM_LIST"):
   * prevents the form from being recreated when neither the items nor other dependent properties (e.g., readonly) have changed.
   */
  a11yPreventCartItemsFormRedundantRecreation?: boolean;

  /**
   * Prevents screen reader from stopping on invisible elements when being in read mode for `BreadcrumbComponent`, `QuickOrderFormComponent`
   */
  a11yPreventSRFocusOnHiddenElements?: boolean;

  /**
   * In `LoginComponent` the outline of "My Account" link when focused will not cover the user name
   */
  a11yMyAccountLinkOutline?: boolean;

  /**
   * When enabled focus outline on the close button inside `ProductImageZoomDialogComponent`
   * will be fully visible
   */
  a11yCloseProductImageBtnFocus?: boolean;

  /**
   * Improve colour contrast in the demonstration theme Santorini
   * to comply with accessibility standards. On activation, colour
   * assignations for all UI elements will change and previous keyboard
   * focus-ring gets replaced by a new bi-colour focus-ring.
   *
   * Note: If you're not using in your app the `StorefrontComponent`
   *       (`<cx-storefront>`) from Spartacus, then you'll need to also add
   *       the following line to the constructor of your app's root component:
   *
   * ```
   * constructor() {
   *   useFeatureStyles('a11yImproveContrast');
   * }
   * ```
   */
  a11yImproveContrast?: boolean;

  /**
   * Moves input elements of 'NotificationPreferenceComponent' into a fieldset.
   */
  a11yNotificationPreferenceFieldset?: boolean;

  /**
   * Modifies the template of 'WishListComponent'.
   * Empty wishlist notification will be displayed in a paragraph instead of a heading.
   */
  a11yEmptyWishlistHeading?: boolean;

  /**
   * Removes the `tabindex` attribute from the `StorefrontComponent`.
   * This helps to reduce the screen reader bloat.
   */
  a11yScreenReaderBloatFix?: boolean;

  /**
   * When enabled the button-like UI elements will use `<button>` under the hood instead of `<a>`
   * in the following components: `AddedToCartDialogComponent`, `ForgotPasswordComponent`,
   * `LoginRegisterComponent`, `ConfigureProductComponent`
   */
  a11yUseButtonsForBtnLinks?: boolean;

  /**
   * When enabled disable "Apply" button in promo code component in cart for empty input,
   * disable "Add" button in quick order component when input is empty and remove
   * required validators for both inputs
   */
  a11yDisabledCouponAndQuickOrderActionButtonsInsteadOfRequiredFields?: boolean;

  /**
   * In `FacetListComponent` dialog view focus will be moved to the first facet
   * after single-select facet selection.
   * New "Back To Results" button is added
   */
  a11yFacetsDialogFocusHandling?: boolean;

  /**
   * `MessageComponent` gets focused after a message with an action is rendered.
   */
  a11yCxMessageFocus?: boolean;

  /**
   * Replaces buttons resembling links with tetriary buttons in the following components:
   * `AddToWishListComponent`, `ProductIntroComponent`, `ProductImageZoomTriggerComponent`
   */
  a11yLinkBtnsToTertiaryBtns?: boolean;

  /**
   * In OCC cart requests, it puts parameters of a cart name and cart description
   * into a request body, instead of query params.
   * This toggle is used in the following classes: `OccCartAdapter`, `OccSavedCartAdapter`, `SavedCartOccModule`, `CartBaseOccModule`.
   */
  occCartNameAndDescriptionInHttpRequestBody?: boolean;

  /**
   * When enabled, styles for the `cx-bottom-header-slot` class will be applied. These styles are necessary to display
   * customization buttons in the BottomHeaderSlot in SmartEdit.
   */
  cmsBottomHeaderSlotUsingFlexStyles?: boolean;
}

export const defaultFeatureToggles: Required<FeatureTogglesInterface> = {
  formErrorsDescriptiveMessages: true,
  shouldHideAddToCartForUnpurchasableProducts: false,
  useExtractedBillingAddressComponent: false,
  showBillingAddressInDigitalPayments: false,
  showDownloadProposalButton: false,
  showPromotionsInPDP: false,
  recentSearches: false,
  pdfInvoicesSortByInvoiceDate: false,
  storeFrontLibCardParagraphTruncated: false,
  productConfiguratorAttributeTypesV2: false,
  a11yRequiredAsterisks: false,
  a11yQuantityOrderTabbing: false,
  a11yNavigationUiKeyboardControls: false,
  a11yOrderConfirmationHeadingOrder: false,
  a11yStarRating: false,
  a11yViewChangeAssistiveMessage: false,
  a11yReorderDialog: false,
  a11yPopoverFocus: false,
  a11yScheduleReplenishment: false,
  a11yScrollToTop: false,
  a11ySavedCartsZoom: false,
  a11ySortingOptionsTruncation: false,
  a11yExpandedFocusIndicator: false,
  a11yCheckoutDeliveryFocus: false,
  a11yMobileVisibleFocus: false,
  a11yOrganizationsBanner: false,
  a11yOrganizationListHeadingOrder: false,
  a11yReplenishmentOrderFieldset: false,
  a11yListOversizedFocus: false,
  a11yStoreFinderOverflow: false,
  a11yCartSummaryHeadingOrder: false,
  a11ySearchBoxMobileFocus: false,
  a11yFacetKeyboardNavigation: false,
  a11yUnitsListKeyboardControls: false,
  a11yCartItemsLinksStyles: false,
  a11yHideSelectBtnForSelectedAddrOrPayment: false,
  a11yFocusableCarouselControls: false,
  cmsGuardsServiceUseGuardsComposer: false,
  cartQuickOrderRemoveListeningToFailEvent: false,
  a11yKeyboardAccessibleZoom: false,
  a11yOrganizationLinkableCells: false,
  a11yVisibleFocusOverflows: false,
  a11yTruncatedTextForResponsiveView: false,
  a11ySemanticPaginationLabel: false,
  a11yPreventCartItemsFormRedundantRecreation: false,
  a11yPreventSRFocusOnHiddenElements: false,
  a11yMyAccountLinkOutline: false,
  a11yCloseProductImageBtnFocus: false,
  a11yNotificationPreferenceFieldset: false,
  a11yImproveContrast: false,
  a11yEmptyWishlistHeading: false,
  a11yScreenReaderBloatFix: false,
  a11yUseButtonsForBtnLinks: false,
  a11yDisabledCouponAndQuickOrderActionButtonsInsteadOfRequiredFields: false,
  a11yFacetsDialogFocusHandling: false,
  a11yCxMessageFocus: false,
  a11yLinkBtnsToTertiaryBtns: false,
  occCartNameAndDescriptionInHttpRequestBody: false,
  cmsBottomHeaderSlotUsingFlexStyles: false,
};
