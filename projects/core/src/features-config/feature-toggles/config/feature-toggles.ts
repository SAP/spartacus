/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// Let's NOT add here any wildcard property like
//  `[key: string]: boolean | undefined;`
// We want this interface to be STRICT and cause a compilation error when a removed property is used.
// Thanks to that, customers using a property that was recently removed, will know they have to adapt their code.
export interface FeatureTogglesInterface {
  /**
   * In 'CheckoutDeliveryModeComponent' and 'CheckReviewShippingComponent', it displays
   * the new delivery options translation
   */
  showDeliveryOptionsTranslation?: boolean;

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
   * In `ASM` it shows searching customer by order ID.
   */
  showSearchingCustomerByOrderInASM?: boolean;

  /**
   * New REDESIGNED search-box component
   */
  searchBoxV2?: boolean;

  /**
   * Some Changes for input of cart Number and text of Customer360View in ASM view
   */
  showStyleChangesInASM?: boolean;

  /**
   * In `SearchBoxComponent` it shows the trending searches.
   */
  trendingSearches?: boolean;

  /**
   * In `InvoicesListComponent` it sorts invoices by the date of the invoice itself.
   * Previously the sorting was done by the date of creating an invoice entry.
   */
  pdfInvoicesSortByInvoiceDate?: boolean;

  /**
   * When enabled, the batch API is used `ProductCarouselComponent` to load products. It increases the component's performance.
   *
   * _NOTE_: When flag is enabled, custom OCC config for the `productSearch` endpoint has to be adjusted to have an object representation:
   * ```js
   * backend: {
   *    occ: {
   *      endpoints: {
   *         productSearch: {
   *           default: '...',
   *           carousel: '...',
   *           carouselMinimal: '...',
   *         },
   *       },
   *     },
   *   }
   * ```
   */
  useProductCarouselBatchApi?: boolean;

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
   * In a server environment (SSR or Prerendering) it propagates all errors caught in Angular app
   * (in the Angular's `ErrorHandler` class) to the server layer.
   *
   * In SSR, such a propagation allows the server layer (e.g. ExpressJS) for handling those errors,
   * e.g. sending a proper Error Page in response to the client,
   * instead of a rendered HTML that is possibly malformed due to the occurred error.
   */
  propagateErrorsToServer?: boolean;

  /**
   * In SSR, the following errors will be printed to logs (and additionally can also
   * be forwarded to ExpressJS if only the other feature toggle `propagateErrorsToServer` is enabled):
   *
   * 1. any outgoing HTTP request error (4xx-5xx status)
   * 2. any NgRx action with the `error` property
   */
  ssrStrictErrorHandlingForHttpAndNgrx?: boolean;

  /**
   * The product configuration UI is completely re-rendered after each UI interaction. This may lead to performance issues for large configuration models,
   * where a lot of attributes (>50) and/or a lot of possible values per attribute (>50) are rendered on the UI.
   *
   * When this feature toggle is activated, only these parts of the UI are re-rendered, that actually changed, significantly (up to factor 10) improving rendering performance for large models.
   *
   * Please note, this will influence how the pricing requests are processed and rendered.
   * Instead of merging the prices into the configuration model, which effectively triggers re-rendering the whole UI-Component tree,
   * the price supplements are kept in a separate subtree of the model, so that attribute components can react independently on pricing changes using the `ConfiguratorDeltaRenderingService`.
   *
   * Hence, it is advised to do full regression testing after activation of this flag and before rolling this out to production.
   */
  productConfiguratorDeltaRendering?: boolean;

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
   * In `FutureStockAccordionComponent` use `cx-color-text` for button color
   */
  a11yUseProperTextColorForFutureStockAccordion?: boolean;

  /**
   * Improves screen reader(VoiceOver, JAWS) narration of menu buttons inside of 'NavigationUIComponent'.
   */
  a11yNavMenuExpandStateReadout?: boolean;

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
   * Prevent horizontal scroll appearing on smaller screens for `CartItemListComponent`, `AddedToCartDialogComponent`
   */
  a11yPreventHorizontalScroll?: boolean;

  /**
   * Refocuses inside of 'ReorderDialogComponent' after its content updates.
   */
  a11yReorderDialog?: boolean;

  /**
   * Element containing the 'PopoverDirective' will be refocused after the popover is closed.
   */
  a11yPopoverFocus?: boolean;

  /**
   * Fix popover appearance when a High Contrast Theme is applied.
   */
  a11yPopoverHighContrast?: boolean;

  /**
   * 'TabComponent' disallow automatic tab activation.
   */
  a11yTabsManualActivation?: boolean;

  /**
   * Adds Datepicker and Combobox label and corrects heading order for 'CheckoutScheduleReplenishmentOrderComponent'.
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
   * Modifies dialog styles to stop the focus indicator from expanding when 'close' button is focused.
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
   * In `ImportToNewSavedCartFormComponent`,`ImportEntriesFormComponent` after selecting a file
   * confirmation message is displayed and read out
   */
  a11yCartImportConfirmationMessage?: boolean;

  /**
   * In `AnonymousConsentDialogComponent` display notifications inside the modal without closing it
   */
  a11yAnonymousConsentMessageInDialog?: boolean;

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
   * Includes DOM changes to 'StoreFinderStoreDescriptionComponent' improving the screen reader experience.
   */
  a11yStoreFinderOverflow?: boolean;

  /**
   * `StorefrontComponent` focuses on the first navigation item after hamburger menu expansion
   */
  a11yMobileFocusOnFirstNavigationItem?: boolean;

  /**
   * `QuickOrderFormComponent` - disable navigation with Tab/Shift+Tab for search results list
   */
  a11yQuickOrderSearchListKeyboardNavigation?: boolean;

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
   * Adds label to the `SearchBoxComponent` search input
   */
  a11ySearchboxLabel?: boolean;

  /**
   * When set to `true`, product titles in `CartItemComponent`, `QuickOrderItemComponent`, `WishListItemComponent`
   * adopt a more link-like style, appearing blue with an underline. This enhances visual cues for clickable elements,
   * providing a more intuitive user experience.
   */
  a11yCartItemsLinksStyles?: boolean;

  /**
   * When set to `true`, external links in `StoreFinderListItemComponent`
   * adopt a more link-like style, appearing more like links instead of buttons. This is semantically more correct since they open content in a new window,
   * providing a more intuitive user experience.
   */
  a11yStyleExternalLinksAsLinks?: boolean;

  /**
   * If enabled, the "Select this address/payment" button
   * will not be displayed in `CheckoutPaymentMethodComponent`
   * and `CheckoutDeliveryAddressComponent` when the address
   * or payment method is already selected.
   */
  a11yHideSelectBtnForSelectedAddrOrPayment?: boolean;

  /**
   * If enabled, the "Checkout Shipping address/Payment" views
   * will have a more a11y friendly selected label, including the context
   * indicating weather the user is on a selected Address or Payment regsion.
   */
  a11ySelectLabelWithContextForSelectedAddrOrPayment?: boolean;

  /**
   * Determines whether the controls in the `CarouselComponent` are focusable and accessible from the keyboard.
   */
  a11yFocusableCarouselControls?: boolean;

  /**
   * Enables only Tab/Shift+Tab keyboard navigation in dialogs and preserved default scrolling behaviour of up/down keys.
   * Components:
   * - `PickupOptionDialogComponent`
   */
  a11yUseTrapTabInsteadOfTrapInDialogs?: boolean;

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
   * `StarRatingComponent`, `AddToWishListComponent`, `StarRatingComponent`, `SkipLinkComponent`,
   * `StoreComponent`, `SetPreferredStoreComponent`, `WishListComponent`
   */
  a11yVisibleFocusOverflows?: boolean;

  /**
   * When enabled then on mobile(320px) responsive view:
   * 1. `ProductListComponent` - grid view button is aligned correctly
   * 2. `QuickOrderFormComponent` - search combobox options are not truncated
   * 3. `BreadcrumbComponent` - breadcrumb heading is not truncated
   * 4. `CheckoutProgressMobileTopComponent` - checkout step names do not have huge vertical white space
   * 5. 'UnitLevelOrderHistoryComponent' - sorting dropdown options will not be truncated
   */
  a11yTruncatedTextForResponsiveView?: boolean;

  /**
   * `StoreFinderListItemComponent` street name is not truncated
   */
  a11yTruncatedTextStoreFinder?: boolean;

  /**
   * `UnitLevelOrderHistoryComponent` filter input label and table email address
   * are not truncated
   */
  a11yTruncatedTextUnitLevelOrderHistory?: boolean;

  /**
   * When enabled focus outline on the close button inside `ProductImageZoomDialogComponent`
   * will be fully visible
   */
  a11yCloseProductImageBtnFocus?: boolean;

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
   * `LoginRegisterComponent`, `ConfigureProductComponent`, `AnonymousConsentDialogComponent`,
   * `StoreSearchComponent`, `AddToSavedCartComponent`, `PickupOptionsComponent`
   */
  a11yUseButtonsForBtnLinks?: boolean;

  /**
   * Enables the use of TabComponent in the PLP and PDP page to replace some functionality
   * of the FacetListComponent and TabParagraphComponent to make then keyboard accessible
   * and responsive in tab and accordion stles.
   */
  a11yTabComponent?: boolean;

  /**
   * `ProductImageZoomProductImagesComponent`, `ProductImageZoomThumbnailsComponent` - enable
   * arrow keys navigation for the carousel
   */
  a11yCarouselArrowKeysNavigation?: boolean;

  /**
   * Use tabs instead of radio group for pickup options. Improves SR narration and keyboard navigation pattern.
   * Modified components:
   *  - `PickupOptionsComponent`
   *  - `PdpPickupOptionsContainerComponent`
   *  - `CartPickupOptionsContainerComponent`
   *  - `AddToCartComponent`
   */
  a11yPickupOptionsTabs?: boolean;

  /**
   * `AnonymousConsentDialogComponent` - after consent was given/withdrawn the notification
   * will be displayed
   * `ConsentManagementComponent` - improve stability of notifications announcements by VoiceOver
   * `ConsentManagementFormComponent` - only pronounce the title of the consent by default
   */
  a11yNotificationsOnConsentChange?: boolean;

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
   * Resets the focus after navigating to a new page.
   */
  a11yResetFocusAfterNavigating?: boolean;

  /**
   * `StorefrontComponent`: Prevents header links from wrapping on smaller screen sizes.
   * Enables support for increased letter-spacing up to 0.12em for header layout
   */
  headerLayoutForSmallerViewports?: boolean;

  /**
   * Enables radio group fieldset for 'CheckoutDeliveryModeComponent' form
   * and further improves its screen reader readout.
   */
  a11yDeliveryModeRadiogroup?: boolean;

  /**
   * Removes 'aria-live' from 'StoreFinderComponent' and adds 'alert' role to child components elements.
   */
  a11yStoreFinderAlerts?: boolean;

  /**
   * Adds label to 'StoreFinderSearchComponent' store search input field.
   */
  a11yStoreFinderLabel?: boolean;

  /**
   * Stops the icon inside 'FormErrorsComponent' from being read out by screen readers.
   */
  a11yFormErrorMuteIcon?: boolean;

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
   * Aria-live inside the 'BreadcrumbComponent' will be toggled based on the active element.
   * This removes the repeated announcement of the page title.
   */
  a11yRepeatedPageTitleFix?: boolean;

  /**
   * 'NgSelectA11yDirective' will now provide a count of items for each availble option.
   * Including this count in aria-label will help screen readers to provide more context to the user.
   * Update (since 2211.33): This feature toggle and the logic behind it should be removed
   * in next major relase since ng-select now correctly handles aria-label values of select options.
   */
  a11yNgSelectOptionsCount?: boolean;

  /**
   * 'NgSelectA11yDirective' will close a dropdown with options on Escape key press
   * when a screen reader is used.
   */
  a11yNgSelectCloseDropdownOnEscape?: boolean;

  /**
   * 'NgSelectA11yDirective' will customize a ng-select dropdowns by setting custom
   * ariaLabelDropdown ng-select attribute value to provided common.ngSelectDropdownOptionsList translation
   */
  a11yNgSelectAriaLabelDropdownCustomized?: boolean;

  /**
   * Removes duplicated error message from 'CancelOrderComponent'.
   */
  a11yRepeatedCancelOrderError?: boolean;

  /**
   * Mofifies the template of 'AddedToCartDialogComponent' to retain the focus after the cart is updated.
   * Improves its screen reader readout.
   */
  a11yAddedToCartActiveDialog?: boolean;

  /**
   * Modifies the 'NgSelectA11yDirective' to improve the sorting dropdown screen reader experience on mobile devices.
   */
  a11yNgSelectMobileReadout?: boolean;

  /**
   * When enabled, the form in 'PickupOptionsComponent' will be wrapped in a fieldset and contain a legend.
   */
  a11yDeliveryMethodFieldset?: boolean;

  /**
   * In 'ProductReviewsComponent' the 'show more/less reviews' button will no longer loose focus on activation.
   */
  a11yShowMoreReviewsBtnFocus?: boolean;

  /**
   * Fixes `aria-controls` attribute in the 'QuickOrderFormComponent' combobox.
   */
  a11yQuickOrderAriaControls?: boolean;

  /**
   * Removes the element with `role="status"` attribute from subpage components.
   * The 'Loaded, empty status' message will no longer be present for the screen readers.
   */
  a11yRemoveStatusLoadedRole?: boolean;

  /**
   * Changes modal title elements form divs into headings. Affects modals before version 2211.27.
   */
  a11yDialogsHeading?: boolean;

  /**
   * When enabled, the focus will be returned to the trigger element after the dialog is closed.
   * Affected components: 'AddtoCartComponent', 'PickupOptionsComponent', CartPickupOptionsContainerComponent, PDPPickupOptionsContainerComponent
   */
  a11yDialogTriggerRefocus?: boolean;

  /**
   * The 'AddToWishListComponent' will restore focus to the button after adding or removing an item from the wishlist.
   */
  a11yAddToWishlistFocus?: boolean;

  /**
   * `SearchBoxComponent` should no longer lose focus after closing the popup the esc key.
   */
  a11ySearchBoxFocusOnEscape?: boolean;

  /**
   * In `AddedToCartDialogComponent`, `Updating cart...` should no longer read by a screen reader.
   */
  a11yUpdatingCartNoNarration?: boolean;

  /**
   * Stops the inputs value from obstructing the 'PasswordVisibilityToggleComponent'.
   */
  a11yPasswordVisibliltyBtnValueOverflow?: boolean;

  /**
   * In `ItemCounterComponenet`, Remove button no longer lose focus after activating when count is 2.
   * Add button no longer lose focus after activating when count is `max - 1`.
   */
  a11yItemCounterFocus?: boolean;

  /**
   * `ProductIntroComponent` should now scroll to the Review tab on the first click of the 'Show Review' button.
   */
  a11yScrollToReviewByShowReview?: boolean;

  /**
   * `StoreComponent and MyPreferredStoreComponent` an icon in a button that triggers showing
   * store's opening hours has an acceptable contrast ratio in a default theme
   */
  a11yViewHoursButtonIconContrast?: boolean;

  /**
   * `StoreComponent` `In Stock` icon has an acceptable contrast ratio in a default theme
   */
  a11yStoreInStockIconContrast?: boolean;

  /**
   * `Checkout` add a landmarks to content representing steps
   */
  a11yCheckoutStepsLandmarks?: boolean;

  /**
   * In `CartItemListComponent`, change QTY into Quantity.
   */
  a11yQTY2Quantity?: boolean;

  /**
   * In `Card component`, replace button classes to .btn .btn-tertiary and use cx-generic link
   * instead of regular <a> tag.
   * In `My Preferred Store component`, replace a `Get directions` action from CardAction to CardLinkAction
   * to so that Card component perceive it as a link;
   */
  a11yImproveButtonsInCardComponent?: boolean;

  /**
   * In `MiniCart component`, improve visible focus contrast on mobile.
   */
  a11yMiniCartFocusOnMobile?: boolean;

  /**
   * In `UnitFormComponent`, set 'clearable' as false for select of `ApprovalProcess`.
   */
  a11yApprovalProcessWithNoClearable?: boolean;

  /**
   * Changes the success message of successful registration to be more informative. Affects `RegisterComponentService`.
   */
  a11yPostRegisterSuccessMessage?: boolean;

  /**
   * In `CardComponent`, place `Delete` button before `Cancel` button.
   */
  a11yDeleteButton2First?: boolean;

  /**
   * In `CustomerListComponent`, `OrderApprovalListComponent`, and `ConfiguratorAttriuteSingleSelectionBundleDropdownComponent`, show label of every `ng-select` and `select`.
   */
  a11yShowLabelOfSelect?: boolean;

  /**
   * In `SiteContextSelectComponent` and `SiteThemeSwitcherComponent`, update style of caret.
   */
  a11yShowDownArrowOnFocusedSelectMenu?: boolean;

  /**
   * Fixes various instances of the focus ring being cropped in the UI.
   * The focus ring on interactive elements should have all its sides visible and not include any extra padding.
   * Affects styles of: 'CartItemListComponent, CartItemComponent, ListComponent, FutureStockAccordionComponent,
   * QuoteConfirmDialogComponent, MessagingComponent, TabComponent, ProductImageZoomViewComponent
   */
  a11yCroppedFocusRing?: boolean;

  /**
   * Fixes text formatting issues while a11y text spacing is enabled.
   * Affects: ListComponent, CSAgentLoginFormComponent
   */
  a11yTextSpacingAdjustments?: boolean;

  /**
   * Ensures the table column header gets properly narrated by the screen readers.
   * Affects tables in the following components: SavedCartListComponent, ReplenishmentOrderHistoryComponent, OrderReturnRequestListComponent,
   * AccountSummaryDocumentComponent, OrderDetailPermissionResultsComponent, OrderApprovalListComponent, UnitLevelOrderHistoryComponent,
   * InvoicesListComponent, MyInterestsComponent
   */
  a11yTableHeaderReadout?: boolean;

  /**
   * Removes the repetition of assistive message after the results are provided to the `SearchBoxComponent`.
   */
  a11ySearchboxAssistiveMessage?: boolean;

  /**
   * Updates the derivative `consentGiven` state when `consent` is updated.
   *
   * Components affected:
   * - `ConsentManagementFormComponent`
   * - `MyAccountV2ConsentManagementFormComponent`
   */
  updateConsentGivenInOnChanges?: boolean;

  /**
   * Adds additional styling to help differentiate between focused and selected items in the list.
   * Affects: ConfiguratorAttributeSingleSelectionImageComponent, ProductImagesComponent
   */
  a11yDifferentiateFocusedAndSelected?: boolean;

  /**
   * When enabled the input element in `QuickOrderFormComponent' will regain its focus after the dropdown is closed.
   */
  a11yQuickOrderSearchBoxRefocusOnClose?: boolean;

  /**
   * Adds a visible focus indicator for keyboard navigation in the `SearchBoxComponent` without affecting the visual state for mouse interactions.
   * Affects: SearchBoxComponent
   */
  a11yKeyboardFocusInSearchBox?: boolean;

  /**
   * Adds horizontal padding to the 'carousel-panel' to fix the issue where the focus only covers three sides of the 'Previous slide' and 'Next slide' buttons within the carousel section.
   * Affects: CarouselComponent
   */
  a11yAddPaddingToCarouselPanel?: boolean;

  /**
   * Removes invalid aria-level usage on button elements and ensures buttons have a proper accessible name via aria-label or aria-labelledby.
   * Affects: NavigationUIComponent
   */
  a11yNavigationButtonsAriaFixes?: boolean;

  /**
   * Restores the focus to the card once a option has been selected and the checkout has updated.
   * Affects: CheckoutPaymentMethodComponent, CheckoutDeliveryAddressComponent
   */
  a11yFocusOnCardAfterSelecting?: boolean;

  /**
   * Search dropdowns will display the focus ring correctly when navigating to the options using the down arrow key.
   * Affects: SearchBoxComponent, QuickOrderFormComponent
   */
  a11ySearchableDropdownFirstElementFocus?: boolean;

  /**
   * Hides the 'Consent Management' button from the tab order when the cookies banner is visible.
   * Ensures the button is re-enabled and part of the tab order once consent is given and the banner disappears.
   * Renames the button from "View Details" to "Consent Management" after consent is given.
   * Ensures the button is centered in the `AnonymousConsentOpenDialogComponent` and has clear, four-sided visible focus when navigated via keyboard.
   * Affects: AnonymousConsentOpenDialogComponent, AnonymousConsentManagementBannerComponent
   */
  a11yHideConsentButtonWhenBannerVisible?: boolean;

  /**
   * Adds a unique `aria-label` to repeating buttons that contain the same text.
   * Affects: SetPreferredStoreComponent
   */
  a11yRepeatingButtonsUniqueLabels?: boolean;

  /**
   * Ensures that borders across all UI elements are visible and meet accessibility standards in high-contrast dark and light themes.
   * This change is applied globally to enhance usability for users relying on high-contrast modes.
   * Affects: CustomerTickingListComponent, CheckoutReviewPaymentComponent, SavedCartListComponent
   */
  a11yHighContrastBorders?: boolean;

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

  /**
   * 1. It uses the new `SiteThemeService` as the source of truth for the "site theme" value
   * (this value can change over time, e.g. when selecting new value in the new `SiteThemeSwitcherComponent`).
   * Previously the "site theme" could be set only on the page start (via the static config `config.context.theme` or via CMS, when using the feature of the "automatic site-context configuration").
   * 2. Now, when no custom theme is selected, the default theme value is an empty string `''`,
   * unless you configure it differently via the global config `config.context.theme` (or via CMS).
   * Previously, there the non-defined theme had a value `undefined`.
   */
  useSiteThemeService?: boolean;

  /**
   * Enables the requirement that passwords cannot contain consecutive identical characters.
   *
   * When set to `true`, the app will enforce that passwords must not have consecutive
   * identical characters (e.g., "aa", "11", or "$$" are not allowed).
   */
  enableConsecutiveCharactersPasswordRequirement?: boolean;

  /**
   * In CustomerCouponConnector, Enables claiming customer coupon with coupon code in httpRequest body with POST method.
   *
   * When set to `false`, claiming customer coupon works with coupon code as parameter in URL, which exposes sensitive data and has security risk.
   * When set to `true`, claiming customer coupon works with coupon code in httpRequest body with POST method(the new Occ endpoint is available since Commerce 2211.28), which avoids security risk.
   */
  enableClaimCustomerCouponWithCodeInRequestBody?: boolean;

  /**
   * Enables a validation that prevents new passwords from matching the current password
   * in the password update form.
   *
   * When set to `true`, the user will not be allowed to reuse their current password
   * when updating their password. The app will check that the new password does not match
   * the old password.
   */
  enablePasswordsCannotMatchInPasswordUpdateForm?: boolean;

  /**
   * Enables *all* page meta resolvers in Client-Side Rendering (CSR),
   * ignoring the configuration option set for specific resolvers
   * `config.pageMeta.resolvers[index].disabledInCsr`.
   *
   * Note: The config option `disabledInCsr` is now deprecated and will be removed
   *       in the future together with this feature toggle.
   */
  allPageMetaResolversEnabledInCsr?: boolean;

  /**
   * Modifies grid arrangement in Product Details Page for better accessibility:
   * - add to cart button should be last step
   * - future stock accordion is moved before add to cart button
   */
  a11yPdpGridArrangement?: boolean;

  /**
   * Header. Fixes trapping focus on menu items on mobile when the menu is expanded.
   * Sets `tabindex` attribute  to `-1` for all visible focusable elements in the header section to exclude them from
   * keyboard navigation
   */
  a11yHamburgerMenuTrapFocus?: boolean;

  /**
   * Associates content regions with their headers improving readout while navigating between sections.
   * Affects: CardComponent, AccountSummaryDocumentComponent, ListComponent
   */
  a11yRegionAssociatedHeaders?: boolean;

  /**
   * When enabled, allows to provide extended formats and media queries for <picture> element if used in MediaComponent.
   *
   * Important: After activation default HTML element in MediaComponent will be `<img>`
   * Only BannerComponent has passed `'picture'` value. If you need to use `<picture>` HTML element
   * you need to pass `[elementType]="'picture'"` to `<cx-media>`
   *
   * For proper work requires `pictureElementFormats`  provided in media config:
   *  ```ts
   * provideConfig({
   *   pictureElementFormats: {
   *    mediaQueries: '(max-width: 480px)',
   *   },
   * })
   * ```
   *
   * Toggle activates `@Input() elementType: 'img' | 'picture' = 'img'`
   * and `@Input() sizesForImgElement: string` in `MediaComponent`
   *
   */
  useExtendedMediaComponentConfiguration?: boolean;

  /**
   * Enables Real time stock display in the PDP page.
   * when set to `true`, the user will be able to see the real time stock in PDP
   */
  showRealTimeStockInPDP?: boolean;

  /**
   * When enabled, the scroll-to-top button adjusts its position when other UI elements
   * (like cookie consent banner) appear at the bottom of the page to prevent overlapping
   */
  a11yScrollToTopPositioning?: boolean;

  /**
   * Creates a section element with applied aria-label in "Review Order" page of the checkout.
   * Moves components to be children of this section element.
   */
  a11yWrapReviewOrderInSection?: boolean;

  /**
   * Enables the product carousel to include products based on specified category codes.
   *
   * - When this feature is enabled, the carousel will fetch and display products
   *   associated with the `categoryCodes` provided.
   * - The `categoryCodes` are configured and managed through SmartEdit
   *
   */
  enableCarouselCategoryProducts?: boolean;

  /**
   * When enabled, enforces stronger password validation rules,
   * including requirements for a mix of uppercase letters, lowercase letters,
   * special characters, digits, and no consecutive characters,
   * as well as enforcing both a minimum and maximum password length.
   */
  enableSecurePasswordValidation?: boolean;
}

export const defaultFeatureToggles: Required<FeatureTogglesInterface> = {
  showDeliveryOptionsTranslation: false,
  formErrorsDescriptiveMessages: true,
  showSearchingCustomerByOrderInASM: true,
  showStyleChangesInASM: true,
  shouldHideAddToCartForUnpurchasableProducts: true,
  useExtractedBillingAddressComponent: true,
  showBillingAddressInDigitalPayments: true,
  showDownloadProposalButton: true,
  searchBoxV2: false,
  trendingSearches: false,
  pdfInvoicesSortByInvoiceDate: true,
  useProductCarouselBatchApi: false,
  productConfiguratorAttributeTypesV2: true,
  propagateErrorsToServer: false,
  ssrStrictErrorHandlingForHttpAndNgrx: false,
  productConfiguratorDeltaRendering: true,
  a11yRequiredAsterisks: true,
  a11yQuantityOrderTabbing: true,
  a11yNavigationUiKeyboardControls: true,
  a11yUseProperTextColorForFutureStockAccordion: false,
  a11yNavMenuExpandStateReadout: false,
  a11yOrderConfirmationHeadingOrder: true,
  a11yStarRating: true,
  a11yViewChangeAssistiveMessage: true,
  a11yPreventHorizontalScroll: false,
  a11yReorderDialog: true,
  a11yPopoverFocus: true,
  a11yPopoverHighContrast: false,
  a11yTabsManualActivation: false,
  a11yScheduleReplenishment: true,
  a11yScrollToTop: true,
  a11ySavedCartsZoom: true,
  a11ySortingOptionsTruncation: true,
  a11yExpandedFocusIndicator: true,
  a11yCheckoutDeliveryFocus: true,
  a11yMobileVisibleFocus: true,
  a11yOrganizationsBanner: true,
  a11yOrganizationListHeadingOrder: true,
  a11yCartImportConfirmationMessage: false,
  a11yAnonymousConsentMessageInDialog: false,
  a11yReplenishmentOrderFieldset: true,
  a11yListOversizedFocus: true,
  a11yStoreFinderOverflow: true,
  a11yMobileFocusOnFirstNavigationItem: false,
  a11yQuickOrderSearchListKeyboardNavigation: false,
  a11yCartSummaryHeadingOrder: true,
  a11ySearchBoxMobileFocus: true,
  a11yFacetKeyboardNavigation: true,
  a11yUnitsListKeyboardControls: true,
  a11yCartItemsLinksStyles: true,
  a11yStyleExternalLinksAsLinks: false,
  a11ySearchboxLabel: false,
  a11yHideSelectBtnForSelectedAddrOrPayment: true,
  a11ySelectLabelWithContextForSelectedAddrOrPayment: false,
  a11yFocusableCarouselControls: true,
  a11yUseTrapTabInsteadOfTrapInDialogs: false,
  cmsGuardsServiceUseGuardsComposer: true,
  cartQuickOrderRemoveListeningToFailEvent: true,
  a11yKeyboardAccessibleZoom: false,
  a11yOrganizationLinkableCells: true,
  a11yVisibleFocusOverflows: true,
  a11yTruncatedTextForResponsiveView: true,
  a11yTruncatedTextStoreFinder: false,
  a11yTruncatedTextUnitLevelOrderHistory: false,
  a11ySemanticPaginationLabel: true,
  a11yPreventCartItemsFormRedundantRecreation: false,
  a11yPreventSRFocusOnHiddenElements: true,
  a11yMyAccountLinkOutline: true,
  a11yCloseProductImageBtnFocus: true,
  a11yNotificationPreferenceFieldset: true,
  a11yImproveContrast: true,
  a11yEmptyWishlistHeading: true,
  a11yScreenReaderBloatFix: true,
  a11yUseButtonsForBtnLinks: true,
  a11yTabComponent: false,
  a11yCarouselArrowKeysNavigation: false,
  a11yPickupOptionsTabs: false,
  a11yNotificationsOnConsentChange: true,
  a11yDisabledCouponAndQuickOrderActionButtonsInsteadOfRequiredFields: true,
  a11yFacetsDialogFocusHandling: true,
  a11yResetFocusAfterNavigating: false,
  headerLayoutForSmallerViewports: false,
  a11yStoreFinderAlerts: true,
  a11yStoreFinderLabel: false,
  a11yFormErrorMuteIcon: true,
  a11yCxMessageFocus: true,
  a11yLinkBtnsToTertiaryBtns: false,
  a11yRepeatedPageTitleFix: false,
  a11yDeliveryModeRadiogroup: true,
  a11yNgSelectOptionsCount: false,
  a11yNgSelectCloseDropdownOnEscape: false,
  a11yNgSelectAriaLabelDropdownCustomized: false,
  a11yRepeatedCancelOrderError: false,
  a11yAddedToCartActiveDialog: false,
  a11yNgSelectMobileReadout: true,
  a11yDeliveryMethodFieldset: false,
  a11yShowMoreReviewsBtnFocus: false,
  a11yQuickOrderAriaControls: false,
  a11yRemoveStatusLoadedRole: false,
  a11yDialogsHeading: false,
  a11yDialogTriggerRefocus: false,
  a11yAddToWishlistFocus: false,
  a11ySearchBoxFocusOnEscape: false,
  a11yUpdatingCartNoNarration: false,
  a11yPasswordVisibliltyBtnValueOverflow: false,
  a11yItemCounterFocus: false,
  a11yScrollToReviewByShowReview: false,
  a11yViewHoursButtonIconContrast: false,
  a11yStoreInStockIconContrast: false,
  a11yCheckoutStepsLandmarks: false,
  a11yQTY2Quantity: false,
  a11yImproveButtonsInCardComponent: false,
  a11yMiniCartFocusOnMobile: false,
  a11yWrapReviewOrderInSection: false,
  a11yApprovalProcessWithNoClearable: false,
  a11yPostRegisterSuccessMessage: false,
  a11yDeleteButton2First: false,
  a11yShowLabelOfSelect: false,
  a11yShowDownArrowOnFocusedSelectMenu: false,
  a11yCroppedFocusRing: false,
  a11yTextSpacingAdjustments: false,
  a11yTableHeaderReadout: false,
  a11ySearchboxAssistiveMessage: false,
  updateConsentGivenInOnChanges: false,
  a11yDifferentiateFocusedAndSelected: false,
  a11yQuickOrderSearchBoxRefocusOnClose: false,
  a11yKeyboardFocusInSearchBox: false,
  a11yAddPaddingToCarouselPanel: false,
  a11yNavigationButtonsAriaFixes: false,
  a11yFocusOnCardAfterSelecting: false,
  a11ySearchableDropdownFirstElementFocus: false,
  a11yHideConsentButtonWhenBannerVisible: false,
  a11yRepeatingButtonsUniqueLabels: false,
  a11yHighContrastBorders: false,
  a11yRegionAssociatedHeaders: false,
  occCartNameAndDescriptionInHttpRequestBody: true,
  cmsBottomHeaderSlotUsingFlexStyles: true,
  useSiteThemeService: false,
  enableConsecutiveCharactersPasswordRequirement: false,
  enablePasswordsCannotMatchInPasswordUpdateForm: false,
  allPageMetaResolversEnabledInCsr: false,
  a11yPdpGridArrangement: false,
  a11yHamburgerMenuTrapFocus: false,
  useExtendedMediaComponentConfiguration: false,
  showRealTimeStockInPDP: false,
  a11yScrollToTopPositioning: false,
  enableSecurePasswordValidation: false,
  enableCarouselCategoryProducts: false,
  enableClaimCustomerCouponWithCodeInRequestBody: false,
};
