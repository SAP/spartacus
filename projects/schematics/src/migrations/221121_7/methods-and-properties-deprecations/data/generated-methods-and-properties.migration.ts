/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

//
// Generated file, don't update manually.
//
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const GENERATED_METHODS_AND_PROPERTIES_MIGRATION: MethodPropertyDeprecation[] = [
	{
		class: 'AsmBindCartComponent',
		importPath: '@spartacus/asm/components',
		deprecatedNode: 'featureConfig',
		comment: '// TODO:Spartacus - Property \'featureConfig\' was removed from Class \'AsmBindCartComponent\'. '
	},
	{
		class: 'CustomerEmulationComponent',
		importPath: '@spartacus/asm/components',
		deprecatedNode: 'featureConfig',
		comment: '// TODO:Spartacus - Property \'featureConfig\' was removed from Class \'CustomerEmulationComponent\'. '
	},
	{
		class: 'CustomerSelectionComponent',
		importPath: '@spartacus/asm/components',
		deprecatedNode: 'featureConfig',
		comment: '// TODO:Spartacus - Property \'featureConfig\' was removed from Class \'CustomerSelectionComponent\'. '
	},
	{
		class: 'AsmConfig',
		importPath: '@spartacus/asm/root',
		deprecatedNode: 'asm',
		comment: '// TODO:Spartacus - The type of property \'asm: { agentSessionTimer?: { startingDelayInSeconds?: number; }; customerSearch?: { maxResults?: number; }; customerList?: { pageSize?: number; showAvatar?: boolean; columns?: { headerLocalizationKey: string; icon?: { symbol?: ICON_TYPE; captionLocalizationKey?: string; }; renderer?: (customer: User) => string; actionType?: CustomerListColumnActionType; }[]; }; userIdHttpHeader?: { enable?: boolean; }; }\' changed to: \'asm: { agentSessionTimer?: { startingDelayInSeconds?: number; }; customerSearch?: { maxResults?: number; }; customerList?: { pageSize?: number; showAvatar?: boolean; columns?: { headerLocalizationKey: string; icon?: { symbol?: ICON_TYPE; captionLocalizationKey?: string; }; renderer?: (customer: User) => string; actionType?: CustomerListColumnActionType; }[]; }; asmSessionSupport?: { enabled?: boolean; }; userIdHttpHeader?: { enable?: boolean; }; createCustomer?: { enable?: boolean; }; }\' '
	},
	{
		class: 'CartCouponComponent',
		importPath: '@spartacus/cart/base/components',
		deprecatedNode: 'featureConfigService',
		comment: '// TODO:Spartacus - Property \'featureConfigService\' was removed from Class \'CartCouponComponent\'. '
	},
	{
		class: 'CdcUserConsentService',
		importPath: '@spartacus/cdc/root',
		deprecatedNode: 'updateCdcConsent',
		comment: '// TODO:Spartacus - Method \'updateCdcConsent\' was removed from Class \'CdcUserConsentService\'. '
	},
	{
		class: 'CdcReconsentComponent',
		importPath: '@spartacus/cdc/user-account',
		deprecatedNode: 'totalConsents',
		comment: '// TODO:Spartacus - Property \'totalConsents\' was removed from Class \'CdcReconsentComponent\'. '
	},
	{
		class: 'CdcReconsentComponentService',
		importPath: '@spartacus/cdc/user-account',
		deprecatedNode: 'saveConsentAndLogin',
		comment: '// TODO:Spartacus - Method \'saveConsentAndLogin\' was removed from Class \'CdcReconsentComponentService\'. '
	},
	{
		class: 'CDCRegisterComponentService',
		importPath: '@spartacus/cdc/user-profile',
		deprecatedNode: 'generatePreferencesObject',
		comment: '// TODO:Spartacus - Method \'generatePreferencesObject\' was removed from Class \'CDCRegisterComponentService\'. '
	},
	{
		class: 'CheckoutDeliveryAddressComponent',
		importPath: '@spartacus/checkout/base/components',
		deprecatedNode: 'featureConfigService',
		comment: '// TODO:Spartacus - Property \'featureConfigService\' was removed from Class \'CheckoutDeliveryAddressComponent\'. '
	},
	{
		class: 'CheckoutPaymentMethodComponent',
		importPath: '@spartacus/checkout/base/components',
		deprecatedNode: 'featureConfigService',
		comment: '// TODO:Spartacus - Property \'featureConfigService\' was removed from Class \'CheckoutPaymentMethodComponent\'. '
	},
	{
		class: 'CxErrorHandler',
		importPath: '@spartacus/core',
		deprecatedNode: 'errorHandlers',
		comment: '// TODO:Spartacus - The type of property \'errorHandlers: import("./multi-error-handler").MultiErrorHandler[]\' changed to: \'errorHandlers: import("@spartacus/core").MultiErrorHandler[]\' '
	},
	{
		class: 'FeatureStylesService',
		importPath: '@spartacus/core',
		deprecatedNode: 'featureConfig',
		comment: '// TODO:Spartacus - Property \'featureConfig\' was removed from Class \'FeatureStylesService\'. '
	},
	{
		class: 'I18nextInitializer',
		importPath: '@spartacus/core',
		deprecatedNode: 'loggerPlugin',
		comment: '// TODO:Spartacus - The type of property \'loggerPlugin: import("i18next").LoggerModule\' changed to: \'loggerPlugin: import("node_modules/i18next").LoggerModule\' '
	},
	{
		class: 'OccCmsComponentAdapter',
		importPath: '@spartacus/core',
		deprecatedNode: 'featureConfigService',
		comment: '// TODO:Spartacus - Property \'featureConfigService\' was removed from Class \'OccCmsComponentAdapter\'. '
	},
	{
		class: 'OccCmsPageAdapter',
		importPath: '@spartacus/core',
		deprecatedNode: 'featureConfigService',
		comment: '// TODO:Spartacus - Property \'featureConfigService\' was removed from Class \'OccCmsPageAdapter\'. '
	},
	{
		class: 'EntitySuccessAction',
		importPath: '@spartacus/core',
		deprecatedNode: 'payload',
		comment: '// TODO:Spartacus - The type of property \'payload: any | undefined\' changed to: \'payload: any\' '
	},
	{
		class: 'CustomerTicketingCreateDialogComponent',
		importPath: '@spartacus/customer-ticketing/components',
		deprecatedNode: 'featureService',
		comment: '// TODO:Spartacus - Property \'featureService\' was removed from Class \'CustomerTicketingCreateDialogComponent\'. '
	},
	{
		class: 'OpfConfig',
		importPath: '@spartacus/opf/base/root',
		deprecatedNode: 'opf',
		comment: '// TODO:Spartacus - The type of property \'opf: { opfBaseUrl?: string; commerceCloudPublicKey?: string; paymentOption?: { paymentInfoMessagesMap?: Record<number, string>; enableInfoMessage?: boolean; }; localPspResources?: Record<number, { jsFiles: string[]; cssFiles: string[]; }>; }\' changed to: \'opf: { opfBaseUrl?: string; commerceCloudPublicKey?: string; paymentOption?: { paymentInfoMessagesMap?: Record<number, string>; enableInfoMessage?: boolean; iframeSandboxMap?: Record<number, string>; }; localPspResources?: Record<number, { jsFiles: string[]; cssFiles: string[]; }>; }\' '
	},
	{
		class: 'OpfCheckoutBillingAddressFormService',
		importPath: '@spartacus/opf/checkout/components',
		deprecatedNode: 'pickupOptionFacade',
		comment: '// TODO:Spartacus - Property \'pickupOptionFacade\' was removed from Class \'OpfCheckoutBillingAddressFormService\'. '
	},
	{
		class: 'OrderGuestRegisterFormComponent',
		importPath: '@spartacus/order/components',
		deprecatedNode: 'authService',
		comment: '// TODO:Spartacus - Property \'authService\' was removed from Class \'OrderGuestRegisterFormComponent\'. '
	},
	{
		class: 'OrderGuestRegisterFormComponent',
		importPath: '@spartacus/order/components',
		deprecatedNode: 'ngOnDestroy',
		comment: '// TODO:Spartacus - Method \'ngOnDestroy\' was removed from Class \'OrderGuestRegisterFormComponent\'. '
	},
	{
		class: 'OrderGuestRegisterFormComponent',
		importPath: '@spartacus/order/components',
		deprecatedNode: 'subscription',
		comment: '// TODO:Spartacus - Property \'subscription\' was removed from Class \'OrderGuestRegisterFormComponent\'. '
	},
	{
		class: 'ReturnOrderComponent',
		importPath: '@spartacus/order/components',
		deprecatedNode: 'featureConfigService',
		comment: '// TODO:Spartacus - Property \'featureConfigService\' was removed from Class \'ReturnOrderComponent\'. '
	},
	{
		class: 'UnitAddressItemService',
		importPath: '@spartacus/organization/administration/components',
		deprecatedNode: 'featureConfigService',
		comment: '// TODO:Spartacus - Property \'featureConfigService\' was removed from Class \'UnitAddressItemService\'. '
	},
	{
		class: 'PickupLocationEffect',
		importPath: '@spartacus/pickup-in-store/core',
		deprecatedNode: 'storeDetails$',
		comment: '// TODO:Spartacus - The type of property \'storeDetails$: import("rxjs").Observable<({ payload: any; error: any; } & import("@ngrx/store").Action<"[Pickup Locations] Get Store Details Fail">) | ({ payload: import("@spartacus/core").PointOfService; } & import("@ngrx/store").Action<"[Pickup Locations] Get Store Details Success">)> & import("@ngrx/effects").CreateEffectMetadata\' changed to: \'storeDetails$: import("rxjs").Observable<({ payload: import("@spartacus/core").PointOfService; } & import("@ngrx/store").Action<"[Pickup Locations] Get Store Details Success">) | ({ payload: any; error: any; } & import("@ngrx/store").Action<"[Pickup Locations] Get Store Details Fail">)> & import("@ngrx/effects").CreateEffectMetadata\' '
	},
	{
		class: 'StockEffect',
		importPath: '@spartacus/pickup-in-store/core',
		deprecatedNode: 'loadStockLevels$',
		comment: '// TODO:Spartacus - The type of property \'loadStockLevels$: import("rxjs").Observable<StockLevelActions.StockLevelFail | StockLevelActions.StockLevelSuccess> & import("@ngrx/effects").CreateEffectMetadata\' changed to: \'loadStockLevels$: import("rxjs").Observable<StockLevelActions.StockLevelSuccess | StockLevelActions.StockLevelFail> & import("@ngrx/effects").CreateEffectMetadata\' '
	},
	{
		class: 'ConfiguratorAttributeSingleSelectionImageComponent',
		importPath: '@spartacus/product-configurator/rulebased',
		deprecatedNode: 'featureConfigService',
		comment: '// TODO:Spartacus - Property \'featureConfigService\' was removed from Class \'ConfiguratorAttributeSingleSelectionImageComponent\'. '
	},
	{
		class: 'ExpressLoggerService',
		importPath: '@spartacus/setup/ssr',
		deprecatedNode: 'serverLogger',
		comment: '// TODO:Spartacus - The type of property \'serverLogger: import("../loggers").ExpressServerLogger\' changed to: \'serverLogger: import("@spartacus/setup/ssr").ExpressServerLogger\' '
	},
	{
		class: 'CmsGuardsService',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'canActivateGuard',
		comment: '// TODO:Spartacus - Method \'canActivateGuard\' was removed from Class \'CmsGuardsService\'. '
	},
	{
		class: 'CmsGuardsService',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'featureConfigService',
		comment: '// TODO:Spartacus - Property \'featureConfigService\' was removed from Class \'CmsGuardsService\'. '
	},
	{
		class: 'CustomFormValidators',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'strongPasswordValidator',
		comment: '// TODO:Spartacus - Method \'strongPasswordValidator\' was removed from Class \'CustomFormValidators\'. '
	},
	{
		class: 'FacetComponent',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'featureConfigService',
		comment: '// TODO:Spartacus - Property \'featureConfigService\' was removed from Class \'FacetComponent\'. '
	},
	{
		class: 'FacetListComponent',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'featureConfigService',
		comment: '// TODO:Spartacus - Property \'featureConfigService\' was removed from Class \'FacetListComponent\'. '
	},
	{
		class: 'MediaComponent',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'isLegacy',
		comment: '// TODO:Spartacus - Property \'isLegacy\' was removed from Class \'MediaComponent\'. '
	},
	{
		class: 'MediaConfig',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'useLegacyMediaComponent',
		comment: '// TODO:Spartacus - Property \'useLegacyMediaComponent\' was removed from Class \'MediaConfig\'. '
	},
	{
		class: 'MediaSourcesPipe',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'transform',
		comment: '// TODO:Spartacus - The \'transform\' method\'s signature changed to: \'transform(  sizes: string): Pick<HTMLSourceElement, "media" | "srcset">[]\''
	},
	{
		class: 'NavigationUIComponent',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'featureConfigService',
		comment: '// TODO:Spartacus - Property \'featureConfigService\' was removed from Class \'NavigationUIComponent\'. '
	},
	{
		class: 'NavigationUIComponent',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'getAriaLabelAndControl',
		comment: '// TODO:Spartacus - Method \'getAriaLabelAndControl\' was removed from Class \'NavigationUIComponent\'. '
	},
	{
		class: 'NavigationUIComponent',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'getSanitizedTitle',
		comment: '// TODO:Spartacus - Method \'getSanitizedTitle\' was removed from Class \'NavigationUIComponent\'. '
	},
	{
		class: 'NgSelectA11yDirective',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'appendAriaLabelToOptions',
		comment: '// TODO:Spartacus - Method \'appendAriaLabelToOptions\' was removed from Class \'NgSelectA11yDirective\'. '
	},
	{
		class: 'NgSelectA11yDirective',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'customizeNgSelectAriaLabelDropdown',
		comment: '// TODO:Spartacus - Method \'customizeNgSelectAriaLabelDropdown\' was removed from Class \'NgSelectA11yDirective\'. '
	},
	{
		class: 'NgSelectA11yDirective',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'onOpen',
		comment: '// TODO:Spartacus - Method \'onOpen\' was removed from Class \'NgSelectA11yDirective\'. '
	},
	{
		class: 'PopoverDirective',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'featureConfigService',
		comment: '// TODO:Spartacus - Property \'featureConfigService\' was removed from Class \'PopoverDirective\'. '
	},
	{
		class: 'SearchBoxComponent',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'breakpointService',
		comment: '// TODO:Spartacus - The type of property \'breakpointService: BreakpointService | null\' changed to: \'breakpointService: BreakpointService\' '
	},
	{
		class: 'SearchBoxComponent',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'changeDetecorRef',
		comment: '// TODO:Spartacus - Property \'changeDetecorRef\' was removed from Class \'SearchBoxComponent\'. '
	},
	{
		class: 'SearchBoxComponent',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'featureConfigService',
		comment: '// TODO:Spartacus - Property \'featureConfigService\' was removed from Class \'SearchBoxComponent\'. '
	},
	{
		class: 'SearchBoxComponent',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'isEnabledFeature',
		comment: '// TODO:Spartacus - Method \'isEnabledFeature\' was removed from Class \'SearchBoxComponent\'. '
	},
	{
		class: 'ThemeService',
		importPath: '@spartacus/storefront',
		deprecatedNode: 'featureConfigService',
		comment: '// TODO:Spartacus - Property \'featureConfigService\' was removed from Class \'ThemeService\'. '
	}
];
