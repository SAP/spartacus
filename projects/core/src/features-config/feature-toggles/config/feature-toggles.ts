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
   * `FormErrorsComponent` replace role="alert" to aria-live="polite" as default
   *  together with aria-live="atomic"
   */
  a11yImprovedErrorMessage?: boolean;

  /**
   * Replaces buttons resembling links with tetriary buttons in the following components:
   * `AddToWishListComponent`, `ProductIntroComponent`, `ProductImageZoomTriggerComponent`
   */
  a11yLinkBtnsToTertiaryBtns?: boolean;

  /**
   * 'NgSelectA11yDirective' will close a dropdown with options on Escape key press
   * when a screen reader is used.
   * Replaces select with ng-select component in the following component:
   * `CustomerTicketingCreateDialogComponent`
   */
  a11ySelectImprovementsCustomerTicketingCreateSelectbox?: boolean;

  /**
   * Adds horizontal padding to the 'carousel-panel' to fix the issue where the focus only covers three sides of the 'Previous slide' and 'Next slide' buttons within the carousel section.
   * Affects: CarouselComponent
   */
  a11yAddPaddingToCarouselPanel?: boolean;

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
   * Introduces read more directive for presenting elements with long text.
   * Affects: ProductReviewsComponent
   */
  readMoreDirective?: boolean;

  /**
   * Introduces characters left for product review form elements.
   * Affects: ProductReviewsComponent
   */
  productReviewCharactersLeft?: boolean;

  /**
   * The optional `aria-controls` attribute will override on the NgSelect implementation.
   * The updated library employs the `aria-controls` attribute to indicate the relationship between the button and the dropdown.
   * This change ensures we can still use a custom id if preferable.
   */
  a11yNgSelectAriaControls?: boolean;

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
   * When enabled, the product cards in the product list page will have a forced consistent size.
   * Affects the styles of: ProductGridItemComponent, ProductListItemComponent.
   */
  consistentSizeProductCards?: boolean;

  /**
   * Reserve horizontal space for Star Rating component to prevent CLS on PDP.
   * When enabled, the `cx-star-rating` component will reserve horizontal space for the star rating component to prevent CLS on PDP
   * Otherwise the component has no width initially, and gets wider only after a delay.
   * when Font Awesome font is loaded and Star icons are rendered.
   */
  reserveHorizontalSpaceStarRating?: boolean;

  /**
   * Feature flag to enable using `transform: translateX` instead of animating the `margin` property
   * for the top progress bar animation.
   *
   * ## Why this flag exists:
   * Animating the `margin` property has two major downsides:
   *
   * 1. **Cumulative Layout Shift (CLS)**: Changing margin causes layout shifts that negatively impact visual stability.
   * 2. **Performance impact**: Margin animations trigger browser re-layouts (reflows), increasing layout and paint costs,
   *    which contributes to poor performance metrics like Total Blocking Time (TBT).
   *
   * ## When enabled:
   * The top progress bar will animate using `transform: translateX(...)`, which is a GPU-accelerated,
   * layout-independent operation that improves visual performance and avoids layout shifts.
   */
  topProgressBarUseTransformAnimation?: boolean;

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
   * Fixes keyboard focus not being visible when tabbing between some buttons
   * on Customer Ticketing dialog.
   */
  a11yCustomerTicketingVisualFocusFix?: boolean;

  /**
   * Adds Filter By label to product facets when in desktop mode.
   */
  a11yFacetFilterByLabel?: boolean;
}

export const defaultFeatureToggles: Required<FeatureTogglesInterface> = {
  a11yKeyboardAccessibleZoom: false,
  a11yPreventCartItemsFormRedundantRecreation: false,
  a11yStoreFinderLabel: false,
  a11yImprovedErrorMessage: true,
  a11yLinkBtnsToTertiaryBtns: false,
  a11ySelectImprovementsCustomerTicketingCreateSelectbox: true,
  a11yAddPaddingToCarouselPanel: false,
  a11yWideScreenImprovements: true,
  a11yOptimizedMenuSpacing: true,
  a11yNgSelectLayering: true,
  a11yNgSelectUnicodeCarets: false,
  readMoreDirective: true,
  productReviewCharactersLeft: true,
  a11yNgSelectAriaControls: true,
  a11yConfiguratorOverviewHeaderVPC: false,
  a11yFutureStockAccordionAriaControls: false,
  enableReadDomainValuesOnDemand: true,
  opfEnablePreventingFromCheckoutWithoutEmail: true,
  storeFinderFacadeCleanup: true,
  defaultProductPageRouteAllowsNoProductName: true,
  consistentSizeProductCards: true,
  reserveHorizontalSpaceStarRating: true,
  topProgressBarUseTransformAnimation: true,
  disableCxPageSlotMarginAnimation: true,
  productCarouselScrolling: true,
  cdsLoginEventsToken: false,
  createMediaPreconnectLink: true,
  unifiedDefaultHeaderSlotsAcrossBreakpoints: true,
  reserveSpaceForImagesOnPdpAndPlp: true,
  lazyLoadImagesByDefault: true,
  authorizationCodeFlowByDefault: false,
  incrementProcessesCountForMergeCart: true,
  dispatchLoginActionOnlyWhenTokenReceived: false,
  defaultLayoutConfigWithoutPageFold: true,
  navigationMenuCloseOnSameLinkClick: false,
  enablePasswordExpiredErrorTranslation: false,
  enableQuotePurchaseOrderNumber: false,
  enableReturnOrderReturnableQuantityConsigmentFallback: false,
  a11yCustomerTicketingVisualFocusFix: false,
  a11yFacetFilterByLabel: false,
};
