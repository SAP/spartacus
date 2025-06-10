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
   * In `FutureStockAccordionComponent` use `cx-color-text` for button color
   */
  a11yUseProperTextColorForFutureStockAccordion?: boolean;

  /**
   * Improves screen reader(VoiceOver, JAWS) narration of menu buttons inside of 'NavigationUIComponent'.
   */
  a11yNavMenuExpandStateReadout?: boolean;

  /**
   * Prevent horizontal scroll appearing on smaller screens for `CartItemListComponent`, `AddedToCartDialogComponent`
   */
  a11yPreventHorizontalScroll?: boolean;

  /**
   * Fix popover appearance when a High Contrast Theme is applied.
   */
  a11yPopoverHighContrast?: boolean;

  /**
   * 'TabComponent' disallow automatic tab activation.
   */
  a11yTabsManualActivation?: boolean;

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
   * `StorefrontComponent` focuses on the first navigation item after hamburger menu expansion
   */
  a11yMobileFocusOnFirstNavigationItem?: boolean;

  /**
   * `QuickOrderFormComponent` - disable navigation with Tab/Shift+Tab for search results list
   */
  a11yQuickOrderSearchListKeyboardNavigation?: boolean;

  /**
   * Adds label to the `SearchBoxComponent` search input
   */
  a11ySearchboxLabel?: boolean;

  /**
   * When set to `true`, external links in `StoreFinderListItemComponent`
   * adopt a more link-like style, appearing more like links instead of buttons. This is semantically more correct since they open content in a new window,
   * providing a more intuitive user experience.
   */
  a11yStyleExternalLinksAsLinks?: boolean;

  /**
   * If enabled, the "Checkout Shipping address/Payment" views
   * will have a more a11y friendly selected label, including the context
   * indicating weather the user is on a selected Address or Payment regsion.
   */
  a11ySelectLabelWithContextForSelectedAddrOrPayment?: boolean;

  /**
   * Enables only Tab/Shift+Tab keyboard navigation in dialogs and preserved default scrolling behaviour of up/down keys.
   * Components:
   * - `PickupOptionDialogComponent`
   */
  a11yUseTrapTabInsteadOfTrapInDialogs?: boolean;

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
   * `StoreFinderListItemComponent` street name is not truncated
   */
  a11yTruncatedTextStoreFinder?: boolean;

  /**
   * `UnitLevelOrderHistoryComponent` filter input label and table email address
   * are not truncated
   */
  a11yTruncatedTextUnitLevelOrderHistory?: boolean;

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
   * Removes the `tabindex` attribute from the `StorefrontComponent`.
   * This helps to reduce the screen reader bloat.
   */
  a11yScreenReaderBloatFix?: boolean;

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
   * `FormErrorsComponent` replace role="alert" to aria-live="polite" as default
   *  together with aria-live="atomic"
   */
  a11yImprovedErrorMessage?: boolean;

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
   * 'NgSelectA11yDirective' will close a dropdown with options on Escape key press
   * when a screen reader is used.
   * Replaces select with ng-select component in the following component:
   * `CustomerTicketingCreateDialogComponent`
   */
  a11ySelectImprovementsCustomerTicketingCreateSelectbox?: boolean;

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
   * Improves wide viewport layout issues.
   * Affects the styles of: Order confirmation page, product configurator.
   */
  a11yWideScreenImprovements?: boolean;

  /**
   * Adjusts line spacing in menus and navigation dropdowns for better readability
   * across different monitors, text sizes, and zoom levels.
   * Affects: NavigationUIComponent
   */
  a11yOptimizedMenuSpacing?: boolean;

  /**
   * Fixes layering issues caused by native ng-select styles.
   * Sets the dropdown's z-index property to be more in line with Spartacus.
   */
  a11yNgSelectLayering?: boolean;

  /**
   * The optional `aria-controls` attribute will override on the NgSelect implementation.
   * The updated library employs the `aria-controls` attribute to indicate the relationship between the button and the dropdown.
   * This change ensures we can still use a custom id if preferable.
   */
  a11yNgSelectAriaControls?: boolean;

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

  /**
   * When enabled, the `ConfiguratorAttributeHeaderComponent` component displays
   * a `ConfiguratorShowOptionsComponent` component underneath the attribute name.
   * The `ConfiguratorShowOptionsComponent` component allows to load the domain values
   * on demand by clicking on `Show Options` button in case the back-end signals
   * that domain values are not yet present.
   */
  enableReadDomainValuesOnDemand?: boolean;

  /**
   * When enabled, checks before accessing checkout
   * if user has email assigned to the current cart.
   * If not - redirects user to `/opf-checkout-email` page.
   * After providing email user will be redirected back to checkout.
   */
  opfEnablePreventingFromCheckoutWithoutEmail?: boolean;

  /**
   * When enabled, it uses the StoreLocationService for getDirections, getStoreLatitude,
   * and getStoreLongitude instead of StoreFinderFacade (deprecated)
   * The logic behind it stays the same
   * Affects: MyPreferredStoreComponent
   */
  storeFinderFacadeCleanup?: boolean;

  /**
   * When enabled, the default routing config for the product page is no longer just:
   * `paths: ['product/:productCode/:name']`
   * but:
   * `paths: ['product/:productCode/:name', 'product/:productCode'],`
   *
   * It means that the old URL scheme of generating links and matching URLs is preserved,
   * but now also a shorter alias (without product name) is accepted when matching the URL.
   */
  defaultProductPageRouteAllowsNoProductName?: boolean;

  /**
   * Enables the `fetchpriority` attribute on images in the `MediaComponent`.
   * When set, this attribute hints to the browser to prioritize image loading,
   * improving perceived performance—especially for above-the-fold content.
   *
   * Controlled via the new `fetchpriority` input in `media.component.ts`.
   * See `media.component.ts` for implementation details.
   */
  enableMediaFetchPriority?: boolean;
}

export const defaultFeatureToggles: Required<FeatureTogglesInterface> = {
  showDeliveryOptionsTranslation: true,
  formErrorsDescriptiveMessages: true,
  showSearchingCustomerByOrderInASM: true,
  showStyleChangesInASM: true,
  shouldHideAddToCartForUnpurchasableProducts: true,
  searchBoxV2: true,
  trendingSearches: true,
  useProductCarouselBatchApi: true,
  propagateErrorsToServer: true,
  ssrStrictErrorHandlingForHttpAndNgrx: true,
  productConfiguratorDeltaRendering: true,
  a11yUseProperTextColorForFutureStockAccordion: false,
  a11yNavMenuExpandStateReadout: true,
  a11yPreventHorizontalScroll: true,
  a11yPopoverHighContrast: false,
  a11yTabsManualActivation: false,
  a11yCartImportConfirmationMessage: true,
  a11yAnonymousConsentMessageInDialog: false,
  a11yMobileFocusOnFirstNavigationItem: true,
  a11yQuickOrderSearchListKeyboardNavigation: false,
  a11yStyleExternalLinksAsLinks: true,
  a11ySearchboxLabel: true,
  a11ySelectLabelWithContextForSelectedAddrOrPayment: true,
  a11yUseTrapTabInsteadOfTrapInDialogs: true,
  a11yKeyboardAccessibleZoom: false,
  a11yOrganizationLinkableCells: true,
  a11yTruncatedTextStoreFinder: true,
  a11yTruncatedTextUnitLevelOrderHistory: false,
  a11ySemanticPaginationLabel: true,
  a11yPreventCartItemsFormRedundantRecreation: false,
  a11yPreventSRFocusOnHiddenElements: true,
  a11yNotificationPreferenceFieldset: true,
  a11yImproveContrast: true,
  a11yScreenReaderBloatFix: true,
  a11yTabComponent: true,
  a11yCarouselArrowKeysNavigation: true,
  a11yPickupOptionsTabs: true,
  a11yNotificationsOnConsentChange: true,
  a11yDisabledCouponAndQuickOrderActionButtonsInsteadOfRequiredFields: true,
  a11yResetFocusAfterNavigating: false,
  headerLayoutForSmallerViewports: true,
  a11yStoreFinderAlerts: true,
  a11yStoreFinderLabel: false,
  a11yFormErrorMuteIcon: true,
  a11yImprovedErrorMessage: false,
  a11yCxMessageFocus: true,
  a11yLinkBtnsToTertiaryBtns: false,
  a11yRepeatedPageTitleFix: true,
  a11yDeliveryModeRadiogroup: true,
  a11yNgSelectOptionsCount: true,
  a11yNgSelectCloseDropdownOnEscape: true,
  a11ySelectImprovementsCustomerTicketingCreateSelectbox: false,
  a11yNgSelectAriaLabelDropdownCustomized: false,
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
  a11yMiniCartFocusOnMobile: false,
  a11yWrapReviewOrderInSection: true,
  a11yApprovalProcessWithNoClearable: true,
  a11yPostRegisterSuccessMessage: true,
  a11yDeleteButton2First: true,
  a11yShowLabelOfSelect: true,
  a11yShowDownArrowOnFocusedSelectMenu: true,
  a11yCroppedFocusRing: true,
  a11yTextSpacingAdjustments: true,
  a11yTableHeaderReadout: true,
  a11ySearchboxAssistiveMessage: true,
  updateConsentGivenInOnChanges: false,
  a11yDifferentiateFocusedAndSelected: true,
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
  useSiteThemeService: true,
  enableConsecutiveCharactersPasswordRequirement: true,
  enablePasswordsCannotMatchInPasswordUpdateForm: true,
  allPageMetaResolversEnabledInCsr: true,
  a11yPdpGridArrangement: true,
  a11yHamburgerMenuTrapFocus: false,
  useExtendedMediaComponentConfiguration: true,
  showRealTimeStockInPDP: true,
  a11yScrollToTopPositioning: false,
  a11yWideScreenImprovements: false,
  a11yOptimizedMenuSpacing: false,
  a11yNgSelectLayering: false,
  a11yNgSelectAriaControls: false,
  enableSecurePasswordValidation: true,
  enableCarouselCategoryProducts: false,
  enableClaimCustomerCouponWithCodeInRequestBody: false,
  enableReadDomainValuesOnDemand: false,
  opfEnablePreventingFromCheckoutWithoutEmail: false,
  storeFinderFacadeCleanup: false,
  defaultProductPageRouteAllowsNoProductName: false,
  enableMediaFetchPriority: false,
};
