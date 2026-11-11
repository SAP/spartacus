# Deprecated API cleanup in Spartacus 221121.24

This major release retires EPD Visualization and removes deprecated APIs from the active runtime. Historical migrations remain available for customers upgrading from earlier versions.

## EPD Visualization

The @spartacus/epd-visualization package, demo integration, styles, installation configuration and E2E scenarios have been removed. Remove the package and its modules, configuration and styles from your application. There is no replacement integration in this release.

## Migrating custom code

The deprecated API cleanup migration adds review comments to references to removed exported APIs and class members. It preserves customer code and feature-toggle values. Review each comment and adapt custom subclasses and templates before building.

Common replacements:

- Use layoutConfigFactory() instead of importing layoutConfig.
- Consume OutletContextData.context$ instead of context.
- Set CartItemListComponent.cartIsLoading instead of setLoading.
- Set ProductScrollComponent.scrollConfig instead of setConfig.
- Use MergeCartAndIncrementProcessesCount instead of MergeCart.
- Use StoreLocationService for store coordinates and directions.
- Use the configurator card attribute object instead of attributeId, attributeLabel and attributeName.

Removed deprecated declarations:

- `locationInitializedFactory`
- `SiteContextRoutesHandler.init`
- `SsrOptimizationOptions.debug`
- `TabParagraphContainerComponent.activeTabNum`
- `TabParagraphContainerComponent.ariaLabel`
- `TabParagraphContainerComponent.children`
- `TabParagraphContainerComponent.tabTitleParams`
- `TabParagraphContainerComponent.select`
- `TabParagraphContainerComponent.ngOnInit`
- `SiteContextSelectorComponent.siteContextService`
- `FacetComponent.toggleGroup`
- `OutletContextData.context`
- `layoutConfig`
- `MergeCart`
- `CheckoutDeliveryAddressComponent.getCardRole`
- `CheckoutPaymentFormComponent.useExtractedBillingAddressComponent`
- `OrderHistoryService.getQueryParams`
- `OrderHistoryFacade.getQueryParams`
- `newBudgetTableConfig`
- `newCostCenterTableConfig`
- `newPermissionTableConfig`
- `newUnitsTableConfig`
- `newUserGroupTableConfig`
- `newUserTableConfig`
- `ConfiguratorAttributeProductCardComponentOptions.attributeId`
- `ConfiguratorAttributeProductCardComponentOptions.attributeLabel`
- `ConfiguratorAttributeProductCardComponentOptions.attributeName`
- `ConfiguratorConflictAndErrorMessagesComponent.configuration$`
- `ConfiguratorGroupTitleComponent.ghostStyle`
- `ConfiguratorOverviewFilterButtonComponent.ghostStyle`
- `ConfiguratorOverviewFormComponent.ghostStyle`
- `ConfiguratorOverviewMenuComponent.VARIANT_CONFIG_OVERVIEW_NAVIGATION_SLOT`
- `ConfiguratorOverviewSidebarComponent.ghostStyle`
- `ConfiguratorProductTitleComponent.ghostStyle`
- `ConfiguratorProductTitleComponent.product$`
- `ConfiguratorTabBarComponent.ghostStyle`
- `QuoteLinksComponent.isShowDownloadProposalButtonFeatureEnabled`
- `StoreFinderService.getStoreLatitude`
- `StoreFinderService.getStoreLongitude`
- `StoreFinderService.getDirections`
- `StoreFinderFacade.getStoreLatitude`
- `StoreFinderFacade.getStoreLongitude`
- `StoreFinderFacade.getDirections`
- `SubscriptionBillingListComponent.onFilterDateChange`
- `SubscriptionBillingListComponent.onResetFilterDate`
- `SubscriptionBillingListComponent.onDateFilterSubmit`
- `OpfCheckoutPaymentAndReviewComponent.opfBaseFacade`
- `OpfSharedPaymentSubmitOptions.cartId`
- `OpfSharedPaymentSubmitCompleteOptions.cartId`
- `OpfPaymentGlobalMethods.submit.options.cartId`
- `OpfPaymentGlobalMethods.submitComplete.options.cartId`
- `OpfPaymentGlobalMethods.submitCompleteRedirect.options.cartId`
- `OpfPaymentConfig.cartId`
- `ApplePaySessionVerificationRequest.cartId`
- `S4ServiceOrderDetailActionsComponent.displayActions$`
- `S4ServiceOrderDetailActionsComponent.checkServiceStatus`
- `CartItemListComponent.setLoading`
- `ProductScrollComponent.setConfig`
- `ProductIntroComponent.areReviewsAvailable$`
- `ToggleLinkCellComponent.restoreFocus`

## Feature toggles

Named feature toggles, their defaults and both branches remain unchanged. The deprecated feature-level configuration and helpers, authorization-code-flow default switch and Sass forVersion gates are retained as part of that compatibility surface.

## Configurator number and currency formatting

Numeric input and CPQ price formatting use Intl.NumberFormat instead of deprecated Angular locale helpers. These paths use locales supported by the browser or Node runtime without requiring Angular locale registration. Locale tags with underscores are normalized to BCP 47 tags, and unsupported or malformed locales fall back to English with a development warning.

Numeric inputs retain Latin digits and use the locale's grouping and decimal separators. Currency display uses narrow symbols and the currency's default fraction digits, including zero fraction digits for JPY. Message rows retain distinct accessible IDs when message text is repeated.

## Dependency compatibility

Dependencies were reviewed against npm latest during this release. Four tooling dependencies require compatible versions:

| Dependency | Selected version | Compatibility constraint |
| --- | --- | --- |
| TypeScript | 6.0.3 | Angular 22 requires >=6.0 <6.1. TypeScript 7 does not provide the JavaScript compiler API used by ts-node and ts-loader. Standalone Actions compile with TypeScript 7.0.2. |
| Stylelint | 17.16.0 | The current SCSS plugin and shared configurations require Stylelint 17. |
| @babel/core | 7.29.13 | Jest syntax plugins and the Cypress webpack preprocessor require Babel 7. Angular build uses its own Babel 8. |
| @babel/preset-env | 7.29.7 | The Cypress preprocessor requires the Babel 7 preset. |
| jasmine-core | 6.3.0 | Jasmine 7 makes its patch points read-only, so Zone.js 0.16.3 cannot install its Jasmine integration. |

Repository builders use @angular/build. The direct @angular-devkit/build-angular, @angular/animations and @angular/platform-browser-dynamic dependencies are removed. Sass now defaults to the santorini-updated theme.
