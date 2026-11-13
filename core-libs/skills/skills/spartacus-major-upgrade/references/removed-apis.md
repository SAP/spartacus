# Removed API lookup for Spartacus 221121.24

Use this lookup for customer imports, subclass hooks, object properties and copied templates. It reflects the 51 removed-member and 9 non-EPD removed-export records in the release migration. The 94 EPD export records share the package retirement described below. It does not enumerate every possible customer usage or the separate constructor signatures.

A recorded replacement identifies the target API; check its type and behavior before editing. Manual adaptation means the migration has no mechanical replacement: review the target feature and preserve the customer requirement. Schematic TODO comments do not implement these changes. [Concrete recipes](code-migrations.md) cover the common transformations.

## Removed exports

| Old export | Public entry point | Target migration |
| --- | --- | --- |
| locationInitializedFactory | @spartacus/core | Manual adaptation; no replacement recorded. |
| layoutConfig | @spartacus/storefront | provideConfigFactory(layoutConfigFactory) instead. |
| MergeCart | @spartacus/cart/base/core | MergeCartAndIncrementProcessesCount instead. |
| newBudgetTableConfig | @spartacus/organization/administration/components | budgetTableConfig instead. |
| newCostCenterTableConfig | @spartacus/organization/administration/components | costCenterTableConfig instead. |
| newPermissionTableConfig | @spartacus/organization/administration/components | permisionTableConfig instead. |
| newUnitsTableConfig | @spartacus/organization/administration/components | unitsTableConfig instead. |
| newUserGroupTableConfig | @spartacus/organization/administration/components | userGroupTableConfig instead. |
| newUserTableConfig | @spartacus/organization/administration/components | userTableConfig instead. |

The public permission config is spelled permisionTableConfig in this target. Check the declaration rather than correcting the spelling to an invented export.

## Removed members

| Old member | Public entry point | Target migration |
| --- | --- | --- |
| SiteContextRoutesHandler.init | @spartacus/core | initOnce instead. |
| SsrOptimizationOptions.debug | @spartacus/setup/ssr | Manual adaptation. |
| TabParagraphContainerComponent.activeTabNum | @spartacus/storefront | Manual adaptation. |
| TabParagraphContainerComponent.ariaLabel | @spartacus/storefront | Manual adaptation. |
| TabParagraphContainerComponent.children | @spartacus/storefront | Manual adaptation. |
| TabParagraphContainerComponent.tabTitleParams | @spartacus/storefront | Manual adaptation. |
| TabParagraphContainerComponent.select | @spartacus/storefront | Manual adaptation. |
| TabParagraphContainerComponent.ngOnInit | @spartacus/storefront | Manual adaptation. |
| SiteContextSelectorComponent.siteContextService | @spartacus/storefront | Manual adaptation. |
| FacetComponent.toggleGroup | @spartacus/storefront | Manual adaptation. |
| OutletContextData.context | @spartacus/storefront | context$ instead. |
| CheckoutDeliveryAddressComponent.getCardRole | @spartacus/checkout/base/components | Manual adaptation. |
| CheckoutPaymentFormComponent.useExtractedBillingAddressComponent | @spartacus/checkout/base/components | Manual adaptation. |
| OrderHistoryService.getQueryParams | @spartacus/order/core | OrderHistoryComponent.getQueryParams instead. |
| OrderHistoryFacade.getQueryParams | @spartacus/order/root | OrderHistoryComponent.getQueryParams instead. |
| ConfiguratorAttributeProductCardComponentOptions.attributeId | @spartacus/product-configurator/rulebased | attribute and getAttributeCode(attribute) instead. |
| ConfiguratorAttributeProductCardComponentOptions.attributeLabel | @spartacus/product-configurator/rulebased | attribute.label instead. |
| ConfiguratorAttributeProductCardComponentOptions.attributeName | @spartacus/product-configurator/rulebased | attribute.name instead. |
| ConfiguratorConflictAndErrorMessagesComponent.configuration$ | @spartacus/product-configurator/rulebased | messages$ instead. |
| ConfiguratorGroupTitleComponent.ghostStyle | @spartacus/product-configurator/rulebased | the loading template instead. |
| ConfiguratorOverviewFilterButtonComponent.ghostStyle | @spartacus/product-configurator/rulebased | the loading template instead. |
| ConfiguratorOverviewFormComponent.ghostStyle | @spartacus/product-configurator/rulebased | the loading template instead. |
| ConfiguratorOverviewMenuComponent.VARIANT_CONFIG_OVERVIEW_NAVIGATION_SLOT | @spartacus/product-configurator/rulebased | Manual adaptation. |
| ConfiguratorOverviewSidebarComponent.ghostStyle | @spartacus/product-configurator/rulebased | the loading template instead. |
| ConfiguratorProductTitleComponent.ghostStyle | @spartacus/product-configurator/rulebased | the loading template instead. |
| ConfiguratorProductTitleComponent.product$ | @spartacus/product-configurator/rulebased | the product property emitted by productTitleData$ instead. |
| ConfiguratorTabBarComponent.ghostStyle | @spartacus/product-configurator/rulebased | the loading template instead. |
| QuoteLinksComponent.isShowDownloadProposalButtonFeatureEnabled | @spartacus/quote/components | Manual adaptation. |
| StoreFinderService.getStoreLatitude | @spartacus/storefinder/core | StoreLocationService.getStoreLatitude instead. |
| StoreFinderService.getStoreLongitude | @spartacus/storefinder/core | StoreLocationService.getStoreLongitude instead. |
| StoreFinderService.getDirections | @spartacus/storefinder/core | StoreLocationService.getDirections instead. |
| StoreFinderFacade.getStoreLatitude | @spartacus/storefinder/root | StoreLocationService.getStoreLatitude instead. |
| StoreFinderFacade.getStoreLongitude | @spartacus/storefinder/root | StoreLocationService.getStoreLongitude instead. |
| StoreFinderFacade.getDirections | @spartacus/storefinder/root | StoreLocationService.getDirections instead. |
| SubscriptionBillingListComponent.onFilterDateChange | @spartacus/subscription-billing/components | Manual adaptation. |
| SubscriptionBillingListComponent.onResetFilterDate | @spartacus/subscription-billing/components | Manual adaptation. |
| SubscriptionBillingListComponent.onDateFilterSubmit | @spartacus/subscription-billing/components | Manual adaptation. |
| OpfCheckoutPaymentAndReviewComponent.opfBaseFacade | @spartacus/opf/checkout/components | Manual adaptation. |
| OpfSharedPaymentSubmitOptions.cartId | @spartacus/opf/global-functions/core | Manual adaptation. |
| OpfSharedPaymentSubmitCompleteOptions.cartId | @spartacus/opf/global-functions/core | Manual adaptation. |
| OpfPaymentGlobalMethods.submit.options.cartId | @spartacus/opf/payment/root | Manual adaptation. |
| OpfPaymentGlobalMethods.submitComplete.options.cartId | @spartacus/opf/payment/root | Manual adaptation. |
| OpfPaymentGlobalMethods.submitCompleteRedirect.options.cartId | @spartacus/opf/payment/root | Manual adaptation. |
| OpfPaymentConfig.cartId | @spartacus/opf/payment/root | Manual adaptation. |
| ApplePaySessionVerificationRequest.cartId | @spartacus/opf/quick-buy/root | Manual adaptation. |
| S4ServiceOrderDetailActionsComponent.displayActions$ | @spartacus/s4-service/order | Manual adaptation. |
| S4ServiceOrderDetailActionsComponent.checkServiceStatus | @spartacus/s4-service/order | Manual adaptation. |
| CartItemListComponent.setLoading | @spartacus/cart/base/components | cartIsLoading instead. |
| ProductScrollComponent.setConfig | @spartacus/storefront | scrollConfig instead. |
| ProductIntroComponent.areReviewsAvailable$ | @spartacus/storefront | product.averageRating instead. |
| ToggleLinkCellComponent.restoreFocus | @spartacus/organization/administration/components | Manual adaptation. |

## EPD exports and integration

All @spartacus/epd-visualization entry points are retired: the package root, assets, components, core, epd-visualization-api and root. This includes visualization/visual-picking classes, modules, assets, normalizer tokens, API adapters, configuration interfaces and root feature registration. Remove confirmed customer dependencies/imports/providers/styles/CMS mappings; no replacement package is supplied. Follow the [EPD removal recipe](code-migrations.md#retired-epd-integration).

## Match the installed patch

The target @spartacus/schematics package carries the constructor and deprecated-api-cleanup migration data under src/migrations/221121_24/. Consult that package and the matching public .d.ts entry points if a selected patch differs from this reference. A missing review comment does not establish that a customer template, namespace import, indirect subclass or dynamic access is compatible.
