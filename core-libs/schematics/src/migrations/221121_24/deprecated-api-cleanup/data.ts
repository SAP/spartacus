/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DeprecatedNode,
  MethodPropertyDeprecation,
} from '../../../shared/utils/file-utils';

export const REMOVED_MEMBERS: MethodPropertyDeprecation[] = [
  {
    class: 'SiteContextRoutesHandler',
    importPath: '@spartacus/core',
    deprecatedNode: 'init',
    comment:
      '// TODO:Spartacus - SiteContextRoutesHandler.init was removed in the major release. Use initOnce instead.',
  },
  {
    class: 'SsrOptimizationOptions',
    importPath: '@spartacus/setup/ssr',
    deprecatedNode: 'debug',
    comment:
      '// TODO:Spartacus - SsrOptimizationOptions.debug was removed in the major release.',
  },
  {
    class: 'TabParagraphContainerComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'activeTabNum',
    comment:
      '// TODO:Spartacus - TabParagraphContainerComponent.activeTabNum was removed in the major release.',
  },
  {
    class: 'TabParagraphContainerComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'ariaLabel',
    comment:
      '// TODO:Spartacus - TabParagraphContainerComponent.ariaLabel was removed in the major release.',
  },
  {
    class: 'TabParagraphContainerComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'children',
    comment:
      '// TODO:Spartacus - TabParagraphContainerComponent.children was removed in the major release.',
  },
  {
    class: 'TabParagraphContainerComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'tabTitleParams',
    comment:
      '// TODO:Spartacus - TabParagraphContainerComponent.tabTitleParams was removed in the major release.',
  },
  {
    class: 'TabParagraphContainerComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'select',
    comment:
      '// TODO:Spartacus - TabParagraphContainerComponent.select was removed in the major release.',
  },
  {
    class: 'TabParagraphContainerComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'ngOnInit',
    comment:
      '// TODO:Spartacus - TabParagraphContainerComponent.ngOnInit was removed in the major release.',
  },
  {
    class: 'SiteContextSelectorComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'siteContextService',
    comment:
      '// TODO:Spartacus - SiteContextSelectorComponent.siteContextService was removed in the major release.',
  },
  {
    class: 'FacetComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'toggleGroup',
    comment:
      '// TODO:Spartacus - FacetComponent.toggleGroup was removed in the major release.',
  },
  {
    class: 'OutletContextData',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'context',
    comment:
      '// TODO:Spartacus - OutletContextData.context was removed in the major release. Use context$ instead.',
  },
  {
    class: 'CheckoutDeliveryAddressComponent',
    importPath: '@spartacus/checkout/base/components',
    deprecatedNode: 'getCardRole',
    comment:
      '// TODO:Spartacus - CheckoutDeliveryAddressComponent.getCardRole was removed in the major release.',
  },
  {
    class: 'CheckoutPaymentFormComponent',
    importPath: '@spartacus/checkout/base/components',
    deprecatedNode: 'useExtractedBillingAddressComponent',
    comment:
      '// TODO:Spartacus - CheckoutPaymentFormComponent.useExtractedBillingAddressComponent was removed in the major release.',
  },
  {
    class: 'OrderHistoryService',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'getQueryParams',
    comment:
      '// TODO:Spartacus - OrderHistoryService.getQueryParams was removed in the major release. Use OrderHistoryComponent.getQueryParams instead.',
  },
  {
    class: 'OrderHistoryFacade',
    importPath: '@spartacus/order/root',
    deprecatedNode: 'getQueryParams',
    comment:
      '// TODO:Spartacus - OrderHistoryFacade.getQueryParams was removed in the major release. Use OrderHistoryComponent.getQueryParams instead.',
  },
  {
    class: 'ConfiguratorAttributeProductCardComponentOptions',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedNode: 'attributeId',
    comment:
      '// TODO:Spartacus - ConfiguratorAttributeProductCardComponentOptions.attributeId was removed in the major release. Use attribute and getAttributeCode(attribute) instead.',
  },
  {
    class: 'ConfiguratorAttributeProductCardComponentOptions',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedNode: 'attributeLabel',
    comment:
      '// TODO:Spartacus - ConfiguratorAttributeProductCardComponentOptions.attributeLabel was removed in the major release. Use attribute.label instead.',
  },
  {
    class: 'ConfiguratorAttributeProductCardComponentOptions',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedNode: 'attributeName',
    comment:
      '// TODO:Spartacus - ConfiguratorAttributeProductCardComponentOptions.attributeName was removed in the major release. Use attribute.name instead.',
  },
  {
    class: 'ConfiguratorConflictAndErrorMessagesComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedNode: 'configuration$',
    comment:
      '// TODO:Spartacus - ConfiguratorConflictAndErrorMessagesComponent.configuration$ was removed in the major release. Use messages$ instead.',
  },
  {
    class: 'ConfiguratorGroupTitleComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedNode: 'ghostStyle',
    comment:
      '// TODO:Spartacus - ConfiguratorGroupTitleComponent.ghostStyle was removed in the major release. Use the loading template instead.',
  },
  {
    class: 'ConfiguratorOverviewFilterButtonComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedNode: 'ghostStyle',
    comment:
      '// TODO:Spartacus - ConfiguratorOverviewFilterButtonComponent.ghostStyle was removed in the major release. Use the loading template instead.',
  },
  {
    class: 'ConfiguratorOverviewFormComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedNode: 'ghostStyle',
    comment:
      '// TODO:Spartacus - ConfiguratorOverviewFormComponent.ghostStyle was removed in the major release. Use the loading template instead.',
  },
  {
    class: 'ConfiguratorOverviewMenuComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedNode: 'VARIANT_CONFIG_OVERVIEW_NAVIGATION_SLOT',
    comment:
      '// TODO:Spartacus - ConfiguratorOverviewMenuComponent.VARIANT_CONFIG_OVERVIEW_NAVIGATION_SLOT was removed in the major release.',
  },
  {
    class: 'ConfiguratorOverviewSidebarComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedNode: 'ghostStyle',
    comment:
      '// TODO:Spartacus - ConfiguratorOverviewSidebarComponent.ghostStyle was removed in the major release. Use the loading template instead.',
  },
  {
    class: 'ConfiguratorProductTitleComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedNode: 'ghostStyle',
    comment:
      '// TODO:Spartacus - ConfiguratorProductTitleComponent.ghostStyle was removed in the major release. Use the loading template instead.',
  },
  {
    class: 'ConfiguratorProductTitleComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedNode: 'product$',
    comment:
      '// TODO:Spartacus - ConfiguratorProductTitleComponent.product$ was removed in the major release. Use productTitleData$.product instead.',
  },
  {
    class: 'ConfiguratorTabBarComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedNode: 'ghostStyle',
    comment:
      '// TODO:Spartacus - ConfiguratorTabBarComponent.ghostStyle was removed in the major release. Use the loading template instead.',
  },
  {
    class: 'QuoteLinksComponent',
    importPath: '@spartacus/quote/components',
    deprecatedNode: 'isShowDownloadProposalButtonFeatureEnabled',
    comment:
      '// TODO:Spartacus - QuoteLinksComponent.isShowDownloadProposalButtonFeatureEnabled was removed in the major release.',
  },
  {
    class: 'StoreFinderService',
    importPath: '@spartacus/storefinder/core',
    deprecatedNode: 'getStoreLatitude',
    comment:
      '// TODO:Spartacus - StoreFinderService.getStoreLatitude was removed in the major release. Use StoreLocationService.getStoreLatitude instead.',
  },
  {
    class: 'StoreFinderService',
    importPath: '@spartacus/storefinder/core',
    deprecatedNode: 'getStoreLongitude',
    comment:
      '// TODO:Spartacus - StoreFinderService.getStoreLongitude was removed in the major release. Use StoreLocationService.getStoreLongitude instead.',
  },
  {
    class: 'StoreFinderService',
    importPath: '@spartacus/storefinder/core',
    deprecatedNode: 'getDirections',
    comment:
      '// TODO:Spartacus - StoreFinderService.getDirections was removed in the major release. Use StoreLocationService.getDirections instead.',
  },
  {
    class: 'StoreFinderFacade',
    importPath: '@spartacus/storefinder/root',
    deprecatedNode: 'getStoreLatitude',
    comment:
      '// TODO:Spartacus - StoreFinderFacade.getStoreLatitude was removed in the major release. Use StoreLocationService.getStoreLatitude instead.',
  },
  {
    class: 'StoreFinderFacade',
    importPath: '@spartacus/storefinder/root',
    deprecatedNode: 'getStoreLongitude',
    comment:
      '// TODO:Spartacus - StoreFinderFacade.getStoreLongitude was removed in the major release. Use StoreLocationService.getStoreLongitude instead.',
  },
  {
    class: 'StoreFinderFacade',
    importPath: '@spartacus/storefinder/root',
    deprecatedNode: 'getDirections',
    comment:
      '// TODO:Spartacus - StoreFinderFacade.getDirections was removed in the major release. Use StoreLocationService.getDirections instead.',
  },
  {
    class: 'SubscriptionBillingListComponent',
    importPath: '@spartacus/subscription-billing/components',
    deprecatedNode: 'onFilterDateChange',
    comment:
      '// TODO:Spartacus - SubscriptionBillingListComponent.onFilterDateChange was removed in the major release.',
  },
  {
    class: 'SubscriptionBillingListComponent',
    importPath: '@spartacus/subscription-billing/components',
    deprecatedNode: 'onResetFilterDate',
    comment:
      '// TODO:Spartacus - SubscriptionBillingListComponent.onResetFilterDate was removed in the major release.',
  },
  {
    class: 'SubscriptionBillingListComponent',
    importPath: '@spartacus/subscription-billing/components',
    deprecatedNode: 'onDateFilterSubmit',
    comment:
      '// TODO:Spartacus - SubscriptionBillingListComponent.onDateFilterSubmit was removed in the major release.',
  },
  {
    class: 'OpfCheckoutPaymentAndReviewComponent',
    importPath: '@spartacus/opf/checkout/components',
    deprecatedNode: 'opfBaseFacade',
    comment:
      '// TODO:Spartacus - OpfCheckoutPaymentAndReviewComponent.opfBaseFacade was removed in the major release.',
  },
  {
    class: 'OpfSharedPaymentSubmitOptions',
    importPath: '@spartacus/opf/global-functions/core',
    deprecatedNode: 'cartId',
    comment:
      '// TODO:Spartacus - OpfSharedPaymentSubmitOptions.cartId was removed in the major release.',
  },
  {
    class: 'OpfSharedPaymentSubmitCompleteOptions',
    importPath: '@spartacus/opf/global-functions/core',
    deprecatedNode: 'cartId',
    comment:
      '// TODO:Spartacus - OpfSharedPaymentSubmitCompleteOptions.cartId was removed in the major release.',
  },
  {
    class: 'OpfPaymentGlobalMethods',
    importPath: '@spartacus/opf/payment/root',
    deprecatedNode: 'cartId',
    comment:
      '// TODO:Spartacus - OpfPaymentGlobalMethods.submit.options.cartId was removed in the major release.',
  },
  {
    class: 'OpfPaymentGlobalMethods',
    importPath: '@spartacus/opf/payment/root',
    deprecatedNode: 'cartId',
    comment:
      '// TODO:Spartacus - OpfPaymentGlobalMethods.submitComplete.options.cartId was removed in the major release.',
  },
  {
    class: 'OpfPaymentGlobalMethods',
    importPath: '@spartacus/opf/payment/root',
    deprecatedNode: 'cartId',
    comment:
      '// TODO:Spartacus - OpfPaymentGlobalMethods.submitCompleteRedirect.options.cartId was removed in the major release.',
  },
  {
    class: 'OpfPaymentConfig',
    importPath: '@spartacus/opf/payment/root',
    deprecatedNode: 'cartId',
    comment:
      '// TODO:Spartacus - OpfPaymentConfig.cartId was removed in the major release.',
  },
  {
    class: 'ApplePaySessionVerificationRequest',
    importPath: '@spartacus/opf/quick-buy/root',
    deprecatedNode: 'cartId',
    comment:
      '// TODO:Spartacus - ApplePaySessionVerificationRequest.cartId was removed in the major release.',
  },
  {
    class: 'S4ServiceOrderDetailActionsComponent',
    importPath: '@spartacus/s4-service/order',
    deprecatedNode: 'displayActions$',
    comment:
      '// TODO:Spartacus - S4ServiceOrderDetailActionsComponent.displayActions$ was removed in the major release.',
  },
  {
    class: 'S4ServiceOrderDetailActionsComponent',
    importPath: '@spartacus/s4-service/order',
    deprecatedNode: 'checkServiceStatus',
    comment:
      '// TODO:Spartacus - S4ServiceOrderDetailActionsComponent.checkServiceStatus was removed in the major release.',
  },
  {
    class: 'CartItemListComponent',
    importPath: '@spartacus/cart/base/components',
    deprecatedNode: 'setLoading',
    comment:
      '// TODO:Spartacus - CartItemListComponent.setLoading was removed in the major release. Use cartIsLoading instead.',
  },
  {
    class: 'ProductScrollComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'setConfig',
    comment:
      '// TODO:Spartacus - ProductScrollComponent.setConfig was removed in the major release. Use scrollConfig instead.',
  },
  {
    class: 'ProductIntroComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'areReviewsAvailable$',
    comment:
      '// TODO:Spartacus - ProductIntroComponent.areReviewsAvailable$ was removed in the major release. Use product.averageRating instead.',
  },
  {
    class: 'ToggleLinkCellComponent',
    importPath: '@spartacus/organization/administration/components',
    deprecatedNode: 'restoreFocus',
    comment:
      '// TODO:Spartacus - ToggleLinkCellComponent.restoreFocus was removed in the major release.',
  },
];

export const REMOVED_EXPORTS: DeprecatedNode[] = [
  {
    node: 'locationInitializedFactory',
    importPath: '@spartacus/core',
    comment: 'locationInitializedFactory was removed in the major release.',
  },
  {
    node: 'layoutConfig',
    importPath: '@spartacus/storefront',
    comment:
      'layoutConfig was removed in the major release. Use provideConfigFactory(layoutConfigFactory) instead.',
  },
  {
    node: 'MergeCart',
    importPath: '@spartacus/cart/base/core',
    comment:
      'MergeCart was removed in the major release. Use MergeCartAndIncrementProcessesCount instead.',
  },
  {
    node: 'newBudgetTableConfig',
    importPath: '@spartacus/organization/administration/components',
    comment:
      'newBudgetTableConfig was removed in the major release. Use budgetTableConfig instead.',
  },
  {
    node: 'newCostCenterTableConfig',
    importPath: '@spartacus/organization/administration/components',
    comment:
      'newCostCenterTableConfig was removed in the major release. Use costCenterTableConfig instead.',
  },
  {
    node: 'newPermissionTableConfig',
    importPath: '@spartacus/organization/administration/components',
    comment:
      'newPermissionTableConfig was removed in the major release. Use permisionTableConfig instead.',
  },
  {
    node: 'newUnitsTableConfig',
    importPath: '@spartacus/organization/administration/components',
    comment:
      'newUnitsTableConfig was removed in the major release. Use unitsTableConfig instead.',
  },
  {
    node: 'newUserGroupTableConfig',
    importPath: '@spartacus/organization/administration/components',
    comment:
      'newUserGroupTableConfig was removed in the major release. Use userGroupTableConfig instead.',
  },
  {
    node: 'newUserTableConfig',
    importPath: '@spartacus/organization/administration/components',
    comment:
      'newUserTableConfig was removed in the major release. Use userTableConfig instead.',
  },
  {
    node: 'cs',
    importPath: '@spartacus/epd-visualization/assets',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'de',
    importPath: '@spartacus/epd-visualization/assets',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'en',
    importPath: '@spartacus/epd-visualization/assets',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'es',
    importPath: '@spartacus/epd-visualization/assets',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'es_CO',
    importPath: '@spartacus/epd-visualization/assets',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'fr',
    importPath: '@spartacus/epd-visualization/assets',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'hi',
    importPath: '@spartacus/epd-visualization/assets',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'hu',
    importPath: '@spartacus/epd-visualization/assets',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'id',
    importPath: '@spartacus/epd-visualization/assets',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'it',
    importPath: '@spartacus/epd-visualization/assets',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'ja',
    importPath: '@spartacus/epd-visualization/assets',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'ko',
    importPath: '@spartacus/epd-visualization/assets',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'pl',
    importPath: '@spartacus/epd-visualization/assets',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'pt',
    importPath: '@spartacus/epd-visualization/assets',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'ru',
    importPath: '@spartacus/epd-visualization/assets',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'epdVisualizationTranslationChunksConfig',
    importPath: '@spartacus/epd-visualization/assets',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'zh',
    importPath: '@spartacus/epd-visualization/assets',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'zh_TW',
    importPath: '@spartacus/epd-visualization/assets',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'EpdVisualizationComponentsModule',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualPickingProductFilterComponent',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualPickingProductFilterModule',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualPickingProductFilterService',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'CompactAddToCartComponent',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'CompactAddToCartModule',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualPickingProductListItem',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'PagedListComponent',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'PagedListModule',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualPickingProductListComponent',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualPickingProductListModule',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualPickingProductListService',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualPickingTabComponent',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualPickingTabModule',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualPickingTabService',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'NavigationMode',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'NodeContentType',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'LoadedSceneInfo',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'SceneLoadInfo',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'SceneLoadState',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'SelectionDisplayMode',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'SelectionMode',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualizationLookupResult',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualizationLoadStatus',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualizationLoadInfo',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'ZoomTo',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualViewerAnimationSliderComponent',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualViewerAnimationSliderModule',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualViewerAnimationSliderService',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualViewerToolbarButtonComponent',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualViewerToolbarButtonModule',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'MockVisualViewerAnimationSliderComponent',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualViewerComponent',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualViewerModule',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualViewerService',
    importPath: '@spartacus/epd-visualization/components',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'NODES_RESPONSE_NORMALIZER',
    importPath: '@spartacus/epd-visualization/core',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'NodesResponse',
    importPath: '@spartacus/epd-visualization/core',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'TreeNode',
    importPath: '@spartacus/epd-visualization/core',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'UsageId',
    importPath: '@spartacus/epd-visualization/core',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'UsageIdKey',
    importPath: '@spartacus/epd-visualization/core',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'SceneAdapter',
    importPath: '@spartacus/epd-visualization/core',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'SceneConnector',
    importPath: '@spartacus/epd-visualization/core',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'LOOKUP_VISUALIZATIONS_RESPONSE_NORMALIZER',
    importPath: '@spartacus/epd-visualization/core',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'LookupVisualizationsResponse',
    importPath: '@spartacus/epd-visualization/core',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualizationAdapter',
    importPath: '@spartacus/epd-visualization/core',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualizationConnector',
    importPath: '@spartacus/epd-visualization/core',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'EpdVisualizationCoreModule',
    importPath: '@spartacus/epd-visualization/core',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'NodeIdProductCodes',
    importPath: '@spartacus/epd-visualization/core',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'SceneNodeToProductLookupService',
    importPath: '@spartacus/epd-visualization/core',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualizationLookupService',
    importPath: '@spartacus/epd-visualization/core',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'StorageV1Adapter',
    importPath: '@spartacus/epd-visualization/epd-visualization-api',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualizationV1Adapter',
    importPath: '@spartacus/epd-visualization/epd-visualization-api',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'EpdVisualizationApiModule',
    importPath: '@spartacus/epd-visualization/epd-visualization-api',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'EpdVisualizationModule',
    importPath: '@spartacus/epd-visualization',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'epdVisualizationConfigValidator',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'EpdVisualizationConfig',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'EpdVisualizationInnerConfig',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'Ui5Config',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualizationApiConfig',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'UsageIdConfig',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualPickingConfig',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: "'@spartacus/core'",
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'getEpdVisualizationDefaultConfig',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'EpdVisualizationRootModule',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'EPD_VISUALIZATION_FEATURE',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'UsageIdDefinition',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'UsageId',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'UsageIdKey',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'ContentType',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'VisualizationInfo',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'getTestConfig',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'Listener',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'EventListenerUtils',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'getUrl',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'isHttpOrHttps',
    importPath: '@spartacus/epd-visualization/root',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
  {
    node: 'addEpdVisualizationFeature',
    importPath: '@spartacus/epd-visualization',
    comment:
      'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.',
  },
];
