/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

//
// Generated file, don't update manually.
//
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const GENERATED_METHODS_AND_PROPERTIES_MIGRATION: MethodPropertyDeprecation[] =
  [
    {
      class: 'AsmMainUiComponent',
      importPath: '@spartacus/asm/components',
      deprecatedNode: 'launchDialogService',
      comment:
        "// TODO:Spartacus - The type of property 'launchDialogService: LaunchDialogService | undefined' changed to: 'launchDialogService: LaunchDialogService' ",
    },
    {
      class: 'CustomerListComponent',
      importPath: '@spartacus/asm/components',
      deprecatedNode: 'asmService',
      comment:
        "// TODO:Spartacus - Property 'asmService' was removed from Class 'CustomerListComponent'. ",
    },
    {
      class: 'CustomerSelectionComponent',
      importPath: '@spartacus/asm/components',
      deprecatedNode: 'closeResults',
      comment:
        "// TODO:Spartacus - The 'closeResults' method's signature changed to: 'closeResults(  event: UIEvent): void'",
    },
    {
      class: 'CustomerSelectionComponent',
      importPath: '@spartacus/asm/components',
      deprecatedNode: 'onDocumentClick',
      comment:
        "// TODO:Spartacus - The 'onDocumentClick' method's signature changed to: 'onDocumentClick(  event: UIEvent): void'",
    },
    {
      class: 'CustomerSelectionComponent',
      importPath: '@spartacus/asm/components',
      deprecatedNode: 'selectCustomerFromList',
      comment:
        "// TODO:Spartacus - The 'selectCustomerFromList' method's signature changed to: 'selectCustomerFromList(  event: UIEvent,  customer: User): void'",
    },
    {
      class: 'AsmService',
      importPath: '@spartacus/asm/core',
      deprecatedNode: 'customerListCustomersSearch',
      comment:
        "// TODO:Spartacus - Method 'customerListCustomersSearch' was removed from Class 'AsmService'. Has been moved to correct service AsmCustomerListFacade",
    },
    {
      class: 'AsmService',
      importPath: '@spartacus/asm/core',
      deprecatedNode: 'customerListCustomersSearchReset',
      comment:
        "// TODO:Spartacus - Method 'customerListCustomersSearchReset' was removed from Class 'AsmService'. Has been moved to correct service AsmCustomerListFacade",
    },
    {
      class: 'AsmService',
      importPath: '@spartacus/asm/core',
      deprecatedNode: 'getCustomerListCustomersSearchResults',
      comment:
        "// TODO:Spartacus - Method 'getCustomerListCustomersSearchResults' was removed from Class 'AsmService'. Has been moved to correct service AsmCustomerListFacade",
    },
    {
      class: 'AsmService',
      importPath: '@spartacus/asm/core',
      deprecatedNode: 'getCustomerListCustomersSearchResultsError',
      comment:
        "// TODO:Spartacus - Method 'getCustomerListCustomersSearchResultsError' was removed from Class 'AsmService'. Has been moved to correct service AsmCustomerListFacade",
    },
    {
      class: 'AsmService',
      importPath: '@spartacus/asm/core',
      deprecatedNode: 'getCustomerListCustomersSearchResultsLoading',
      comment:
        "// TODO:Spartacus - Method 'getCustomerListCustomersSearchResultsLoading' was removed from Class 'AsmService'. Has been moved to correct service AsmCustomerListFacade",
    },
    {
      class: 'CartAddEntry',
      importPath: '@spartacus/cart/base/core',
      deprecatedNode: 'payload',
      comment:
        "// TODO:Spartacus - The type of property 'payload: { cartId: string; userId: string; productCode: string; quantity: number; }' changed to: 'payload: { cartId: string; userId: string; productCode: string; quantity: number; pickupStore?: string; }' ",
    },
    {
      class: 'CartAddEntryFail',
      importPath: '@spartacus/cart/base/core',
      deprecatedNode: 'payload',
      comment:
        "// TODO:Spartacus - The type of property 'payload: { userId: string; cartId: string; productCode: string; quantity: number; error: any; }' changed to: 'payload: { error: any; userId: string; cartId: string; productCode: string; quantity: number; pickupStore?: string; }' ",
    },
    {
      class: 'CartAddEntrySuccess',
      importPath: '@spartacus/cart/base/core',
      deprecatedNode: 'payload',
      comment:
        "// TODO:Spartacus - The type of property 'payload: { userId: string; cartId: string; productCode: string; quantity: number; deliveryModeChanged?: boolean; entry?: OrderEntry; quantityAdded?: number; statusCode?: string; statusMessage?: string; }' changed to: 'payload: { userId: string; cartId: string; productCode: string; quantity: number; pickupStore?: string; deliveryModeChanged?: boolean; entry?: OrderEntry; quantityAdded?: number; statusCode?: string; statusMessage?: string; }' ",
    },
    {
      class: 'CartUpdateEntry',
      importPath: '@spartacus/cart/base/core',
      deprecatedNode: 'payload',
      comment:
        "// TODO:Spartacus - The type of property 'payload: { userId: string; cartId: string; entryNumber: string; quantity: number; }' changed to: 'payload: { userId: string; cartId: string; entryNumber: string; quantity?: number; pickupStore?: string; pickupToDelivery?: boolean; }' ",
    },
    {
      class: 'CartUpdateEntryFail',
      importPath: '@spartacus/cart/base/core',
      deprecatedNode: 'payload',
      comment:
        "// TODO:Spartacus - The type of property 'payload: { error: any; userId: string; cartId: string; entryNumber: string; quantity?: number; }' changed to: 'payload: { error: any; userId: string; cartId: string; entryNumber: string; quantity?: number; pickupStore?: string; pickupToDelivery?: boolean; }' ",
    },
    {
      class: 'CartUpdateEntrySuccess',
      importPath: '@spartacus/cart/base/core',
      deprecatedNode: 'payload',
      comment:
        "// TODO:Spartacus - The type of property 'payload: { userId: string; cartId: string; entryNumber: string; quantity?: number; }' changed to: 'payload: { userId: string; cartId: string; entryNumber: string; quantity?: number; pickupStore?: string; pickupToDelivery?: boolean; }' ",
    },
    {
      class: 'QuickOrderOrderEntriesContext',
      importPath: '@spartacus/cart/quick-order/components',
      deprecatedNode: 'featureConfigService',
      comment:
        "// TODO:Spartacus - Property 'featureConfigService' was removed from Class 'QuickOrderOrderEntriesContext'. ",
    },
    {
      class: 'MerchandisingCarouselComponent',
      importPath: '@spartacus/cds',
      deprecatedNode: 'componentData',
      comment:
        "// TODO:Spartacus - The type of property 'componentData: CmsComponentData<CmsMerchandisingCarouselComponent>' changed to: 'componentData: CmsComponentData<model>' ",
    },
    {
      class: 'ProfileTagEventService',
      importPath: '@spartacus/cds',
      deprecatedNode: 'latestConsentReference',
      comment:
        "// TODO:Spartacus - The type of property 'latestConsentReference: any' changed to: 'latestConsentReference: BehaviorSubject<string | null>' ",
    },
    {
      class: 'ProfileTagEventService',
      importPath: '@spartacus/cds',
      deprecatedNode: 'notifyProfileTagOfEventOccurence',
      comment:
        "// TODO:Spartacus - Method 'notifyProfileTagOfEventOccurence' was removed from Class 'ProfileTagEventService'. ",
    },
    {
      class: 'CheckoutDeliveryAddressComponent',
      importPath: '@spartacus/checkout/base/components',
      deprecatedNode: 'featureConfigService',
      comment:
        "// TODO:Spartacus - Property 'featureConfigService' was removed from Class 'CheckoutDeliveryAddressComponent'. ",
    },
    {
      class: 'CheckoutDeliveryModeComponent',
      importPath: '@spartacus/checkout/base/components',
      deprecatedNode: 'ngOnDestroy',
      comment:
        "// TODO:Spartacus - Method 'ngOnDestroy' was removed from Class 'CheckoutDeliveryModeComponent'. ",
    },
    {
      class: 'CheckoutDeliveryModeComponent',
      importPath: '@spartacus/checkout/base/components',
      deprecatedNode: 'ngOnInit',
      comment:
        "// TODO:Spartacus - Method 'ngOnInit' was removed from Class 'CheckoutDeliveryModeComponent'. ",
    },
    {
      class: 'CheckoutDeliveryModeComponent',
      importPath: '@spartacus/checkout/base/components',
      deprecatedNode: 'subscriptions',
      comment:
        "// TODO:Spartacus - Property 'subscriptions' was removed from Class 'CheckoutDeliveryModeComponent'. ",
    },
    {
      class: 'CheckoutDeliveryModeComponent',
      importPath: '@spartacus/checkout/base/components',
      deprecatedNode: 'supportedDeliveryModes$',
      comment:
        "// TODO:Spartacus - The type of property 'supportedDeliveryModes$: Observable<DeliveryMode[]>' changed to: 'supportedDeliveryModes$: Observable<import(\"@spartacus/cart/base/root\").DeliveryMode[]>' ",
    },
    {
      class: 'CheckoutPaymentFormComponent',
      importPath: '@spartacus/checkout/base/components',
      deprecatedNode: 'getAddressCardContent',
      comment:
        "// TODO:Spartacus - The 'getAddressCardContent' method's signature changed to: 'getAddressCardContent(  address: Address): Observable<Card>'",
    },
    {
      class: 'CheckoutPaymentFormComponent',
      importPath: '@spartacus/checkout/base/components',
      deprecatedNode: 'getAddressCardContent',
      comment:
        "// TODO:Spartacus - Method 'getAddressCardContent' was removed from Class 'CheckoutPaymentFormComponent'. ",
    },
    {
      class: 'CheckoutPaymentFormComponent',
      importPath: '@spartacus/checkout/base/components',
      deprecatedNode: 'translationService',
      comment:
        "// TODO:Spartacus - The type of property 'translationService: TranslationService | undefined' changed to: 'translationService: TranslationService' ",
    },
    {
      class: 'CheckoutReviewSubmitComponent',
      importPath: '@spartacus/checkout/base/components',
      deprecatedNode: 'featureConfigService',
      comment:
        "// TODO:Spartacus - Property 'featureConfigService' was removed from Class 'CheckoutReviewSubmitComponent'. ",
    },
    {
      class: 'HttpErrorHandler',
      importPath: '@spartacus/core',
      deprecatedNode: 'featureConfigService',
      comment:
        "// TODO:Spartacus - Property 'featureConfigService' was removed from Class 'HttpErrorHandler'. ",
    },
    {
      class: 'OrderConsignedEntriesComponent',
      importPath: '@spartacus/order/components',
      deprecatedNode: 'getConsignmentProducts',
      comment:
        "// TODO:Spartacus - Method 'getConsignmentProducts' was removed from Class 'OrderConsignedEntriesComponent'. ",
    },
    {
      class: 'OrderDetailItemsComponent',
      importPath: '@spartacus/order/components',
      deprecatedNode: 'buyItAgainTranslation$',
      comment:
        "// TODO:Spartacus - Property 'buyItAgainTranslation$' was removed from Class 'OrderDetailItemsComponent'. ",
    },
    {
      class: 'OrderDetailItemsComponent',
      importPath: '@spartacus/order/components',
      deprecatedNode: 'cancel$',
      comment:
        "// TODO:Spartacus - Property 'cancel$' was removed from Class 'OrderDetailItemsComponent'. ",
    },
    {
      class: 'OrderDetailItemsComponent',
      importPath: '@spartacus/order/components',
      deprecatedNode: 'completed$',
      comment:
        "// TODO:Spartacus - Property 'completed$' was removed from Class 'OrderDetailItemsComponent'. ",
    },
    {
      class: 'OrderDetailItemsComponent',
      importPath: '@spartacus/order/components',
      deprecatedNode: 'ngOnInit',
      comment:
        "// TODO:Spartacus - Method 'ngOnInit' was removed from Class 'OrderDetailItemsComponent'. ",
    },
    {
      class: 'OrderDetailItemsComponent',
      importPath: '@spartacus/order/components',
      deprecatedNode: 'others$',
      comment:
        "// TODO:Spartacus - Property 'others$' was removed from Class 'OrderDetailItemsComponent'. ",
    },
    {
      class: 'OrderDetailItemsComponent',
      importPath: '@spartacus/order/components',
      deprecatedNode: 'translation',
      comment:
        "// TODO:Spartacus - Property 'translation' was removed from Class 'OrderDetailItemsComponent'. ",
    },
    {
      class: 'OrderHistoryComponent',
      importPath: '@spartacus/order/components',
      deprecatedNode: 'featureConfigService',
      comment:
        "// TODO:Spartacus - Property 'featureConfigService' was removed from Class 'OrderHistoryComponent'. ",
    },
    {
      class: 'OrderOverviewComponent',
      importPath: '@spartacus/order/components',
      deprecatedNode: 'order',
      comment:
        "// TODO:Spartacus - Property 'order' was removed from Class 'OrderOverviewComponent'. ",
    },
    {
      class: 'OrderHistoryService',
      importPath: '@spartacus/order/core',
      deprecatedNode: 'featureConfigService',
      comment:
        "// TODO:Spartacus - Property 'featureConfigService' was removed from Class 'OrderHistoryService'. ",
    },
    {
      class: 'OrgUnitService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'sortUnitList',
      comment:
        "// TODO:Spartacus - The 'sortUnitList' method's signature changed to: 'sortUnitList(  a: B2BUnitNode,  b: B2BUnitNode): 0 | 1 | -1'",
    },
    {
      class: 'ConfiguratorCartEntryBundleInfoComponent',
      importPath: '@spartacus/product-configurator/common',
      deprecatedNode: 'isDesktop',
      comment:
        "// TODO:Spartacus - Method 'isDesktop' was removed from Class 'ConfiguratorCartEntryBundleInfoComponent'. This method been removed.",
    },
    {
      class: 'CpqAccessLoaderService',
      importPath: '@spartacus/product-configurator/rulebased/root',
      deprecatedNode: 'userIdService',
      comment:
        "// TODO:Spartacus - The type of property 'userIdService: UserIdService | undefined' changed to: 'userIdService: UserIdService' ",
    },
    {
      class: 'CreateConfiguration',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'payload',
      comment:
        "// TODO:Spartacus - The type of property 'payload: { owner: CommonConfigurator.Owner; configIdTemplate?: string; }' changed to: 'payload: { owner: CommonConfigurator.Owner; configIdTemplate?: string; forceReset?: boolean; }' ",
    },
    {
      class: 'ConfiguratorAttributeCheckBoxComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'selectionChange',
      comment:
        "// TODO:Spartacus - Property 'selectionChange' was removed from Class 'ConfiguratorAttributeCheckBoxComponent'. Has been removed, see general migration documentation. Updates are now done via facade service",
    },
    {
      class: 'ConfiguratorAttributeInputFieldComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'inputChange',
      comment:
        "// TODO:Spartacus - Property 'inputChange' was removed from Class 'ConfiguratorAttributeInputFieldComponent'. Has been removed, see general migration documentation. Updates are now done via facade service",
    },
    {
      class: 'ConfiguratorAttributeMultiSelectionBaseComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'selectionChange',
      comment:
        "// TODO:Spartacus - Property 'selectionChange' was removed from Class 'ConfiguratorAttributeMultiSelectionBaseComponent'. Has been removed, see general migration documentation. Updates are now done via facade service",
    },
    {
      class: 'ConfiguratorAttributeMultiSelectionImageComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'selectionChange',
      comment:
        "// TODO:Spartacus - Property 'selectionChange' was removed from Class 'ConfiguratorAttributeMultiSelectionImageComponent'. Has been removed, see general migration documentation. Updates are now done via facade service",
    },
    {
      class: 'ConfiguratorAttributeReadOnlyComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'group',
      comment:
        "// TODO:Spartacus - The type of property 'group: String' changed to: 'group: string' ",
    },
    {
      class: 'ConfiguratorAttributeReadOnlyComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'translationService',
      comment:
        "// TODO:Spartacus - The type of property 'translationService: TranslationService | undefined' changed to: 'translationService: TranslationService' ",
    },
    {
      class: 'ConfiguratorAttributeSingleSelectionBaseComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'selectionChange',
      comment:
        "// TODO:Spartacus - Property 'selectionChange' was removed from Class 'ConfiguratorAttributeSingleSelectionBaseComponent'. Has been removed, see general migration documentation. Updates are now done via facade service",
    },
    {
      class: 'ConfiguratorAttributeSingleSelectionImageComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'selectionChange',
      comment:
        "// TODO:Spartacus - Property 'selectionChange' was removed from Class 'ConfiguratorAttributeSingleSelectionImageComponent'. Has been removed, see general migration documentation. Updates are now done via facade service",
    },
    {
      class: 'ConfiguratorFormComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'activeLanguage$',
      comment:
        "// TODO:Spartacus - Property 'activeLanguage$' was removed from Class 'ConfiguratorFormComponent'. Has been moved to new carved out component ConfiguratorGroupComponent",
    },
    {
      class: 'ConfiguratorFormComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'configExpertModeService',
      comment:
        "// TODO:Spartacus - The type of property 'configExpertModeService: ConfiguratorExpertModeService | undefined' changed to: 'configExpertModeService: ConfiguratorExpertModeService' ",
    },
    {
      class: 'ConfiguratorFormComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'configUtils',
      comment:
        "// TODO:Spartacus - Property 'configUtils' was removed from Class 'ConfiguratorFormComponent'. Has been moved to new carved out component ConfiguratorGroupComponent",
    },
    {
      class: 'ConfiguratorFormComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'createGroupId',
      comment:
        "// TODO:Spartacus - Method 'createGroupId' was removed from Class 'ConfiguratorFormComponent'. Has been moved to new carved out component ConfiguratorGroupComponent",
    },
    {
      class: 'ConfiguratorFormComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'displayConflictDescription',
      comment:
        "// TODO:Spartacus - Method 'displayConflictDescription' was removed from Class 'ConfiguratorFormComponent'. ",
    },
    {
      class: 'ConfiguratorFormComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'expMode',
      comment:
        "// TODO:Spartacus - Property 'expMode' was removed from Class 'ConfiguratorFormComponent'. ",
    },
    {
      class: 'ConfiguratorFormComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'isConflictGroupType',
      comment:
        "// TODO:Spartacus - Method 'isConflictGroupType' was removed from Class 'ConfiguratorFormComponent'. Has been moved to new carved out component ConfiguratorGroupComponent",
    },
    {
      class: 'ConfiguratorFormComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'languageService',
      comment:
        "// TODO:Spartacus - Property 'languageService' was removed from Class 'ConfiguratorFormComponent'. Has been moved to new carved out component ConfiguratorGroupComponent",
    },
    {
      class: 'ConfiguratorFormComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'subscriptions',
      comment:
        "// TODO:Spartacus - Property 'subscriptions' was removed from Class 'ConfiguratorFormComponent'. ",
    },
    {
      class: 'ConfiguratorFormComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'uiType',
      comment:
        "// TODO:Spartacus - Property 'uiType' was removed from Class 'ConfiguratorFormComponent'. Has been moved to new carved out component ConfiguratorGroupComponent",
    },
    {
      class: 'ConfiguratorFormComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'updateConfiguration',
      comment:
        "// TODO:Spartacus - Method 'updateConfiguration' was removed from Class 'ConfiguratorFormComponent'. Has been moved to new carved out component ConfiguratorGroupComponent",
    },
    {
      class: 'ConfiguratorGroupMenuComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'configExpertModeService',
      comment:
        "// TODO:Spartacus - The type of property 'configExpertModeService: ConfiguratorExpertModeService | undefined' changed to: 'configExpertModeService: ConfiguratorExpertModeService' ",
    },
    {
      class: 'ConfiguratorGroupTitleComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'breakpointService',
      comment:
        "// TODO:Spartacus - The type of property 'breakpointService: BreakpointService | undefined' changed to: 'breakpointService: BreakpointService' ",
    },
    {
      class: 'ConfiguratorGroupTitleComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'configExpertModeService',
      comment:
        "// TODO:Spartacus - The type of property 'configExpertModeService: ConfiguratorExpertModeService | undefined' changed to: 'configExpertModeService: ConfiguratorExpertModeService' ",
    },
    {
      class: 'ConfiguratorGroupTitleComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'configuratorStorefrontUtilsService',
      comment:
        "// TODO:Spartacus - The type of property 'configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService | undefined' changed to: 'configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService' ",
    },
    {
      class: 'ConfiguratorGroupTitleComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'featureConfigService',
      comment:
        "// TODO:Spartacus - Property 'featureConfigService' was removed from Class 'ConfiguratorGroupTitleComponent'. ",
    },
    {
      class: 'ConfiguratorGroupTitleComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'hamburgerMenuService',
      comment:
        "// TODO:Spartacus - The type of property 'hamburgerMenuService: HamburgerMenuService | undefined' changed to: 'hamburgerMenuService: HamburgerMenuService' ",
    },
    {
      class: 'ConfiguratorOverviewFormComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'configuratorStorefrontUtilsService',
      comment:
        "// TODO:Spartacus - The type of property 'configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService | undefined' changed to: 'configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService' ",
    },
    {
      class: 'ConfiguratorPriceComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'directionService',
      comment:
        "// TODO:Spartacus - The type of property 'directionService: DirectionService | undefined' changed to: 'directionService: DirectionService' ",
    },
    {
      class: 'ConfiguratorProductTitleComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'configExpertModeService',
      comment:
        "// TODO:Spartacus - The type of property 'configExpertModeService: ConfiguratorExpertModeService | undefined' changed to: 'configExpertModeService: ConfiguratorExpertModeService' ",
    },
    {
      class: 'VariantConfiguratorOccAdapter',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'configExpertModeService',
      comment:
        "// TODO:Spartacus - The type of property 'configExpertModeService: ConfiguratorExpertModeService | undefined' changed to: 'configExpertModeService: ConfiguratorExpertModeService' ",
    },
    {
      class: 'SmartEditService',
      importPath: '@spartacus/smartedit/core',
      deprecatedNode: 'loadScript',
      comment:
        "// TODO:Spartacus - Method 'loadScript' was removed from Class 'SmartEditService'. This method been moved to SmartEditLauncherService class.",
    },
    {
      class: 'SmartEditService',
      importPath: '@spartacus/smartedit/core',
      deprecatedNode: 'scriptLoader',
      comment:
        "// TODO:Spartacus - Property 'scriptLoader' was removed from Class 'SmartEditService'. ",
    },
    {
      class: 'SmartEditLauncherService',
      importPath: '@spartacus/smartedit/root',
      deprecatedNode: 'featureModules',
      comment:
        "// TODO:Spartacus - Property 'featureModules' was removed from Class 'SmartEditLauncherService'. ",
    },
    {
      class: 'SmartEditLauncherService',
      importPath: '@spartacus/smartedit/root',
      deprecatedNode: 'scriptLoader',
      comment:
        "// TODO:Spartacus - The type of property 'scriptLoader: ScriptLoader | undefined' changed to: 'scriptLoader: ScriptLoader' ",
    },
    {
      class: 'AddressBookComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'featureConfigService',
      comment:
        "// TODO:Spartacus - Property 'featureConfigService' was removed from Class 'AddressBookComponent'. ",
    },
    {
      class: 'ParagraphComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'featureConfigService',
      comment:
        "// TODO:Spartacus - Property 'featureConfigService' was removed from Class 'ParagraphComponent'. ",
    },
    {
      class: 'CloseAccountModalComponent',
      importPath: '@spartacus/user/profile/components',
      deprecatedNode: 'featureConfigService',
      comment:
        "// TODO:Spartacus - Property 'featureConfigService' was removed from Class 'CloseAccountModalComponent'. ",
    },
  ];
