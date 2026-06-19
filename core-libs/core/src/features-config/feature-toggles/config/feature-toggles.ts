/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// Let's NOT add here any wildcard property like
//  `[key: string]: boolean | undefined;`
// We want this interface to be STRICT and cause a compilation error when a removed property is used.
// Thanks to that, customers using a property that was recently removed, will know they have to adapt their code.
export interface FeatureTogglesInterface {
  /**
   * Adds a keyboard accessible zoom button to the `ProductImageZoomViewComponent`.
   */
  a11yKeyboardAccessibleZoom?: boolean;

  /**
   * When using CartItemListComponent as an outlet ([cxOutlet]="CartOutlets.CART_ITEM_LIST"):
   * prevents the form from being recreated when neither the items nor other dependent properties (e.g., readonly) have changed.
   */
  a11yPreventCartItemsFormRedundantRecreation?: boolean;

  /**
   * Adds label to 'StoreFinderSearchComponent' store search input field.
   */
  a11yStoreFinderLabel?: boolean;

  /**
   * Moves focus to the 'Back' button when store details are shown in the
   * store finder list, so keyboard users are not left without a focused element.
   */
  a11yStoreFinderFocusOnBackButton?: boolean;

  /**
   * Enables the dedicated B2B register section on the login page,
   * replacing the CMS-driven paragraph and link.
   */
  a11yB2BRegisterComponent?: boolean;

  /**
   * Replaces buttons resembling links with tetriary buttons in the following components:
   * `AddToWishListComponent`, `ProductIntroComponent`, `ProductImageZoomTriggerComponent`
   */
  a11yLinkBtnsToTertiaryBtns?: boolean;

  /**
   * Adds horizontal padding to the 'carousel-panel' to fix the issue where the focus only covers three sides of the 'Previous slide' and 'Next slide' buttons within the carousel section.
   * Affects: CarouselComponent
   */
  a11yAddPaddingToCarouselPanel?: boolean;

  /**
   * Introduces read more directive for presenting elements with long text.
   * Affects: ProductReviewsComponent
   */
  readMoreDirective?: boolean;

  /**
   * Introduces the read more directive in product list item summary
   * Affects: ProductListItemComponent
   */
  productListItemSummaryReadMore?: boolean;

  /**
   * Introduces characters left for product review form elements.
   * Affects: ProductReviewsComponent
   */
  productReviewCharactersLeft?: boolean;

  /**
   * Ensures on configurator overview page, that group titles are recognized as heading
   * in VPC mode when navigating with the 'H' key.
   */
  a11yConfiguratorOverviewHeaderVPC?: boolean;

  /**
   * Fixes accessibility issue in FutureStockAccordionComponent where aria-controls
   * references a non-existent element when accordion is collapsed.
   * When enabled, content element is always in DOM but hidden when collapsed,
   * ensuring aria-controls always references a valid ID.
   * Affects: FutureStockAccordionComponent
   */
  a11yFutureStockAccordionAriaControls?: boolean;

  /**
   * Use unicode characters for ng-select dropdown carets so that OS themes can override the defaults
   * by targetting text. This is not possible when using borders to draw shapes.
   */
  a11yNgSelectUnicodeCarets?: boolean;

  /**
   * When enabled, prevents Windows high contrast mode from overriding the Spartacus theme.
   * This ensures the application maintains its intended styling when the OS accessibility
   * mode is enabled, while still allowing users to manually select Spartacus high-contrast themes.
   */
  a11yPreventWindowsHighContrastOverride?: boolean;

  /**
   * When enabled, the product cards in the product list page will have a forced consistent size.
   * Affects the styles of: ProductGridItemComponent, ProductListItemComponent.
   */
  consistentSizeProductCards?: boolean;

  /**
   * Feature flag to disable the margin animation for the cx-page-slot component.
   * Disables the CSS animation on the `margin` property in the `cx-page-slot` component.
   * This animation was originally part of the legacy "defer loading" and "below the fold"
   * mechanism in Spartacus. Since this mechanism is no longer used in the current storefront,
   * the animation causes unnecessary layout shifts (CLS) and increased rendering cost (TBT).
   *
   * Enabling this flag removes the margin animation to improve performance and user experience.
   */
  disableCxPageSlotMarginAnimation?: boolean;

  /**
   * Updates recent-searches UX in `SearchBoxComponent` and CDS recent searches.
   *
   * Before (disabled):
   * - `SearchBoxComponent` can show the results panel on desktop with an empty query.
   * - Recent searches are a simple link list without removal controls.
   * - Recent searches still render when there are no suggestions or products.
   *
   * After (enabled):
   * - On desktop, the results panel renders only for a non-empty query; clearing the query clears results and closes the panel.
   * - `RecentSearchesComponent` adds per-item (X) buttons and a "Clear" action via CDS `removePhrase()` / `clearPhrases()`.
   * - Recent searches are hidden in no-results states.
   */
  searchBoxRecentSearchesRemoval?: boolean;

  /**
   * Corrects `BottomHeaderSlot` layout when CDS registers `MerchandisingCarouselComponent`
   * beside `BreadcrumbComponent` (e.g. on search results pages in sample data).
   *
   * Before (disabled):
   * - `BottomHeaderSlot` lays out all children in a single flex row with no wrapping.
   * - `cx-breadcrumb` and `cx-merchandising-carousel` each grow to ~50% of the slot width.
   * - Breadcrumb title and trail are centered only within that half, so the block looks
   *   left-aligned on the page (unlike develop without CDS, where the carousel is absent
   *   and the breadcrumb is the sole child at full width).
   * - `cx-merchandising-carousel` stays in the flex row even when it has no data and
   *   renders no inner `cx-carousel`, leaving empty space beside the breadcrumb.
   *
   * After (enabled):
   * - `cx-breadcrumb` always spans 100% of the slot width on its own row.
   * - `cx-merchandising-carousel` is shown on a separate row only when it renders an
   *   inner `cx-carousel`; otherwise the host is hidden and does not affect layout.
   */
  cdsBottomHeaderSlotAdjustPosition?: boolean;

  /**
   * When enabled, the new carousel component `<cx-carousel-scrolling>` will be used
   * in the following components instead of the old `<cx-carousel>`:
   * - `ProductCarouselComponent`
   * - `ProductReferencesComponent`
   * - `ProductImagesComponent` and related `ProductImageZoomProductImagesComponent`
   *
   * The previous carousel had number of issues:
   * - Caused huge layout shift when transitioning from SSR to CSR on desktop viewport,
   *     because in SSR there was rendered just 1 carousel item, but in desktop CSR 4 items
   *     appeared after a while (especially noticeable with Chrome DevTools Network throttling)
   * - Eagerly-loaded images also from invisible slides, even when Spartacus was configured
   *     to lazy load of all images: `provideConfig({ imageLoadingStrategy: ImageLoadingStrategy.LAZY})`
   * - Was not swipe-friendly on mobile devices
   *
   * The new carousel:
   * - Doesn't suffer from huge layout shifts when transitioning from SSR to CSR anymore, because of
   *    rendering the same HTML both in SSR and when CSR kicks in after a delay,
   *    so the same number of carousel items is visible in SSR HTML and CSR HTML.
   * - It's lazy loading invisible images thanks to native horizontal scrolling (when Spartacus
   *    is configured to lazy load all images: `provideConfig({ imageLoadingStrategy: ImageLoadingStrategy.LAZY})`)
   * - It's swipe-friendly on touch devices thanks to its native horizontal scrolling
   */
  productCarouselScrolling?: boolean;

  /**
   * Feature flag to enable using the new LOGIN_EVENTS token instead of the ActionsSubject LOGIN stream for tracking.
   *
   * When enabled, the new LOGIN_EVENTS token will be used instead of the ActionsSubject LOGIN stream.
   * This is needed to support code flow authentication. If we are using the ActionsSubject LOGIN stream,
   * the login event won't be captured once we are redirected back from the auth server.
   *
   * Used in `ProfileTagLifecycleService`
   */
  cdsLoginEventsToken?: boolean;

  /**
   * Feature flag to enable using <link rel=preconnect> in the index.html.
   *
   * ## When enabled:
   * Adding rel=preconnect to a <link> informs the browser that your page intends to establish a connection to another domain,
   * and that you'd like the process to start as soon as possible. Resources will load more quickly because the setup process
   * has already been completed by the time the browser requests them.
   *
   * Note: Preconnecting is not needed (and won't be performed) if the domain of the media base url is the same as the storefront's domain.
   */
  createMediaPreconnectLink?: boolean;

  /**
   * When enabled, sets the default oAuth configuration to use authorization code flow with PKCE.
   * This results in a more secure authorization scheme as the default configuration.
   *
   * NOTE: This flag should only be enabled when used with a CCv2 Authorization Server running the
   * September 2025 update or higher. The CCv2 Authorization Server only supports Authorization Code
   * flow for public clients from that version and onwards.
   */
  authorizationCodeFlowByDefault?: boolean;

  /**
   * When enabled, refreshes the CSRF token before submitting the login form in the
   * Authorization Code Flow. This ensures the token is valid even if the user has
   * waited on the login page past the Authorization Server session timeout, preventing
   * an HTTP 403 response from the backend that would otherwise strand the user on a
   * backend error page.
   *
   * NOTE: Only applies when `authorizationCodeFlowByDefault` is also enabled.
   */
  authorizationCodeFlowByDefaultCsrfTokenRefresh?: boolean;

  /**
   * Feature flag to enable consistent header slot structure across breakpoints to reduce
   * layout shift and improve Cumulative Layout Shift (CLS) scores.
   *
   * On desktop devices (non-mobile), some header and navigation elements were rendered
   * only after client-side rendering (CSR), resulting in noticeable layout shifts. This negatively
   * affected the user experience and CLS performance.
   *
   * When enabled:
   * - Desktop uses the same header slot structure as mobile.
   * - Reduces layout shift and improves perceived performance and visual stability.
   *
   *  ⚠️ To fully enable this feature, replace `provideConfig(layoutConfig)` in your codebase
   * with `provideConfigFactory(layoutConfigFactory)`.
   */
  unifiedDefaultHeaderSlotsAcrossBreakpoints?: boolean;

  /**
   * Flag to enable reserving space for product images to prevent CLS (Cumulative Layout Shift) issues.
   *
   * When enabled, it ensures that appropriate space is reserved for images before they load,
   * maintaining layout stability across the following contexts:
   *
   * - **PDP (Product Detail Page)**: Reserves space for the main product image.
   * - **PLP (Product Listing Page) - List View**: Reserves space for each product image in list layout.
   * - **PLP (Product Listing Page) - Grid View**: Reserves space for each product image in grid layout.
   *
   * This helps improve Core Web Vitals by preventing layout shifts as images load.
   */
  reserveSpaceForImagesOnPdpAndPlp?: boolean;

  /**
   * Feature flag to control the default image loading strategy.
   *
   * By default, the `MediaComponent` used the `loading="eager"` attribute for all images,
   * due to the fallback logic in the `MediaService`, which defaults to
   * `imageLoadingStrategy: EAGER` when no explicit configuration is provided.
   *
   * This flag, when enabled, changes the default image loading behavior to use
   * `loading="lazy"` instead. This ensures that images below the fold are not downloaded
   * immediately, reducing unnecessary network usage and improving performance.
   *
   * Lazy loading frees up bandwidth to prioritize more important assets,
   * such as the largest content element on the page, which can positively
   * impact the LCP (Largest Contentful Paint) metric.
   *
   * When all images are lazy loaded by default, you should explicitly prioritize LCP images,
   * by specifying CMS component IDs via the Spartacus config:
   * `provideConfig({ lcpCmsComponents: ... })`
   * ... or by passing the special input directly to the `MediaComponent`:
   * `<cx-media [fetchPriority]="ImageFetchPriority.HIGH" ... >`
   *
   * Set to `true` to enable lazy loading by default.
   */
  lazyLoadImagesByDefault?: boolean;

  /**
   * Feature flag to enable incrementing the processes count for the merge cart action.
   *
   * When enabled, the processes count will be incremented for the merge cart action.
   * This is needed to prevent premature cart loading, that especially affects the authorization code flow that requires redirection to the auth server and back.
   */
  incrementProcessesCountForMergeCart?: boolean;

  /**
   * Controls when the Login action is dispatched during OAuth URL parameter checking.
   *
   * When set to `true`, enables the new behavior where the Login action is only dispatched when
   * `tokenReceived` is true, meaning the token was received during the current `tryLogin()` attempt.
   *
   * When set to `false`, maintains the legacy behavior where the Login action will be dispatched in all
   * successful login scenarios during `checkOAuthParamsInUrl()`, regardless of whether the token was
   * received in the current attempt or retrieved from storage (e.g., page refresh).
   *
   * Affects: `AuthService`
   */
  dispatchLoginActionOnlyWhenTokenReceived?: boolean;

  /**
   * Previously the default Spartacus layout config contained the property `pageFold`
   * for the following layouts:
   * - `LandingPage2Template`
   * - `CategoryPageTemplate`
   * - `ProductDetailsPageTemplate`
   *
   * When this feature toggle is enabled, the `pageFold` property is removed from those layout configs.
   *
   * It is to improve the CLS (Cumulative Layout Shift) metric. Previously the `pageFold` property
   * caused the CMS components to be rendered only after a small delay even in SSR pages,
   * which caused a layout shift.
   *
   * ⚠️ To fully enable this feature toggle, you need to also replace `provideConfig(layoutConfig)`
   * in your codebase with `provideConfigFactory(layoutConfigFactory)`.
   */
  defaultLayoutConfigWithoutPageFold?: boolean;

  /**
   * When this feature toggle is enabled, the navigation menu will close when clicking on the same link.
   *
   * This is to improve the user experience on mobile devices, where the menu remains open
   * after clicking on a link that navigates to the same page.
   * Affects: `NavigationUIComponent`
   */
  navigationMenuCloseOnSameLinkClick?: boolean;

  /**
   * When enabled, translates the "Password expired" error message
   * to the user's selected language using Spartacus i18n.
   * Affects: `LoginComponent`
   */
  enablePasswordExpiredErrorTranslation?: boolean;

  /**
   * shows the Quote Purchase Order Number input field in the Quote Request form
   * and in the Quote Details page
   *
   * when set to `true`, the user will be able to enter a Purchase Order Number
   * when requesting a quote and see it in the quote details
   */
  enableQuotePurchaseOrderNumber?: boolean;

  /**
   * When enabled, fixes the issue with return order returnable quantity not being displayed correctly
   * on the `ReturnOrderComponent` when navigating to the return request details page.
   * Affects: `ReturnOrderComponent`
   */
  enableReturnOrderReturnableQuantityConsigmentFallback?: boolean;

  /**
   * When enabled, the media prefix from the backend config will be used
   * when constructing media URLs in the MediaService.
   * Affects: `MediaService`
   */
  enableMediaPrefix?: boolean;

  /**
   * Fixes focus ring on store name links overflowing into the address text below.
   * Affects: StoreFinderListItemComponent
   */
  a11yStoreFinderListItemFocus?: boolean;

  /**
   * Fixes double focus indicator on the search input field in `SearchBoxComponent`
   * when navigating with the keyboard.
   * A global `input:focus` rule in forms.scss applies `visible-focus()` to the input element,
   * while `.cx-label-inner-container:focus-within` also applies it to the container,
   * resulting in two visible focus rings simultaneously.
   * When enabled, the input's own focus outline is suppressed so only the container ring is shown.
   * Affects: SearchBoxComponent
   */
  a11yFixSearchBoxDoubleFocus?: boolean;

  /**
   * Fixes keyboard focus not being visible when tabbing between some buttons
   * on Customer Ticketing dialog.
   */
  a11yCustomerTicketingVisualFocusFix?: boolean;

  /**
   * Adds Filter By label to product facets when in desktop mode.
   */
  a11yFacetFilterByLabel?: boolean;

  /**
   * When enabled, this fixes the issue of duplicated Order History headers on the Order History page.
   */
  removeDuplicatedOrderHistoryHeader?: boolean;

  /**
   * When enabled, the organization's table component will stop re-rendering its rows each data update.
   * This improves the screen reader experience of the notification message component.
   * Affects: `NotificationMessageComponent`, `CellComponent`, `UnitDetailsComponent`, `TableComponent`
   */
  a11yCardNotificationMessage?: boolean;

  /**
   * When enabled, allows searching cost centers by name in the organization.
   */
  enableB2BCostCenterSearch?: boolean;

  /**
   * When enabled, allows searching B2B units by name in the organization administration.
   * This search is performed on the client side since the full unit tree is already loaded.
   */
  enableB2BUnitSearch?: boolean;

  /**
   * When enabled, allows searching B2B customers by name in the organization.
   */
  enableB2BCustomerSearch?: boolean;

  /**
   * When enabled (default: true), carousel navigation buttons call preventDefault on mousedown
   * to fix unwanted blur in Safari when the carousel is inside modals or search boxes (broken by default in Safari).
   *
   * Set to `false` if you rely on custom focus listeners (e.g. addEventListener('focus', ...)) on elements
   * that contain or interact with the carousel, since preventing mousedown default can affect focus behavior.
   * Affects: `CarouselComponent` (when preventNavigationFocus input is true, e.g. in SearchBoxComponent)
   */
  a11yCarouselPreventNavigationFocus?: boolean;

  /**
   * Sets the ng-select (readonly) input value from the selected option text,
   * so that JAWS screen reader announces the selected value instead of "blank" when ngSelect's input element is in focus.
   * Affects: `NgSelectA11yDirective`
   */
  a11yNgSelectReadonlyInputValue?: boolean;

  /**
   * Fixes doubled screen reader output by providing a static title and aria-label to the password visibility toggle.
   * Affects: `PasswordVisibilityToggleComponent`
   */
  a11yPasswordVisibilityToggle?: boolean;

  /**
   * When enabled, only active currencies will be displayed in the currency selector.
   * Currencies are filtered based on the `active` property returned from the backend.
   * Affects: `CurrencyService`
   */
  showOnlyActiveCurrencies?: boolean;

  /**
   * Improves accessibility of the "Added to Cart" dialog by using a semantic h2 heading
   * instead of a div for the dialog title. This provides better screen reader navigation
   * and follows WAI-ARIA dialog pattern best practices.
   * Affects: AddedToCartDialogComponent
   */
  a11yAddedToCartDialogHeading?: boolean;

  /**
   * Ensures the facet component displays elements with proper listbox semantics.
   * The screen reader should recognize links as listbox options and display visible-focus outlines correctly.
   * Affects: FacetComponent
   */
  a11yListSemanticsForFacets?: boolean;

  /**
   * Hides empty outlet wrapper elements in the cart item list table when they have no content.
   * Otherwise screen readers would interpret them as extra table columns.
   * Affects: CartItemListComponent
   */
  a11yCartItemListHideEmptyOutlets?: boolean;

  /**
   * When enabled, adds arrow key navigation between reviews and uses proper list
   * semantics so screen readers announce list position
   * Affects: ProductReviewsComponent
   */
  a11yReviewsKeyboardControls?: boolean;

  /**
   * Use on existing form buttons that are programatically disabled/enabled.
   * To use, duplicate button and use false in original and true in duplicate. The duplicated button
   * should be initialized as enabled, clickable and use cx-form-errors in outcomes where original button
   * is in disabled state.
   */
  a11yCartQuickOrderFormEnableSubmitAndAddValidation?: boolean;

  /**
   * When enabled, adds vocalization of dropdown item count when dropdown gains focus.
   * Affects: cxNgSelectA11y
   */
  a11yVocalizeDropdownItemCount?: boolean;

  /**
   * When enabled, keystrokes inside an ng-select (combobox dropdown) are treated
   * as navigation rather than form filling. This preserves the focus outline
   * (removes the `mouse-focus` class) when the user opens a dropdown with the
   * mouse and then navigates with the keyboard.
   * Affects: `NgSelectA11yDirective`
   */
  a11yRestoreFocusOnNgSelect?: boolean;

  /**
   * When enabled, forms using CustomFormValidators.securePasswordValidators will include:
   * CustomFormValidators.mustEndWithLegalCharacter
   */
  useEnhancedSecurePasswordValidators?: boolean;

  /**
   * When enabled, uses `POST /carts/{cartId}/removeVoucher` with the voucherId
   * in the request body instead of `DELETE /carts/{cartId}/vouchers/{voucherId}`.
   * Requires the corresponding OCC endpoint to be available on the backend (from 2211.28 version).
   */
  enableRemoveVoucherEndpoint?: boolean;

  /**
   * When enabled, shows sort fields only at the top of the table.
   * When disabled, shows sort fields at both top and bottom.
   */
  showSortFieldsOnlyAtTop?: boolean;

  /**
   * When enabled, displays required field asterisks for form fields.
   */
  showRequiredAsterisks?: boolean;

  /**
   * Preserves keyboard focus on consent checkboxes after toggling.
   * Treats Space/Enter on checkbox/radio as navigation in VisibleFocusDirective
   * and restores focus after the consent form is temporarily disabled.
   * Affects: VisibleFocusDirective, ConsentManagementFormComponent, ConsentManagementComponent
   */
  a11yConsentManagementFocusPreservation?: boolean;

  /**
   * When enabled, `AuthHttpHeaderService` executes DI-provided
   * `ExpiredRefreshTokenHandler` to take over `handleExpiredRefreshToken()` behavior in case of expired refresh token scenarios.
   * It avoids the need to override the entire AuthHttpHeaderService just to handle expired refresh token scenarios in a custom way, for example by ending punchout session when it's active.
   * Affects: `AuthHttpHeaderService`
   */
  enableExpiredRefreshTokenHandlers?: boolean;

  /**
   * When enabled, sytling is changed on navigation header and menu to be more cohesive.
   */
  alignNavigationMenuWithHeader?: boolean;

  /**
   * When enabled, fixes a known issue where the cart sometimes does not reload properly on context(language or currency) change,
   * deleting items from the cart (more specifically on the following sequence : logout - log back in - context change)
   */
  enableCartReloadOnContextChange?: boolean;

  /* When enabled, `OpfPaymentVerificationComponent` calls
   * `checkIfProcessingCartIdExist()` only on verification error.
   *
   * Legacy behavior called it immediately during init.
   */
  opfPaymentVerificationCheckProcessingCartOnErrorOnly?: boolean;

  /**
   * When enabled, the Quick Order search input keeps focus after
   * the reset button is cleared, instead of losing focus to the
   * next tabbable element.
   * Affects: QuickOrderFormComponent
   */
  a11yQuickOrderResetFocus?: boolean;

  /**
   * When enabled, the "Notification Channels" link in the My Coupons page
   * is styled as a link (blue, underlined) instead of plain text.
   */
  a11yCouponNotificationChannelsLinkStyling?: boolean;

  /**
   * When enabled, fixes a known issue where the last remembered route after logout is the route to which the logout has redirected
   */
  redirectOnlyOnTrueNavigationEnd?: boolean;

  pageLinkSanitizeCanonicalUrl?: boolean;

  /**
   * When enabled, OPF components use `DestroyRef` + `takeUntilDestroyed` for
   * subscription management instead of manual `Subscription` objects and `ngOnDestroy`.
   */
  opfUseDestroyRef?: boolean;

  /**
   * When enabled, the address book and address form support hierarchical
   * address formats (e.g. Chinese addresses), which require selecting
   * region (province), city and district as chained dropdowns,
   * and skip OCC address verification for the supported countries.
   *
   * Also makes `OccUserAddressAdapter.loadAll()` request the FULL address
   * fields set, so that nested `city` / `cityDistrict` references are returned.
   *
   * Affects:
   * - `AddressBookComponent`
   * - `AddressFormComponent`
   * - `OccUserAddressAdapter`
   */
  enableHierarchicalAddressFormat?: boolean;

  /* When enabled, OPF checkout payment flow calls `updatePaymentTransaction`
   * instead of `initiatePayment` while selecting/re-initiating payment.
   *
   * Legacy behavior uses `initiatePayment`.
   */
  opfCheckoutUseUpdatePaymentTransaction?: boolean;
  /**
   * When enabled, adds an 8px top margin to the "Add to Wish List" button
   * for consistent spacing.
   * Affects: AddToWishListComponent
   */
  a11yAddToWishListBtnMargin?: boolean;

  /**
   * When enabled, applies a 6px bottom margin to product names in both
   * product grid and product list items for consistent spacing.
   * Affects: ProductGridItemComponent, ProductListItemComponent
   */
  a11yProductListItemNameMargin?: boolean;
  
  /**
   * When enabled, logging out on a tab will issue logout on all other open tabs.  This prevents leaking
   * authenticated data through stale tabs.
   */
  propagateLogoutToAllTabs?: boolean;

  /**
   * When enabled, adds support for asynchronous configuration of the oAuth service and adds a default
   * initializer to adjust the oauth client details based on URL context parameters.
   *
   * This flag only takes effect when the flag `authorizationCodeFlowByDefault` is enabled.
   */
  asyncAuthConfigInitializer?: boolean;
}

export const defaultFeatureToggles: Required<FeatureTogglesInterface> = {
  alignNavigationMenuWithHeader: false,
  a11yKeyboardAccessibleZoom: false,
  a11yPreventCartItemsFormRedundantRecreation: false,
  a11yStoreFinderLabel: false,
  a11yStoreFinderFocusOnBackButton: false,
  a11yB2BRegisterComponent: false,
  a11yLinkBtnsToTertiaryBtns: false,
  a11yAddPaddingToCarouselPanel: false,
  a11yNgSelectUnicodeCarets: false,
  a11yPreventWindowsHighContrastOverride: false,
  readMoreDirective: true,
  productListItemSummaryReadMore: false,
  productReviewCharactersLeft: true,
  a11yConfiguratorOverviewHeaderVPC: true,
  a11yFutureStockAccordionAriaControls: false,
  consistentSizeProductCards: true,
  disableCxPageSlotMarginAnimation: true,
  productCarouselScrolling: true,
  cdsLoginEventsToken: true,
  createMediaPreconnectLink: true,
  unifiedDefaultHeaderSlotsAcrossBreakpoints: true,
  reserveSpaceForImagesOnPdpAndPlp: true,
  lazyLoadImagesByDefault: true,
  authorizationCodeFlowByDefault: true,
  authorizationCodeFlowByDefaultCsrfTokenRefresh: true,
  incrementProcessesCountForMergeCart: true,
  dispatchLoginActionOnlyWhenTokenReceived: true,
  defaultLayoutConfigWithoutPageFold: true,
  navigationMenuCloseOnSameLinkClick: true,
  enablePasswordExpiredErrorTranslation: true,
  enableQuotePurchaseOrderNumber: true,
  enableReturnOrderReturnableQuantityConsigmentFallback: true,
  enableMediaPrefix: false,
  a11yCustomerTicketingVisualFocusFix: false,
  a11yStoreFinderListItemFocus: false,
  a11yFixSearchBoxDoubleFocus: false,
  a11yFacetFilterByLabel: false,
  removeDuplicatedOrderHistoryHeader: false,
  a11yCardNotificationMessage: false,
  searchBoxRecentSearchesRemoval: false,
  cdsBottomHeaderSlotAdjustPosition: false,
  enableB2BUnitSearch: false,
  enableB2BCostCenterSearch: false,
  enableB2BCustomerSearch: false,
  a11yCarouselPreventNavigationFocus: false,
  a11yNgSelectReadonlyInputValue: false,
  a11yPasswordVisibilityToggle: false,
  showOnlyActiveCurrencies: false,
  a11yAddedToCartDialogHeading: false,
  a11yListSemanticsForFacets: false,
  a11yCartItemListHideEmptyOutlets: false,
  a11yReviewsKeyboardControls: false,
  a11yCartQuickOrderFormEnableSubmitAndAddValidation: false,
  a11yConsentManagementFocusPreservation: false,
  a11yVocalizeDropdownItemCount: false,
  a11yRestoreFocusOnNgSelect: false,
  useEnhancedSecurePasswordValidators: false,
  enableRemoveVoucherEndpoint: false,
  showSortFieldsOnlyAtTop: false,
  showRequiredAsterisks: false,
  enableExpiredRefreshTokenHandlers: false,
  enableCartReloadOnContextChange: false,
  opfPaymentVerificationCheckProcessingCartOnErrorOnly: false,
  a11yQuickOrderResetFocus: false,
  a11yCouponNotificationChannelsLinkStyling: false,
  redirectOnlyOnTrueNavigationEnd: false,
  pageLinkSanitizeCanonicalUrl: false,
  opfUseDestroyRef: false,
  enableHierarchicalAddressFormat: false,
  opfCheckoutUseUpdatePaymentTransaction: false,
  a11yAddToWishListBtnMargin: false,
  a11yProductListItemNameMargin: false,
  propagateLogoutToAllTabs: false,
  asyncAuthConfigInitializer: false,
};
