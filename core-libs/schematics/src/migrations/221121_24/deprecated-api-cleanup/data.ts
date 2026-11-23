/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DeprecatedNode,
  MethodPropertyDeprecation,
} from '../../../shared/utils/file-utils';

const STOREFRONT_IMPORT_PATH = '@spartacus/storefront';
const PRODUCT_CONFIGURATOR_RULEBASED_IMPORT_PATH =
  '@spartacus/product-configurator/rulebased';
const STORE_FINDER_CORE_IMPORT_PATH = '@spartacus/storefinder/core';
const STORE_FINDER_ROOT_IMPORT_PATH = '@spartacus/storefinder/root';
const SUBSCRIPTION_BILLING_COMPONENTS_IMPORT_PATH =
  '@spartacus/subscription-billing/components';
const OPF_PAYMENT_ROOT_IMPORT_PATH = '@spartacus/opf/payment/root';
const ORGANIZATION_ADMINISTRATION_COMPONENTS_IMPORT_PATH =
  '@spartacus/organization/administration/components';
const EPD_ASSETS_IMPORT_PATH = '@spartacus/epd-visualization/assets';
const EPD_COMPONENTS_IMPORT_PATH = '@spartacus/epd-visualization/components';
const EPD_CORE_IMPORT_PATH = '@spartacus/epd-visualization/core';
const EPD_ROOT_IMPORT_PATH = '@spartacus/epd-visualization/root';
const EPD_API_IMPORT_PATH =
  '@spartacus/epd-visualization/epd-visualization-api';
const EPD_RETIREMENT_COMMENT =
  'EPD Visualization was retired. Remove the integration and its package, providers, styles and CMS mappings.';

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
    importPath: STOREFRONT_IMPORT_PATH,
    deprecatedNode: 'activeTabNum',
    comment:
      '// TODO:Spartacus - TabParagraphContainerComponent.activeTabNum was removed in the major release.',
  },
  {
    class: 'TabParagraphContainerComponent',
    importPath: STOREFRONT_IMPORT_PATH,
    deprecatedNode: 'ariaLabel',
    comment:
      '// TODO:Spartacus - TabParagraphContainerComponent.ariaLabel was removed in the major release.',
  },
  {
    class: 'TabParagraphContainerComponent',
    importPath: STOREFRONT_IMPORT_PATH,
    deprecatedNode: 'children',
    comment:
      '// TODO:Spartacus - TabParagraphContainerComponent.children was removed in the major release.',
  },
  {
    class: 'TabParagraphContainerComponent',
    importPath: STOREFRONT_IMPORT_PATH,
    deprecatedNode: 'tabTitleParams',
    comment:
      '// TODO:Spartacus - TabParagraphContainerComponent.tabTitleParams was removed in the major release.',
  },
  {
    class: 'TabParagraphContainerComponent',
    importPath: STOREFRONT_IMPORT_PATH,
    deprecatedNode: 'select',
    comment:
      '// TODO:Spartacus - TabParagraphContainerComponent.select was removed in the major release.',
  },
  {
    class: 'TabParagraphContainerComponent',
    importPath: STOREFRONT_IMPORT_PATH,
    deprecatedNode: 'ngOnInit',
    comment:
      '// TODO:Spartacus - TabParagraphContainerComponent.ngOnInit was removed in the major release.',
  },
  {
    class: 'SiteContextSelectorComponent',
    importPath: STOREFRONT_IMPORT_PATH,
    deprecatedNode: 'siteContextService',
    comment:
      '// TODO:Spartacus - SiteContextSelectorComponent.siteContextService was removed in the major release.',
  },
  {
    class: 'FacetComponent',
    importPath: STOREFRONT_IMPORT_PATH,
    deprecatedNode: 'toggleGroup',
    comment:
      '// TODO:Spartacus - FacetComponent.toggleGroup was removed in the major release.',
  },
  {
    class: 'OutletContextData',
    importPath: STOREFRONT_IMPORT_PATH,
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
    importPath: PRODUCT_CONFIGURATOR_RULEBASED_IMPORT_PATH,
    deprecatedNode: 'attributeId',
    comment:
      '// TODO:Spartacus - ConfiguratorAttributeProductCardComponentOptions.attributeId was removed in the major release. Use attribute and getAttributeCode(attribute) instead.',
  },
  {
    class: 'ConfiguratorAttributeProductCardComponentOptions',
    importPath: PRODUCT_CONFIGURATOR_RULEBASED_IMPORT_PATH,
    deprecatedNode: 'attributeLabel',
    comment:
      '// TODO:Spartacus - ConfiguratorAttributeProductCardComponentOptions.attributeLabel was removed in the major release. Use attribute.label instead.',
  },
  {
    class: 'ConfiguratorAttributeProductCardComponentOptions',
    importPath: PRODUCT_CONFIGURATOR_RULEBASED_IMPORT_PATH,
    deprecatedNode: 'attributeName',
    comment:
      '// TODO:Spartacus - ConfiguratorAttributeProductCardComponentOptions.attributeName was removed in the major release. Use attribute.name instead.',
  },
  {
    class: 'ConfiguratorConflictAndErrorMessagesComponent',
    importPath: PRODUCT_CONFIGURATOR_RULEBASED_IMPORT_PATH,
    deprecatedNode: 'configuration$',
    comment:
      '// TODO:Spartacus - ConfiguratorConflictAndErrorMessagesComponent.configuration$ was removed in the major release. Use messages$ instead.',
  },
  {
    class: 'ConfiguratorGroupTitleComponent',
    importPath: PRODUCT_CONFIGURATOR_RULEBASED_IMPORT_PATH,
    deprecatedNode: 'ghostStyle',
    comment:
      '// TODO:Spartacus - ConfiguratorGroupTitleComponent.ghostStyle was removed in the major release. Use the loading template instead.',
  },
  {
    class: 'ConfiguratorOverviewFilterButtonComponent',
    importPath: PRODUCT_CONFIGURATOR_RULEBASED_IMPORT_PATH,
    deprecatedNode: 'ghostStyle',
    comment:
      '// TODO:Spartacus - ConfiguratorOverviewFilterButtonComponent.ghostStyle was removed in the major release. Use the loading template instead.',
  },
  {
    class: 'ConfiguratorOverviewFormComponent',
    importPath: PRODUCT_CONFIGURATOR_RULEBASED_IMPORT_PATH,
    deprecatedNode: 'ghostStyle',
    comment:
      '// TODO:Spartacus - ConfiguratorOverviewFormComponent.ghostStyle was removed in the major release. Use the loading template instead.',
  },
  {
    class: 'ConfiguratorOverviewMenuComponent',
    importPath: PRODUCT_CONFIGURATOR_RULEBASED_IMPORT_PATH,
    deprecatedNode: 'VARIANT_CONFIG_OVERVIEW_NAVIGATION_SLOT',
    comment:
      '// TODO:Spartacus - ConfiguratorOverviewMenuComponent.VARIANT_CONFIG_OVERVIEW_NAVIGATION_SLOT was removed in the major release.',
  },
  {
    class: 'ConfiguratorOverviewSidebarComponent',
    importPath: PRODUCT_CONFIGURATOR_RULEBASED_IMPORT_PATH,
    deprecatedNode: 'ghostStyle',
    comment:
      '// TODO:Spartacus - ConfiguratorOverviewSidebarComponent.ghostStyle was removed in the major release. Use the loading template instead.',
  },
  {
    class: 'ConfiguratorProductTitleComponent',
    importPath: PRODUCT_CONFIGURATOR_RULEBASED_IMPORT_PATH,
    deprecatedNode: 'ghostStyle',
    comment:
      '// TODO:Spartacus - ConfiguratorProductTitleComponent.ghostStyle was removed in the major release. Use the loading template instead.',
  },
  {
    class: 'ConfiguratorProductTitleComponent',
    importPath: PRODUCT_CONFIGURATOR_RULEBASED_IMPORT_PATH,
    deprecatedNode: 'product$',
    comment:
      '// TODO:Spartacus - ConfiguratorProductTitleComponent.product$ was removed in the major release. Use productTitleData$.product instead.',
  },
  {
    class: 'ConfiguratorTabBarComponent',
    importPath: PRODUCT_CONFIGURATOR_RULEBASED_IMPORT_PATH,
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
    importPath: STORE_FINDER_CORE_IMPORT_PATH,
    deprecatedNode: 'getStoreLatitude',
    comment:
      '// TODO:Spartacus - StoreFinderService.getStoreLatitude was removed in the major release. Use StoreLocationService.getStoreLatitude instead.',
  },
  {
    class: 'StoreFinderService',
    importPath: STORE_FINDER_CORE_IMPORT_PATH,
    deprecatedNode: 'getStoreLongitude',
    comment:
      '// TODO:Spartacus - StoreFinderService.getStoreLongitude was removed in the major release. Use StoreLocationService.getStoreLongitude instead.',
  },
  {
    class: 'StoreFinderService',
    importPath: STORE_FINDER_CORE_IMPORT_PATH,
    deprecatedNode: 'getDirections',
    comment:
      '// TODO:Spartacus - StoreFinderService.getDirections was removed in the major release. Use StoreLocationService.getDirections instead.',
  },
  {
    class: 'StoreFinderFacade',
    importPath: STORE_FINDER_ROOT_IMPORT_PATH,
    deprecatedNode: 'getStoreLatitude',
    comment:
      '// TODO:Spartacus - StoreFinderFacade.getStoreLatitude was removed in the major release. Use StoreLocationService.getStoreLatitude instead.',
  },
  {
    class: 'StoreFinderFacade',
    importPath: STORE_FINDER_ROOT_IMPORT_PATH,
    deprecatedNode: 'getStoreLongitude',
    comment:
      '// TODO:Spartacus - StoreFinderFacade.getStoreLongitude was removed in the major release. Use StoreLocationService.getStoreLongitude instead.',
  },
  {
    class: 'StoreFinderFacade',
    importPath: STORE_FINDER_ROOT_IMPORT_PATH,
    deprecatedNode: 'getDirections',
    comment:
      '// TODO:Spartacus - StoreFinderFacade.getDirections was removed in the major release. Use StoreLocationService.getDirections instead.',
  },
  {
    class: 'SubscriptionBillingListComponent',
    importPath: SUBSCRIPTION_BILLING_COMPONENTS_IMPORT_PATH,
    deprecatedNode: 'onFilterDateChange',
    comment:
      '// TODO:Spartacus - SubscriptionBillingListComponent.onFilterDateChange was removed in the major release.',
  },
  {
    class: 'SubscriptionBillingListComponent',
    importPath: SUBSCRIPTION_BILLING_COMPONENTS_IMPORT_PATH,
    deprecatedNode: 'onResetFilterDate',
    comment:
      '// TODO:Spartacus - SubscriptionBillingListComponent.onResetFilterDate was removed in the major release.',
  },
  {
    class: 'SubscriptionBillingListComponent',
    importPath: SUBSCRIPTION_BILLING_COMPONENTS_IMPORT_PATH,
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
    importPath: OPF_PAYMENT_ROOT_IMPORT_PATH,
    deprecatedNode: 'cartId',
    comment:
      '// TODO:Spartacus - OpfPaymentGlobalMethods.submit.options.cartId was removed in the major release.',
  },
  {
    class: 'OpfPaymentGlobalMethods',
    importPath: OPF_PAYMENT_ROOT_IMPORT_PATH,
    deprecatedNode: 'cartId',
    comment:
      '// TODO:Spartacus - OpfPaymentGlobalMethods.submitComplete.options.cartId was removed in the major release.',
  },
  {
    class: 'OpfPaymentGlobalMethods',
    importPath: OPF_PAYMENT_ROOT_IMPORT_PATH,
    deprecatedNode: 'cartId',
    comment:
      '// TODO:Spartacus - OpfPaymentGlobalMethods.submitCompleteRedirect.options.cartId was removed in the major release.',
  },
  {
    class: 'OpfPaymentConfig',
    importPath: OPF_PAYMENT_ROOT_IMPORT_PATH,
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
    importPath: STOREFRONT_IMPORT_PATH,
    deprecatedNode: 'setConfig',
    comment:
      '// TODO:Spartacus - ProductScrollComponent.setConfig was removed in the major release. Use scrollConfig instead.',
  },
  {
    class: 'ProductIntroComponent',
    importPath: STOREFRONT_IMPORT_PATH,
    deprecatedNode: 'areReviewsAvailable$',
    comment:
      '// TODO:Spartacus - ProductIntroComponent.areReviewsAvailable$ was removed in the major release. Use product.averageRating instead.',
  },
  {
    class: 'ToggleLinkCellComponent',
    importPath: ORGANIZATION_ADMINISTRATION_COMPONENTS_IMPORT_PATH,
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
    importPath: STOREFRONT_IMPORT_PATH,
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
    importPath: ORGANIZATION_ADMINISTRATION_COMPONENTS_IMPORT_PATH,
    comment:
      'newBudgetTableConfig was removed in the major release. Use budgetTableConfig instead.',
  },
  {
    node: 'newCostCenterTableConfig',
    importPath: ORGANIZATION_ADMINISTRATION_COMPONENTS_IMPORT_PATH,
    comment:
      'newCostCenterTableConfig was removed in the major release. Use costCenterTableConfig instead.',
  },
  {
    node: 'newPermissionTableConfig',
    importPath: ORGANIZATION_ADMINISTRATION_COMPONENTS_IMPORT_PATH,
    comment:
      'newPermissionTableConfig was removed in the major release. Use permisionTableConfig instead.',
  },
  {
    node: 'newUnitsTableConfig',
    importPath: ORGANIZATION_ADMINISTRATION_COMPONENTS_IMPORT_PATH,
    comment:
      'newUnitsTableConfig was removed in the major release. Use unitsTableConfig instead.',
  },
  {
    node: 'newUserGroupTableConfig',
    importPath: ORGANIZATION_ADMINISTRATION_COMPONENTS_IMPORT_PATH,
    comment:
      'newUserGroupTableConfig was removed in the major release. Use userGroupTableConfig instead.',
  },
  {
    node: 'newUserTableConfig',
    importPath: ORGANIZATION_ADMINISTRATION_COMPONENTS_IMPORT_PATH,
    comment:
      'newUserTableConfig was removed in the major release. Use userTableConfig instead.',
  },
  {
    node: 'cs',
    importPath: EPD_ASSETS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'de',
    importPath: EPD_ASSETS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'en',
    importPath: EPD_ASSETS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'es',
    importPath: EPD_ASSETS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'es_CO',
    importPath: EPD_ASSETS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'fr',
    importPath: EPD_ASSETS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'hi',
    importPath: EPD_ASSETS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'hu',
    importPath: EPD_ASSETS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'id',
    importPath: EPD_ASSETS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'it',
    importPath: EPD_ASSETS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'ja',
    importPath: EPD_ASSETS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'ko',
    importPath: EPD_ASSETS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'pl',
    importPath: EPD_ASSETS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'pt',
    importPath: EPD_ASSETS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'ru',
    importPath: EPD_ASSETS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'epdVisualizationTranslationChunksConfig',
    importPath: EPD_ASSETS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'zh',
    importPath: EPD_ASSETS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'zh_TW',
    importPath: EPD_ASSETS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'EpdVisualizationComponentsModule',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualPickingProductFilterComponent',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualPickingProductFilterModule',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualPickingProductFilterService',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'CompactAddToCartComponent',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'CompactAddToCartModule',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualPickingProductListItem',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'PagedListComponent',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'PagedListModule',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualPickingProductListComponent',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualPickingProductListModule',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualPickingProductListService',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualPickingTabComponent',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualPickingTabModule',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualPickingTabService',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'NavigationMode',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'NodeContentType',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'LoadedSceneInfo',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'SceneLoadInfo',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'SceneLoadState',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'SelectionDisplayMode',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'SelectionMode',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualizationLookupResult',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualizationLoadStatus',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualizationLoadInfo',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'ZoomTo',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualViewerAnimationSliderComponent',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualViewerAnimationSliderModule',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualViewerAnimationSliderService',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualViewerToolbarButtonComponent',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualViewerToolbarButtonModule',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'MockVisualViewerAnimationSliderComponent',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualViewerComponent',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualViewerModule',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualViewerService',
    importPath: EPD_COMPONENTS_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'NODES_RESPONSE_NORMALIZER',
    importPath: EPD_CORE_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'NodesResponse',
    importPath: EPD_CORE_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'TreeNode',
    importPath: EPD_CORE_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'UsageId',
    importPath: EPD_CORE_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'UsageIdKey',
    importPath: EPD_CORE_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'SceneAdapter',
    importPath: EPD_CORE_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'SceneConnector',
    importPath: EPD_CORE_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'LOOKUP_VISUALIZATIONS_RESPONSE_NORMALIZER',
    importPath: EPD_CORE_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'LookupVisualizationsResponse',
    importPath: EPD_CORE_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualizationAdapter',
    importPath: EPD_CORE_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualizationConnector',
    importPath: EPD_CORE_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'EpdVisualizationCoreModule',
    importPath: EPD_CORE_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'NodeIdProductCodes',
    importPath: EPD_CORE_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'SceneNodeToProductLookupService',
    importPath: EPD_CORE_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualizationLookupService',
    importPath: EPD_CORE_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'StorageV1Adapter',
    importPath: EPD_API_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualizationV1Adapter',
    importPath: EPD_API_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'EpdVisualizationApiModule',
    importPath: EPD_API_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'EpdVisualizationModule',
    importPath: '@spartacus/epd-visualization',
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'epdVisualizationConfigValidator',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'EpdVisualizationConfig',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'EpdVisualizationInnerConfig',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'Ui5Config',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualizationApiConfig',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'UsageIdConfig',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualPickingConfig',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: "'@spartacus/core'",
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'getEpdVisualizationDefaultConfig',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'EpdVisualizationRootModule',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'EPD_VISUALIZATION_FEATURE',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'UsageIdDefinition',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'UsageId',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'UsageIdKey',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'ContentType',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'VisualizationInfo',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'getTestConfig',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'Listener',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'EventListenerUtils',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'getUrl',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'isHttpOrHttps',
    importPath: EPD_ROOT_IMPORT_PATH,
    comment: EPD_RETIREMENT_COMMENT,
  },
  {
    node: 'addEpdVisualizationFeature',
    importPath: '@spartacus/epd-visualization',
    comment: EPD_RETIREMENT_COMMENT,
  },
];
