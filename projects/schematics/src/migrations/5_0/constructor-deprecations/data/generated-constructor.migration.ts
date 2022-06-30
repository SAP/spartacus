import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const GENERATED_CONSTRUCTOR_MIGRATIONS: ConstructorDeprecation[] = [
  {
    class: 'AsmMainUiComponent',
    importPath: '@spartacus/asm/components',
    deprecatedParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CsAgentAuthService',
        importPath: '@spartacus/asm/root',
      },
      {
        className: 'UserService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AsmComponentService',
        importPath: '@spartacus/asm/components',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AsmService',
        importPath: '@spartacus/asm/core',
      },
    ],
    removeParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CsAgentAuthService',
        importPath: '@spartacus/asm/root',
      },
      {
        className: 'UserService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AsmComponentService',
        importPath: '@spartacus/asm/components',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AsmService',
        importPath: '@spartacus/asm/core',
      },
    ],
    addParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CsAgentAuthService',
        importPath: '@spartacus/asm/root',
      },
      {
        className: 'AsmComponentService',
        importPath: '@spartacus/asm/components',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AsmService',
        importPath: '@spartacus/asm/core',
      },
      {
        className: 'UserAccountFacade',
        importPath: '@spartacus/user/account/root',
      },
    ],
  },
  {
    class: 'CustomerEmulationComponent',
    importPath: '@spartacus/asm/components',
    deprecatedParams: [
      {
        className: 'AsmComponentService',
        importPath: '@spartacus/asm/components',
      },
      {
        className: 'UserService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'AsmComponentService',
        importPath: '@spartacus/asm/components',
      },
      {
        className: 'UserService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'AsmComponentService',
        importPath: '@spartacus/asm/components',
      },
      {
        className: 'UserAccountFacade',
        importPath: '@spartacus/user/account/root',
      },
    ],
  },
  {
    class: 'CsAgentAuthService',
    importPath: '@spartacus/asm/root',
    deprecatedParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AsmAuthStorageService',
        importPath: '@spartacus/asm/root',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'OAuthLibWrapperService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AsmAuthStorageService',
        importPath: '@spartacus/asm/root',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'OAuthLibWrapperService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AsmAuthStorageService',
        importPath: '@spartacus/asm/root',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'OAuthLibWrapperService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserProfileFacade',
        importPath: '@spartacus/user/profile/root',
      },
    ],
  },
  {
    class: 'CartQuickOrderFormComponent',
    importPath: '@spartacus/cart/quick-order/components',
    deprecatedParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'FormBuilder',
        importPath: '@angular/forms',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'FormBuilder',
        importPath: '@angular/forms',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'FormBuilder',
        importPath: '@angular/forms',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'QuickOrderComponent',
    importPath: '@spartacus/cart/quick-order/components',
    deprecatedParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'QuickOrderFacade',
        importPath: '@spartacus/cart/quick-order/root',
      },
      {
        className: 'QuickOrderStatePersistenceService',
        importPath: '@spartacus/cart/quick-order/core',
      },
    ],
    removeParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'QuickOrderFacade',
        importPath: '@spartacus/cart/quick-order/root',
      },
      {
        className: 'QuickOrderStatePersistenceService',
        importPath: '@spartacus/cart/quick-order/core',
      },
    ],
    addParams: [
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'QuickOrderFacade',
        importPath: '@spartacus/cart/quick-order/root',
      },
      {
        className: 'QuickOrderStatePersistenceService',
        importPath: '@spartacus/cart/quick-order/core',
      },
    ],
  },
  {
    class: 'QuickOrderFormComponent',
    importPath: '@spartacus/cart/quick-order/components',
    deprecatedParams: [
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'QuickOrderFacade',
        importPath: '@spartacus/cart/quick-order/root',
      },
    ],
    removeParams: [
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'QuickOrderFacade',
        importPath: '@spartacus/cart/quick-order/root',
      },
    ],
    addParams: [
      {
        className: 'Config',
        importPath: '@spartacus/core',
      },
      {
        className: 'ChangeDetectorRef',
        importPath: '@angular/core',
      },
      {
        className: 'QuickOrderFacade',
        importPath: '@spartacus/cart/quick-order/root',
      },
      {
        className: 'WindowRef',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'QuickOrderService',
    importPath: '@spartacus/cart/quick-order/core',
    deprecatedParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ProductAdapter',
        importPath: '@spartacus/core',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ProductAdapter',
        importPath: '@spartacus/core',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'Config',
        importPath: '@spartacus/core',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ProductSearchConnector',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'AddToSavedCartComponent',
    importPath: '@spartacus/cart/saved-cart/components',
    deprecatedParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
    ],
  },
  {
    class: 'SavedCartDetailsItemsComponent',
    importPath: '@spartacus/cart/saved-cart/components',
    deprecatedParams: [
      {
        className: 'SavedCartDetailsService',
        importPath: '@spartacus/cart/saved-cart/components',
      },
      {
        className: 'SavedCartFacade',
        importPath: '@spartacus/cart/saved-cart/root',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'SavedCartDetailsService',
        importPath: '@spartacus/cart/saved-cart/components',
      },
      {
        className: 'SavedCartFacade',
        importPath: '@spartacus/cart/saved-cart/root',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'SavedCartDetailsService',
        importPath: '@spartacus/cart/saved-cart/components',
      },
      {
        className: 'SavedCartFacade',
        importPath: '@spartacus/cart/saved-cart/root',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'SavedCartEventBuilder',
    importPath: '@spartacus/cart/saved-cart/core',
    deprecatedParams: [
      {
        className: 'ActionsSubject',
        importPath: '@ngrx/store',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'StateEventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'ActionsSubject',
        importPath: '@ngrx/store',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'StateEventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ActionsSubject',
        importPath: '@ngrx/store',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'StateEventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'MultiCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
    ],
  },
  {
    class: 'SavedCartService',
    importPath: '@spartacus/cart/saved-cart/core',
    deprecatedParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserService',
        importPath: '@spartacus/core',
      },
      {
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserService',
        importPath: '@spartacus/core',
      },
      {
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserAccountFacade',
        importPath: '@spartacus/user/account/root',
      },
      {
        className: 'MultiCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'NewSavedCartOrderEntriesContext',
    importPath: '@spartacus/cart/saved-cart/root',
    deprecatedParams: [
      {
        className: 'ActionsSubject',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SavedCartFacade',
        importPath: '@spartacus/cart/saved-cart/root',
      },
    ],
    removeParams: [
      {
        className: 'ActionsSubject',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SavedCartFacade',
        importPath: '@spartacus/cart/saved-cart/root',
      },
    ],
    addParams: [
      {
        className: 'ProductImportInfoService',
        importPath: '@spartacus/cart/base/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'MultiCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'SavedCartFacade',
        importPath: '@spartacus/cart/saved-cart/root',
      },
    ],
  },
  {
    class: 'SavedCartOrderEntriesContext',
    importPath: '@spartacus/cart/saved-cart/root',
    deprecatedParams: [
      {
        className: 'ActionsSubject',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SavedCartFacade',
        importPath: '@spartacus/cart/saved-cart/root',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'ActionsSubject',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SavedCartFacade',
        importPath: '@spartacus/cart/saved-cart/root',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ProductImportInfoService',
        importPath: '@spartacus/cart/base/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'MultiCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'SavedCartFacade',
        importPath: '@spartacus/cart/saved-cart/root',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'CdcLogoutGuard',
    importPath: '@spartacus/cdc/root',
    deprecatedParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CmsService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ProtectedRoutesService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'WindowRef',
        importPath: '@spartacus/core',
      },
      {
        className: 'AuthRedirectService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CmsService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ProtectedRoutesService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'WindowRef',
        importPath: '@spartacus/core',
      },
      {
        className: 'AuthRedirectService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CmsService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ProtectedRoutesService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'WindowRef',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'CdsMerchandisingProductService',
    importPath: '@spartacus/cds',
    deprecatedParams: [
      {
        className: 'MerchandisingStrategyConnector',
        importPath: '@spartacus/cds',
      },
      {
        className: 'CdsMerchandisingUserContextService',
        importPath: '@spartacus/cds',
      },
      {
        className: 'CdsMerchandisingSiteContextService',
        importPath: '@spartacus/cds',
      },
    ],
    removeParams: [
      {
        className: 'MerchandisingStrategyConnector',
        importPath: '@spartacus/cds',
      },
      {
        className: 'CdsMerchandisingUserContextService',
        importPath: '@spartacus/cds',
      },
      {
        className: 'CdsMerchandisingSiteContextService',
        importPath: '@spartacus/cds',
      },
    ],
    addParams: [
      {
        className: 'MerchandisingStrategyConnector',
        importPath: '@spartacus/cds',
      },
      {
        className: 'CdsMerchandisingUserContextService',
        importPath: '@spartacus/cds',
      },
      {
        className: 'CdsMerchandisingSiteContextService',
        importPath: '@spartacus/cds',
      },
      {
        className: 'CdsMerchandisingSearchContextService',
        importPath: '',
      },
    ],
  },
  {
    class: 'CdsMerchandisingUserContextService',
    importPath: '@spartacus/cds',
    deprecatedParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ProductSearchService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ConverterService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ProfileTagEventService',
        importPath: '@spartacus/cds',
      },
    ],
    removeParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ProductSearchService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ConverterService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ProfileTagEventService',
        importPath: '@spartacus/cds',
      },
    ],
    addParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ProductSearchService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ConverterService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ProfileTagEventService',
        importPath: '@spartacus/cds',
      },
      {
        className: 'ProfileTagLifecycleService',
        importPath: '@spartacus/cds',
      },
    ],
  },
  {
    class: 'ProfileTagPushEventsService',
    importPath: '@spartacus/cds',
    deprecatedParams: [
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'PersonalizationContextService',
        importPath: '@spartacus/tracking/personalization/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'PersonalizationContextService',
        importPath: '@spartacus/tracking/personalization/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'PersonalizationContextService',
        importPath: '@spartacus/tracking/personalization/core',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
    ],
  },
  {
    class: 'ProfileTagPushEventsService',
    importPath: '@spartacus/cds',
    deprecatedParams: [
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'PersonalizationContextService',
        importPath: '@spartacus/tracking/personalization/core',
      },
    ],
    removeParams: [
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'PersonalizationContextService',
        importPath: '@spartacus/tracking/personalization/core',
      },
    ],
    addParams: [
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'PersonalizationContextService',
        importPath: '@spartacus/tracking/personalization/core',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
    ],
  },
  {
    class: 'CartNotEmptyGuard',
    importPath: '@spartacus/checkout/components',
    deprecatedParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
    ],
    removeParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
    ],
    addParams: [
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
    ],
  },
  {
    class: 'CheckoutAuthGuard',
    importPath: '@spartacus/checkout/components',
    deprecatedParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AuthRedirectService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutConfigService',
        importPath: '@spartacus/checkout/components',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'UserAccountFacade',
        importPath: '@spartacus/user/account/root',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AuthRedirectService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutConfigService',
        importPath: '@spartacus/checkout/components',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'UserAccountFacade',
        importPath: '@spartacus/user/account/root',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AuthRedirectService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutConfigService',
        importPath: '@spartacus/checkout/base/components',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
    ],
  },
  {
    class: 'CheckoutGuard',
    importPath: '@spartacus/checkout/components',
    deprecatedParams: [
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'RoutingConfigService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutConfigService',
        importPath: '@spartacus/checkout/components',
      },
      {
        className: 'ExpressCheckoutService',
        importPath: '@spartacus/checkout/components',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutStepService',
        importPath: '@spartacus/checkout/components',
      },
    ],
    removeParams: [
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'RoutingConfigService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutConfigService',
        importPath: '@spartacus/checkout/components',
      },
      {
        className: 'ExpressCheckoutService',
        importPath: '@spartacus/checkout/components',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutStepService',
        importPath: '@spartacus/checkout/components',
      },
    ],
    addParams: [
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'RoutingConfigService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutConfigService',
        importPath: '@spartacus/checkout/base/components',
      },
      {
        className: 'ExpressCheckoutService',
        importPath: '@spartacus/checkout/base/components',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'CheckoutStepService',
        importPath: '@spartacus/checkout/base/components',
      },
    ],
  },
  {
    class: 'CheckoutLoginComponent',
    importPath: '@spartacus/checkout/components',
    deprecatedParams: [
      {
        className: 'FormBuilder',
        importPath: '@angular/forms',
      },
      {
        className: 'AuthRedirectService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'FormBuilder',
        importPath: '@angular/forms',
      },
      {
        className: 'AuthRedirectService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'FormBuilder',
        importPath: '@angular/forms',
      },
      {
        className: 'AuthRedirectService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
    ],
  },
  {
    class: 'CheckoutOrderSummaryComponent',
    importPath: '@spartacus/checkout/components',
    deprecatedParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
    ],
  },
  {
    class: 'CheckoutProgressMobileTopComponent',
    importPath: '@spartacus/checkout/components',
    deprecatedParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutStepService',
        importPath: '@spartacus/checkout/components',
      },
    ],
    removeParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutStepService',
        importPath: '@spartacus/checkout/components',
      },
    ],
    addParams: [
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'CheckoutStepService',
        importPath: '@spartacus/checkout/base/components',
      },
    ],
  },
  {
    class: 'CheckoutReplenishmentFormService',
    importPath: '@spartacus/checkout/components',
    deprecatedParams: [],
    removeParams: [],
    addParams: [
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'CheckoutStepsSetGuard',
    importPath: '@spartacus/checkout/components',
    deprecatedParams: [
      {
        className: 'PaymentTypeFacade',
        importPath: '@spartacus/checkout/root',
      },
      {
        className: 'CheckoutStepService',
        importPath: '@spartacus/checkout/components',
      },
      {
        className: 'CheckoutDetailsService',
        importPath: '@spartacus/checkout/components',
      },
      {
        className: 'RoutingConfigService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutCostCenterFacade',
        importPath: '@spartacus/checkout/root',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
    ],
    removeParams: [
      {
        className: 'PaymentTypeFacade',
        importPath: '@spartacus/checkout/root',
      },
      {
        className: 'CheckoutStepService',
        importPath: '@spartacus/checkout/components',
      },
      {
        className: 'CheckoutDetailsService',
        importPath: '@spartacus/checkout/components',
      },
      {
        className: 'RoutingConfigService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutCostCenterFacade',
        importPath: '@spartacus/checkout/root',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
    ],
    addParams: [
      {
        className: 'CheckoutStepService',
        importPath: '@spartacus/checkout/base/components',
      },
      {
        className: 'RoutingConfigService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutDeliveryAddressFacade',
        importPath: '@spartacus/checkout/base/root',
      },
      {
        className: 'CheckoutPaymentFacade',
        importPath: '@spartacus/checkout/base/root',
      },
      {
        className: 'CheckoutDeliveryModesFacade',
        importPath: '@spartacus/checkout/base/root',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
    ],
  },
  {
    class: 'ExpressCheckoutService',
    importPath: '@spartacus/checkout/components',
    deprecatedParams: [
      {
        className: 'UserAddressService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserPaymentService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutDeliveryFacade',
        importPath: '@spartacus/checkout/root',
      },
      {
        className: 'CheckoutPaymentFacade',
        importPath: '@spartacus/checkout/root',
      },
      {
        className: 'CheckoutDetailsService',
        importPath: '@spartacus/checkout/components',
      },
      {
        className: 'CheckoutConfigService',
        importPath: '@spartacus/checkout/components',
      },
      {
        className: 'ClearCheckoutFacade',
        importPath: '@spartacus/checkout/root',
      },
    ],
    removeParams: [
      {
        className: 'UserAddressService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserPaymentService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutDeliveryFacade',
        importPath: '@spartacus/checkout/root',
      },
      {
        className: 'CheckoutPaymentFacade',
        importPath: '@spartacus/checkout/root',
      },
      {
        className: 'CheckoutDetailsService',
        importPath: '@spartacus/checkout/components',
      },
      {
        className: 'CheckoutConfigService',
        importPath: '@spartacus/checkout/components',
      },
      {
        className: 'ClearCheckoutFacade',
        importPath: '@spartacus/checkout/root',
      },
    ],
    addParams: [
      {
        className: 'UserAddressService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserPaymentService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutDeliveryAddressFacade',
        importPath: '@spartacus/checkout/base/root',
      },
      {
        className: 'CheckoutPaymentFacade',
        importPath: '@spartacus/checkout/base/root',
      },
      {
        className: 'CheckoutConfigService',
        importPath: '@spartacus/checkout/base/components',
      },
      {
        className: 'CheckoutDeliveryModesFacade',
        importPath: '@spartacus/checkout/base/root',
      },
    ],
  },
  {
    class: 'NotCheckoutAuthGuard',
    importPath: '@spartacus/checkout/components',
    deprecatedParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
    ],
    removeParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
    ],
    addParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
    ],
  },
  {
    class: 'OrderConfirmationGuard',
    importPath: '@spartacus/checkout/components',
    deprecatedParams: [
      {
        className: 'CheckoutFacade',
        importPath: '@spartacus/checkout/root',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'CheckoutFacade',
        importPath: '@spartacus/checkout/root',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'OrderFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'CheckoutCostCenterService',
    importPath: '@spartacus/checkout/core',
    deprecatedParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CommandService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutCostCenterConnector',
        importPath: '@spartacus/checkout/b2b/core',
      },
      {
        className: 'CheckoutQueryFacade',
        importPath: '@spartacus/checkout/base/root',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'CheckoutEventModule',
    importPath: '@spartacus/checkout/core',
    deprecatedParams: [
      {
        className: 'CheckoutEventBuilder',
        importPath: '@spartacus/checkout/core',
      },
      {
        className: 'CheckoutEventListener',
        importPath: '@spartacus/checkout/core',
      },
    ],
    removeParams: [
      {
        className: 'CheckoutEventBuilder',
        importPath: '@spartacus/checkout/core',
      },
      {
        className: 'CheckoutEventListener',
        importPath: '@spartacus/checkout/core',
      },
    ],
    addParams: [
      {
        className: 'CheckoutQueryEventListener',
        importPath: '',
      },
      {
        className: 'CheckoutDeliveryAddressEventListener',
        importPath: '@spartacus/checkout/base/root',
      },
      {
        className: 'CheckoutDeliveryModeEventListener',
        importPath: '@spartacus/checkout/base/root',
      },
      {
        className: 'CheckoutPaymentEventListener',
        importPath: '@spartacus/checkout/base/root',
      },
      {
        className: 'CheckoutPlaceOrderEventListener',
        importPath: '',
      },
      {
        className: 'CheckoutLegacyStoreEventListener',
        importPath: '',
      },
    ],
  },
  {
    class: 'CheckoutPageMetaResolver',
    importPath: '@spartacus/checkout/core',
    deprecatedParams: [
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'BasePageMetaResolver',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'BasePageMetaResolver',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'BasePageMetaResolver',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'CheckoutPaymentService',
    importPath: '@spartacus/checkout/core',
    deprecatedParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'QueryService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CommandService',
        importPath: '@spartacus/core',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutPaymentConnector',
        importPath: '@spartacus/checkout/base/core',
      },
      {
        className: 'CheckoutQueryFacade',
        importPath: '@spartacus/checkout/base/root',
      },
    ],
  },
  {
    class: 'OrderConfirmationOrderEntriesContext',
    importPath: '@spartacus/checkout/root',
    deprecatedParams: [
      {
        className: 'CheckoutFacade',
        importPath: '@spartacus/checkout/root',
      },
    ],
    removeParams: [
      {
        className: 'CheckoutFacade',
        importPath: '@spartacus/checkout/root',
      },
    ],
    addParams: [
      {
        className: 'OrderFacade',
        importPath: '@spartacus/order/root',
      },
    ],
  },
  {
    class: 'ActiveCartService',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'MultiCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'CreateWishList',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className:
          '{\n        userId: string;\n        name: string;\n        description?: string;\n    }',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className:
          '{\n        userId: string;\n        name: string;\n        description?: string;\n    }',
        importPath: '',
      },
    ],
    addParams: [
      {
        className:
          '{\n        userId: string;\n        name?: string;\n        description?: string;\n    }',
        importPath: '',
      },
    ],
  },
  {
    class: 'CreateWishListSuccess',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: '{\n        cart: Cart;\n        userId: string;\n    }',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className: '{\n        cart: Cart;\n        userId: string;\n    }',
        importPath: '',
      },
    ],
    addParams: [
      {
        className: '{\n        cart: Cart;\n        cartId: string;\n    }',
        importPath: '',
      },
    ],
  },
  {
    class: 'LoadWishListSuccess',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'LoadWishListSuccessPayload',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className: 'LoadWishListSuccessPayload',
        importPath: '',
      },
    ],
    addParams: [
      {
        className: '{\n        cart: Cart;\n        cartId: string;\n    }',
        importPath: '',
      },
    ],
  },
  {
    class: 'CartEventBuilder',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'ActionsSubject',
        importPath: '@ngrx/store',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'ActionsSubject',
        importPath: '@ngrx/store',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ActionsSubject',
        importPath: '@ngrx/store',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'StateEventService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'CartValidationService',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'CartValidationConnector',
        importPath: '@spartacus/core',
      },
      {
        className: 'CommandService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'CartValidationConnector',
        importPath: '@spartacus/core',
      },
      {
        className: 'CommandService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'CartValidationConnector',
        importPath: '@spartacus/cart/base/core',
      },
      {
        className: 'CommandService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'CartValidationStateService',
        importPath: '@spartacus/cart/base/core',
      },
    ],
  },
  {
    class: 'CartVoucherService',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'LoadCmsComponent',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className:
          '{\n        uid: string;\n        pageContext: PageContext;\n    }',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className:
          '{\n        uid: string;\n        pageContext: PageContext;\n    }',
        importPath: '',
      },
    ],
    addParams: [
      {
        className:
          '{\n        uid: string;\n        pageContext?: PageContext;\n    }',
        importPath: '',
      },
    ],
  },
  {
    class: 'CmsComponentConnector',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'CmsStructureConfigService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CmsComponentAdapter',
        importPath: '@spartacus/core',
      },
      {
        className: 'OccConfig',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'CmsStructureConfigService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CmsComponentAdapter',
        importPath: '@spartacus/core',
      },
      {
        className: 'OccConfig',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'CmsStructureConfigService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CmsComponentAdapter',
        importPath: '@spartacus/core',
      },
      {
        className: 'CmsConfig',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'NotAuthGuard',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AuthRedirectService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
    ],
    removeParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AuthRedirectService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
    ],
    addParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
    ],
  },
  {
    class: 'OccCartNormalizer',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'ConverterService',
        importPath: '@spartacus/core',
      },
      {
        className: 'OrderEntryPromotionsService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'ConverterService',
        importPath: '@spartacus/core',
      },
      {
        className: 'OrderEntryPromotionsService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ConverterService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'OccOrderNormalizer',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'ConverterService',
        importPath: '@spartacus/core',
      },
      {
        className: 'OrderEntryPromotionsService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'ConverterService',
        importPath: '@spartacus/core',
      },
      {
        className: 'OrderEntryPromotionsService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ConverterService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'OccReplenishmentOrderNormalizer',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'ConverterService',
        importPath: '@spartacus/core',
      },
      {
        className: 'OrderEntryPromotionsService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'ConverterService',
        importPath: '@spartacus/core',
      },
      {
        className: 'OrderEntryPromotionsService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ConverterService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'OrderReturnRequestService',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'GetProductSuggestions',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className:
          '{\n        term: string;\n        searchConfig: SearchConfig;\n    }',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className:
          '{\n        term: string;\n        searchConfig: SearchConfig;\n    }',
        importPath: '',
      },
    ],
    addParams: [
      {
        className:
          '{\n        term: string;\n        searchConfig?: SearchConfig;\n    }',
        importPath: '',
      },
    ],
  },
  {
    class: 'SearchProducts',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className:
          '{\n        queryText: string;\n        searchConfig: SearchConfig;\n    }',
        importPath: '',
      },
      {
        className: 'boolean',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className:
          '{\n        queryText: string;\n        searchConfig: SearchConfig;\n    }',
        importPath: '',
      },
      {
        className: 'boolean',
        importPath: '',
      },
    ],
    addParams: [
      {
        className:
          '{\n        queryText: string;\n        searchConfig?: SearchConfig;\n    }',
        importPath: '',
      },
      {
        className: 'boolean | undefined',
        importPath: '',
      },
    ],
  },
  {
    class: 'SearchProductsFail',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'ErrorModel',
        importPath: '@spartacus/core',
      },
      {
        className: 'boolean',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className: 'ErrorModel',
        importPath: '@spartacus/core',
      },
      {
        className: 'boolean',
        importPath: '',
      },
    ],
    addParams: [
      {
        className: 'ErrorModel',
        importPath: '@spartacus/core',
      },
      {
        className: 'boolean | undefined',
        importPath: '',
      },
    ],
  },
  {
    class: 'SearchProductsSuccess',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'ProductSearchPage',
        importPath: '@spartacus/core',
      },
      {
        className: 'boolean',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className: 'ProductSearchPage',
        importPath: '@spartacus/core',
      },
      {
        className: 'boolean',
        importPath: '',
      },
    ],
    addParams: [
      {
        className: 'ProductSearchPage',
        importPath: '@spartacus/core',
      },
      {
        className: 'boolean | undefined',
        importPath: '',
      },
    ],
  },
  {
    class: 'SelectiveCartService',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserService',
        importPath: '@spartacus/core',
      },
      {
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'BaseSiteService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CartConfigService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserService',
        importPath: '@spartacus/core',
      },
      {
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'BaseSiteService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CartConfigService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'UserProfileFacade',
        importPath: '@spartacus/user/profile/root',
      },
      {
        className: 'MultiCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'BaseSiteService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'CurrencyChange',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className:
          '{\n        previous: string;\n        current: string;\n    }',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className:
          '{\n        previous: string;\n        current: string;\n    }',
        importPath: '',
      },
    ],
    addParams: [
      {
        className:
          '{\n        previous: string | null;\n        current: string | null;\n    }',
        importPath: '',
      },
    ],
  },
  {
    class: 'LanguageChange',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className:
          '{\n        previous: string;\n        current: string;\n    }',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className:
          '{\n        previous: string;\n        current: string;\n    }',
        importPath: '',
      },
    ],
    addParams: [
      {
        className:
          '{\n        previous: string | null;\n        current: string | null;\n    }',
        importPath: '',
      },
    ],
  },
  {
    class: 'EntityFailAction',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'string',
        importPath: '',
      },
      {
        className: 'string | string[]',
        importPath: '',
      },
      {
        className: 'any',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className: 'string',
        importPath: '',
      },
      {
        className: 'string | string[]',
        importPath: '',
      },
      {
        className: 'any',
        importPath: '',
      },
    ],
    addParams: [
      {
        className: 'string',
        importPath: '',
      },
      {
        className: 'string | string[] | null',
        importPath: '',
      },
      {
        className: 'any',
        importPath: '',
      },
    ],
  },
  {
    class: 'EntityLoadAction',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'string',
        importPath: '',
      },
      {
        className: 'string | string[]',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className: 'string',
        importPath: '',
      },
      {
        className: 'string | string[]',
        importPath: '',
      },
    ],
    addParams: [
      {
        className: 'string',
        importPath: '',
      },
      {
        className: 'string | string[] | null',
        importPath: '',
      },
    ],
  },
  {
    class: 'EntityLoaderResetAction',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'string',
        importPath: '',
      },
      {
        className: 'string | string[]',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className: 'string',
        importPath: '',
      },
      {
        className: 'string | string[]',
        importPath: '',
      },
    ],
    addParams: [
      {
        className: 'string',
        importPath: '',
      },
      {
        className: 'string | string[] | null',
        importPath: '',
      },
    ],
  },
  {
    class: 'EntityRemoveAction',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'string',
        importPath: '',
      },
      {
        className: 'string | string[]',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className: 'string',
        importPath: '',
      },
      {
        className: 'string | string[]',
        importPath: '',
      },
    ],
    addParams: [
      {
        className: 'string',
        importPath: '',
      },
      {
        className: 'string | string[] | null',
        importPath: '',
      },
    ],
  },
  {
    class: 'EntitySuccessAction',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'string',
        importPath: '',
      },
      {
        className: 'string | string[]',
        importPath: '',
      },
      {
        className: 'any',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className: 'string',
        importPath: '',
      },
      {
        className: 'string | string[]',
        importPath: '',
      },
      {
        className: 'any',
        importPath: '',
      },
    ],
    addParams: [
      {
        className: 'string',
        importPath: '',
      },
      {
        className: 'string | string[] | null',
        importPath: '',
      },
      {
        className: 'any',
        importPath: '',
      },
    ],
  },
  {
    class: 'ClaimCustomerCoupon',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className:
          '{\n        userId: string;\n        couponCode: any;\n    }',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className:
          '{\n        userId: string;\n        couponCode: any;\n    }',
        importPath: '',
      },
    ],
    addParams: [
      {
        className:
          '{\n        userId: string;\n        couponCode: string;\n    }',
        importPath: '',
      },
    ],
  },
  {
    class: 'GiveUserConsent',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className:
          '{\n        userId: string;\n        consentTemplateId: string;\n        consentTemplateVersion: number;\n    }',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className:
          '{\n        userId: string;\n        consentTemplateId: string;\n        consentTemplateVersion: number;\n    }',
        importPath: '',
      },
    ],
    addParams: [
      {
        className:
          '{\n        userId: string;\n        consentTemplateId: string | undefined;\n        consentTemplateVersion: number | undefined;\n    }',
        importPath: '',
      },
    ],
  },
  {
    class: 'TransferAnonymousConsent',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className:
          '{\n        userId: string;\n        consentTemplateId: string;\n        consentTemplateVersion: number;\n    }',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className:
          '{\n        userId: string;\n        consentTemplateId: string;\n        consentTemplateVersion: number;\n    }',
        importPath: '',
      },
    ],
    addParams: [
      {
        className:
          '{\n        userId: string;\n        consentTemplateId: string | undefined;\n        consentTemplateVersion: number | undefined;\n    }',
        importPath: '',
      },
    ],
  },
  {
    class: 'UserService',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserAccountFacadeTransitionalToken',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserProfileFacadeTransitionalToken',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserAccountFacadeTransitionalToken',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserProfileFacadeTransitionalToken',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserProfileFacadeTransitionalToken',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'WindowRef',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'any',
        importPath: '',
      },
      {
        className: 'Object',
        importPath: '',
      },
      {
        className: 'string',
        importPath: '',
      },
      {
        className: 'string',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className: 'any',
        importPath: '',
      },
      {
        className: 'Object',
        importPath: '',
      },
      {
        className: 'string',
        importPath: '',
      },
      {
        className: 'string',
        importPath: '',
      },
    ],
    addParams: [
      {
        className: 'any',
        importPath: '',
      },
      {
        className: 'Object',
        importPath: '',
      },
      {
        className: 'string | undefined',
        importPath: '',
      },
      {
        className: 'string | undefined',
        importPath: '',
      },
    ],
  },
  {
    class: 'WishListService',
    importPath: '@spartacus/core',
    deprecatedParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserService',
        importPath: '@spartacus/core',
      },
      {
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserService',
        importPath: '@spartacus/core',
      },
      {
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserAccountFacade',
        importPath: '@spartacus/user/account/root',
      },
      {
        className: 'MultiCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'ConsignmentTrackingComponent',
    importPath: '@spartacus/order/components',
    deprecatedParams: [
      {
        className: 'OrderFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'ModalService',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'OrderFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'ModalService',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'OrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'ModalService',
        importPath: '@spartacus/storefront',
      },
    ],
  },
  {
    class: 'OrderCancellationService',
    importPath: '@spartacus/order/components',
    deprecatedParams: [
      {
        className: 'OrderDetailsService',
        importPath: '@spartacus/order/components',
      },
      {
        className: 'OrderFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'OrderDetailsService',
        importPath: '@spartacus/order/components',
      },
      {
        className: 'OrderFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'OrderDetailsService',
        importPath: '@spartacus/order/components',
      },
      {
        className: 'OrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'OrderDetailItemsComponent',
    importPath: '@spartacus/order/components',
    deprecatedParams: [
      {
        className: 'OrderDetailsService',
        importPath: '@spartacus/order/components',
      },
    ],
    removeParams: [
      {
        className: 'OrderDetailsService',
        importPath: '@spartacus/order/components',
      },
    ],
    addParams: [
      {
        className: 'OrderDetailsService',
        importPath: '@spartacus/order/components',
      },
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'OrderDetailsService',
    importPath: '@spartacus/order/components',
    deprecatedParams: [
      {
        className: 'OrderFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'OrderFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'OrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'OrderHistoryComponent',
    importPath: '@spartacus/order/components',
    deprecatedParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'OrderFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ReplenishmentOrderFacade',
        importPath: '@spartacus/order/root',
      },
    ],
    removeParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'OrderFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ReplenishmentOrderFacade',
        importPath: '@spartacus/order/root',
      },
    ],
    addParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'OrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ReplenishmentOrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
    ],
  },
  {
    class: 'ReplenishmentOrderCancellationComponent',
    importPath: '@spartacus/order/components',
    deprecatedParams: [
      {
        className: 'ReplenishmentOrderFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'ReplenishmentOrderFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'ReplenishmentOrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
    ],
  },
  {
    class: 'ReplenishmentOrderCancellationDialogComponent',
    importPath: '@spartacus/order/components',
    deprecatedParams: [
      {
        className: 'ReplenishmentOrderFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ElementRef',
        importPath: '@angular/core',
      },
    ],
    removeParams: [
      {
        className: 'ReplenishmentOrderFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ElementRef',
        importPath: '@angular/core',
      },
    ],
    addParams: [
      {
        className: 'ReplenishmentOrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ElementRef',
        importPath: '@angular/core',
      },
    ],
  },
  {
    class: 'ReplenishmentOrderDetailsService',
    importPath: '@spartacus/order/components',
    deprecatedParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ReplenishmentOrderFacade',
        importPath: '@spartacus/order/root',
      },
    ],
    removeParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ReplenishmentOrderFacade',
        importPath: '@spartacus/order/root',
      },
    ],
    addParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ReplenishmentOrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
    ],
  },
  {
    class: 'ReplenishmentOrderHistoryComponent',
    importPath: '@spartacus/order/components',
    deprecatedParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ReplenishmentOrderFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ReplenishmentOrderFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ReplenishmentOrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
    ],
  },
  {
    class: 'TrackingEventsComponent',
    importPath: '@spartacus/order/components',
    deprecatedParams: [
      {
        className: 'NgbActiveModal',
        importPath: '@ng-bootstrap/ng-bootstrap',
      },
      {
        className: 'OrderFacade',
        importPath: '@spartacus/order/root',
      },
    ],
    removeParams: [
      {
        className: 'NgbActiveModal',
        importPath: '@ng-bootstrap/ng-bootstrap',
      },
      {
        className: 'OrderFacade',
        importPath: '@spartacus/order/root',
      },
    ],
    addParams: [
      {
        className: 'NgbActiveModal',
        importPath: '@ng-bootstrap/ng-bootstrap',
      },
      {
        className: 'OrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
    ],
  },
  {
    class: 'OrderService',
    importPath: '@spartacus/order/core',
    deprecatedParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CommandService',
        importPath: '@spartacus/core',
      },
      {
        className: 'OrderConnector',
        importPath: '@spartacus/order/core',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'OrderDetailsOrderEntriesContext',
    importPath: '@spartacus/order/root',
    deprecatedParams: [
      {
        className: 'OrderFacade',
        importPath: '@spartacus/order/root',
      },
    ],
    removeParams: [
      {
        className: 'OrderFacade',
        importPath: '@spartacus/order/root',
      },
    ],
    addParams: [
      {
        className: 'OrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
    ],
  },
  {
    class: 'UserFormComponent',
    importPath: '@spartacus/organization/administration/components',
    deprecatedParams: [
      {
        className: 'ItemService',
        importPath: '@spartacus/organization/administration/components',
      },
      {
        className: 'OrgUnitService',
        importPath: '@spartacus/organization/administration/core',
      },
      {
        className: 'UserService',
        importPath: '@spartacus/core',
      },
      {
        className: 'B2BUserService',
        importPath: '@spartacus/organization/administration/core',
      },
    ],
    removeParams: [
      {
        className: 'ItemService',
        importPath: '@spartacus/organization/administration/components',
      },
      {
        className: 'OrgUnitService',
        importPath: '@spartacus/organization/administration/core',
      },
      {
        className: 'UserService',
        importPath: '@spartacus/core',
      },
      {
        className: 'B2BUserService',
        importPath: '@spartacus/organization/administration/core',
      },
    ],
    addParams: [
      {
        className: 'ItemService',
        importPath: '@spartacus/organization/administration/components',
      },
      {
        className: 'OrgUnitService',
        importPath: '@spartacus/organization/administration/core',
      },
      {
        className: 'UserProfileFacade',
        importPath: '@spartacus/user/profile/root',
      },
      {
        className: 'B2BUserService',
        importPath: '@spartacus/organization/administration/core',
      },
    ],
  },
  {
    class: 'AdminGuard',
    importPath: '@spartacus/organization/administration/core',
    deprecatedParams: [
      {
        className: 'UserService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'UserService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'UserAccountFacade',
        importPath: '@spartacus/user/account/root',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'ConfiguratorCartEntryBundleInfoComponent',
    importPath: '@spartacus/product-configurator/common',
    deprecatedParams: [
      {
        className: 'CommonConfiguratorUtilsService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'ConfiguratorCartEntryBundleInfoService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'BreakpointService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'CartItemContext',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'CommonConfiguratorUtilsService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'ConfiguratorCartEntryBundleInfoService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'BreakpointService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'CartItemContext',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'CommonConfiguratorUtilsService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'ConfiguratorCartEntryBundleInfoService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'BreakpointService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CartItemContext',
        importPath: '@spartacus/cart/base/root',
      },
    ],
  },
  {
    class: 'ConfiguratorAddToCartButtonComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ConfiguratorCommonsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorCartService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorGroupsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorRouterExtractorService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ConfiguratorCommonsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorCartService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorGroupsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorRouterExtractorService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ConfiguratorCommonsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorCartService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorGroupsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorRouterExtractorService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'OrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'CommonConfiguratorUtilsService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'ConfiguratorStorefrontUtilsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'IntersectionService',
        importPath: '@spartacus/storefront',
      },
    ],
  },
  {
    class: 'ConfiguratorAttributeDropDownComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedParams: [
      {
        className: 'ConfiguratorAttributeQuantityService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
    ],
    removeParams: [
      {
        className: 'ConfiguratorAttributeQuantityService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
    ],
    addParams: [
      {
        className: 'ConfiguratorAttributeQuantityService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'ConfiguratorAttributeHeaderComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedParams: [
      {
        className: 'ConfiguratorStorefrontUtilsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
    ],
    removeParams: [
      {
        className: 'ConfiguratorStorefrontUtilsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
    ],
    addParams: [
      {
        className: 'ConfiguratorStorefrontUtilsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorCommonsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorGroupsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorUISettingsConfig',
        importPath: '@spartacus/product-configurator/rulebased',
      },
    ],
  },
  {
    class: 'ConfiguratorAttributeNumericInputFieldComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedParams: [
      {
        className: 'ConfiguratorAttributeNumericInputFieldService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorUISettingsConfig',
        importPath: '@spartacus/product-configurator/rulebased',
      },
    ],
    removeParams: [
      {
        className: 'ConfiguratorAttributeNumericInputFieldService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorUISettingsConfig',
        importPath: '@spartacus/product-configurator/rulebased',
      },
    ],
    addParams: [
      {
        className: 'ConfiguratorAttributeNumericInputFieldService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorUISettingsConfig',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'ConfiguratorAttributeProductCardComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedParams: [
      {
        className: 'ProductService',
        importPath: '@spartacus/core',
      },
      {
        className: 'KeyboardFocusService',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'ProductService',
        importPath: '@spartacus/core',
      },
      {
        className: 'KeyboardFocusService',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'ProductService',
        importPath: '@spartacus/core',
      },
      {
        className: 'KeyboardFocusService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'ConfiguratorAttributeRadioButtonComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedParams: [
      {
        className: 'ConfiguratorAttributeQuantityService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
    ],
    removeParams: [
      {
        className: 'ConfiguratorAttributeQuantityService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
    ],
    addParams: [
      {
        className: 'ConfiguratorAttributeQuantityService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'ConfiguratorAttributeSingleSelectionBaseComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedParams: [
      {
        className: 'ConfiguratorAttributeQuantityService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
    ],
    removeParams: [
      {
        className: 'ConfiguratorAttributeQuantityService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
    ],
    addParams: [
      {
        className: 'ConfiguratorAttributeQuantityService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'ConfiguratorCartService',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CommonConfiguratorUtilsService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'CheckoutFacade',
        importPath: '@spartacus/checkout/root',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ConfiguratorUtilsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
    ],
    removeParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CommonConfiguratorUtilsService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'CheckoutFacade',
        importPath: '@spartacus/checkout/root',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ConfiguratorUtilsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
    ],
    addParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'CommonConfiguratorUtilsService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'CheckoutQueryFacade',
        importPath: '@spartacus/checkout/base/root',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ConfiguratorUtilsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
    ],
  },
  {
    class: 'ConfiguratorCommonsService',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'CommonConfiguratorUtilsService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'ConfiguratorCartService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ConfiguratorUtilsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
    ],
    removeParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'CommonConfiguratorUtilsService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'ConfiguratorCartService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ConfiguratorUtilsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
    ],
    addParams: [
      {
        className: 'Store',
        importPath: '@ngrx/store',
      },
      {
        className: 'CommonConfiguratorUtilsService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'ConfiguratorCartService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'ConfiguratorUtilsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
    ],
  },
  {
    class: 'ConfiguratorExitButtonComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedParams: [
      {
        className: 'ProductService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ConfiguratorRouterExtractorService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'ConfiguratorCommonsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'BreakpointService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'WindowRef',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'ProductService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ConfiguratorRouterExtractorService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'ConfiguratorCommonsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'BreakpointService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'WindowRef',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ProductService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ConfiguratorRouterExtractorService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'ConfiguratorCommonsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'BreakpointService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'WindowRef',
        importPath: '@spartacus/core',
      },
      {
        className: 'Location',
        importPath: '@angular/common',
      },
    ],
  },
  {
    class: 'ConfiguratorGroupMenuComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedParams: [
      {
        className: 'ConfiguratorCommonsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorGroupsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'HamburgerMenuService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ConfiguratorRouterExtractorService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'ConfiguratorStorefrontUtilsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorGroupMenuService',
        importPath: '',
      },
      {
        className: 'DirectionService',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'ConfiguratorCommonsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorGroupsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'HamburgerMenuService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ConfiguratorRouterExtractorService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'ConfiguratorStorefrontUtilsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorGroupMenuService',
        importPath: '',
      },
      {
        className: 'DirectionService',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'ConfiguratorCommonsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorGroupsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'HamburgerMenuService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ConfiguratorRouterExtractorService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'ConfiguratorStorefrontUtilsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
      {
        className: 'ConfiguratorGroupMenuService',
        importPath: '',
      },
      {
        className: 'DirectionService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'ConfiguratorOverviewBundleAttributeComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedParams: [
      {
        className: 'ProductService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'ProductService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ProductService',
        importPath: '@spartacus/core',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'ConfiguratorTabBarComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedParams: [
      {
        className: 'ConfiguratorRouterExtractorService',
        importPath: '@spartacus/product-configurator/common',
      },
    ],
    removeParams: [
      {
        className: 'ConfiguratorRouterExtractorService',
        importPath: '@spartacus/product-configurator/common',
      },
    ],
    addParams: [
      {
        className: 'ConfiguratorRouterExtractorService',
        importPath: '@spartacus/product-configurator/common',
      },
      {
        className: 'ConfiguratorCommonsService',
        importPath: '@spartacus/product-configurator/rulebased',
      },
    ],
  },
  {
    class: 'OccConfiguratorVariantNormalizer',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedParams: [
      {
        className: 'OccConfig',
        importPath: '@spartacus/core',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'OccConfig',
        importPath: '@spartacus/core',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'OccConfig',
        importPath: '@spartacus/core',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ConfiguratorUISettingsConfig',
        importPath: '@spartacus/product-configurator/rulebased',
      },
    ],
  },
  {
    class: 'ActiveCartOrderEntriesContext',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'ActionsSubject',
        importPath: '@ngrx/store',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'ActionsSubject',
        importPath: '@ngrx/store',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ProductImportInfoService',
        importPath: '@spartacus/cart/base/core',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
    ],
  },
  {
    class: 'AddedToCartDialogComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'ModalService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'ModalService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ModalService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
    ],
  },
  {
    class: 'AddressBookComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'AddressBookComponentService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'AddressBookComponentService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'AddressBookComponentService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'AddToCartComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'ModalService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'CurrentProductService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ChangeDetectorRef',
        importPath: '@angular/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'ModalService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'CurrentProductService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ChangeDetectorRef',
        importPath: '@angular/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'CurrentProductService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ChangeDetectorRef',
        importPath: '@angular/core',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ProductListItemContext',
        importPath: '@spartacus/storefront',
      },
    ],
  },
  {
    class: 'AddToCartComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'ModalService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'CurrentProductService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ChangeDetectorRef',
        importPath: '@angular/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'ModalService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'CurrentProductService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ChangeDetectorRef',
        importPath: '@angular/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'CurrentProductService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ChangeDetectorRef',
        importPath: '@angular/core',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ProductListItemContext',
        importPath: '@spartacus/storefront',
      },
    ],
  },
  {
    class: 'AddToWishListComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'WishListService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CurrentProductService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'WishListService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CurrentProductService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'WishListFacade',
        importPath: '@spartacus/cart/wish-list/root',
      },
      {
        className: 'CurrentProductService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'AppliedCouponsComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'CartVoucherService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'CartVoucherService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'CartVoucherFacade',
        importPath: '@spartacus/cart/base/root',
      },
    ],
  },
  {
    class: 'BannerComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CmsService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'CartCouponComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'CartVoucherService',
        importPath: '@spartacus/core',
      },
      {
        className: 'FormBuilder',
        importPath: '@angular/forms',
      },
      {
        className: 'CustomerCouponService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'CartVoucherService',
        importPath: '@spartacus/core',
      },
      {
        className: 'FormBuilder',
        importPath: '@angular/forms',
      },
      {
        className: 'CustomerCouponService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'CartVoucherFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'FormBuilder',
        importPath: '@angular/forms',
      },
      {
        className: 'CustomerCouponService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
    ],
  },
  {
    class: 'CartDetailsComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SelectiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SelectiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'SelectiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CartConfigService',
        importPath: '@spartacus/cart/base/core',
      },
    ],
  },
  {
    class: 'CartItemListComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SelectiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SelectiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'SelectiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'UserIdService',
        importPath: '@spartacus/core',
      },
      {
        className: 'MultiCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'ChangeDetectorRef',
        importPath: '@angular/core',
      },
      {
        className: 'OutletContextData',
        importPath: '@spartacus/storefront',
      },
    ],
  },
  {
    class: 'CartPageLayoutHandler',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SelectiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SelectiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'SelectiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'CartConfigService',
        importPath: '@spartacus/cart/base/core',
      },
    ],
  },
  {
    class: 'CartTotalsComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
    ],
  },
  {
    class: 'CartValidationGuard',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'CartValidationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CartValidationStateService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'CartConfigService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'CartValidationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CartValidationStateService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'CartConfigService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'CartValidationFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'CartValidationStateService',
        importPath: '@spartacus/cart/base/core',
      },
      {
        className: 'CartConfigService',
        importPath: '@spartacus/cart/base/core',
      },
    ],
  },
  {
    class: 'CartValidationWarningsComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'CartValidationStateService',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'CartValidationStateService',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'CartValidationFacade',
        importPath: '@spartacus/cart/base/root',
      },
    ],
  },
  {
    class: 'CmsGuardsService',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'CmsComponentsService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'Injector',
        importPath: '@angular/core',
      },
    ],
    removeParams: [
      {
        className: 'CmsComponentsService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'Injector',
        importPath: '@angular/core',
      },
    ],
    addParams: [
      {
        className: 'CmsComponentsService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'UnifiedInjector',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'ComponentWrapperDirective',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'CmsComponentsService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'Injector',
        importPath: '@angular/core',
      },
      {
        className: 'DynamicAttributeService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Renderer2',
        importPath: '@angular/core',
      },
      {
        className: 'ComponentHandlerService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'CmsInjectorService',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'CmsComponentsService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'Injector',
        importPath: '@angular/core',
      },
      {
        className: 'DynamicAttributeService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Renderer2',
        importPath: '@angular/core',
      },
      {
        className: 'ComponentHandlerService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'CmsInjectorService',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'CmsComponentsService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'Injector',
        importPath: '@angular/core',
      },
      {
        className: 'DynamicAttributeService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Renderer2',
        importPath: '@angular/core',
      },
      {
        className: 'ComponentHandlerService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'CmsInjectorService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'ConsignmentTrackingComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'UserOrderService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ModalService',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'UserOrderService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ModalService',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'OrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'ModalService',
        importPath: '@spartacus/storefront',
      },
    ],
  },
  {
    class: 'GenericLinkComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'Router',
        importPath: '@angular/router',
      },
    ],
    removeParams: [
      {
        className: 'Router',
        importPath: '@angular/router',
      },
    ],
    addParams: [
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'GenericLinkComponentService',
        importPath: '@spartacus/storefront',
      },
    ],
  },
  {
    class: 'InnerComponentsHostDirective',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'CmsComponentsService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'Injector',
        importPath: '@angular/core',
      },
      {
        className: 'DynamicAttributeService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Renderer2',
        importPath: '@angular/core',
      },
      {
        className: 'ComponentHandlerService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'CmsInjectorService',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'CmsComponentsService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'Injector',
        importPath: '@angular/core',
      },
      {
        className: 'DynamicAttributeService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Renderer2',
        importPath: '@angular/core',
      },
      {
        className: 'ComponentHandlerService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'CmsInjectorService',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'CmsComponentsService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'Injector',
        importPath: '@angular/core',
      },
      {
        className: 'DynamicAttributeService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Renderer2',
        importPath: '@angular/core',
      },
      {
        className: 'ComponentHandlerService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'CmsInjectorService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'LoginGuard',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AuthRedirectService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AuthConfigService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CmsPageGuard',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AuthRedirectService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AuthConfigService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CmsPageGuard',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'AuthConfigService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CmsPageGuard',
        importPath: '@spartacus/storefront',
      },
    ],
  },
  {
    class: 'LogoutGuard',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CmsService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ProtectedRoutesService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'AuthRedirectService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CmsService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ProtectedRoutesService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'AuthRedirectService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'AuthService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CmsService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SemanticPathService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ProtectedRoutesService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
    ],
  },
  {
    class: 'MiniCartComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'MiniCartComponentService',
        importPath: '@spartacus/cart/base/components/mini-cart',
      },
    ],
  },
  {
    class: 'NavigationUIComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'Renderer2',
        importPath: '@angular/core',
      },
      {
        className: 'ElementRef',
        importPath: '@angular/core',
      },
      {
        className: 'HamburgerMenuService',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'Renderer2',
        importPath: '@angular/core',
      },
      {
        className: 'ElementRef',
        importPath: '@angular/core',
      },
      {
        className: 'HamburgerMenuService',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'Router',
        importPath: '@angular/router',
      },
      {
        className: 'Renderer2',
        importPath: '@angular/core',
      },
      {
        className: 'ElementRef',
        importPath: '@angular/core',
      },
      {
        className: 'HamburgerMenuService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'WindowRef',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'OrderCancellationService',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'OrderDetailsService',
        importPath: '@spartacus/order/components',
      },
      {
        className: 'UserOrderService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'OrderDetailsService',
        importPath: '@spartacus/order/components',
      },
      {
        className: 'UserOrderService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'OrderDetailsService',
        importPath: '@spartacus/order/components',
      },
      {
        className: 'OrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'OrderDetailItemsComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'OrderDetailsService',
        importPath: '@spartacus/order/components',
      },
    ],
    removeParams: [
      {
        className: 'OrderDetailsService',
        importPath: '@spartacus/order/components',
      },
    ],
    addParams: [
      {
        className: 'OrderDetailsService',
        importPath: '@spartacus/order/components',
      },
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'OrderDetailsService',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'UserOrderService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UnifiedInjector',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'UserOrderService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UnifiedInjector',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'OrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'OrderHistoryComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserOrderService',
        importPath: '@spartacus/core',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserReplenishmentOrderService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserOrderService',
        importPath: '@spartacus/core',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserReplenishmentOrderService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'OrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ReplenishmentOrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
    ],
  },
  {
    class: 'OrderReturnRequestListComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'OrderReturnRequestService',
        importPath: '@spartacus/core',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'OrderReturnRequestService',
        importPath: '@spartacus/core',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'OrderReturnRequestFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'OrderReturnService',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'OrderDetailsService',
        importPath: '@spartacus/order/components',
      },
      {
        className: 'OrderReturnRequestService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'OrderDetailsService',
        importPath: '@spartacus/order/components',
      },
      {
        className: 'OrderReturnRequestService',
        importPath: '@spartacus/core',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'OrderDetailsService',
        importPath: '@spartacus/order/components',
      },
      {
        className: 'OrderReturnRequestFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'PageLayoutService',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'CmsService',
        importPath: '@spartacus/core',
      },
      {
        className: 'LayoutConfig',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'BreakpointService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'PageLayoutHandler',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'CmsService',
        importPath: '@spartacus/core',
      },
      {
        className: 'LayoutConfig',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'BreakpointService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'PageLayoutHandler',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'CmsService',
        importPath: '@spartacus/core',
      },
      {
        className: 'LayoutConfig',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'BreakpointService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'UnifiedInjector',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'PageSlotService',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'CmsComponentsService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'any',
        importPath: '',
      },
      {
        className: 'any',
        importPath: '',
      },
    ],
    removeParams: [
      {
        className: 'CmsComponentsService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'any',
        importPath: '',
      },
      {
        className: 'any',
        importPath: '',
      },
    ],
    addParams: [
      {
        className: 'CmsComponentsService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'any',
        importPath: '',
      },
      {
        className: 'Document',
        importPath: '',
      },
    ],
  },
  {
    class: 'ParagraphComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'Router',
        importPath: '@angular/router',
      },
    ],
  },
  {
    class: 'ProductDetailsTabComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'CurrentProductService',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'CurrentProductService',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'CurrentProductService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'CmsService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'ProductIntroComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'CurrentProductService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'WindowRef',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'CurrentProductService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'WindowRef',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'CurrentProductService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'WindowRef',
        importPath: '@spartacus/core',
      },
      {
        className: 'EventService',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'ProductListComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'PageLayoutService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ProductListComponentService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ViewConfig',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'PageLayoutService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ProductListComponentService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ViewConfig',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'PageLayoutService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ProductListComponentService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ViewConfig',
        importPath: '@spartacus/storefront',
      },
    ],
  },
  {
    class: 'ReplenishmentOrderCancellationComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'UserReplenishmentOrderService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'UserReplenishmentOrderService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'ReplenishmentOrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
    ],
  },
  {
    class: 'ReplenishmentOrderCancellationDialogComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'UserReplenishmentOrderService',
        importPath: '@spartacus/core',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ElementRef',
        importPath: '@angular/core',
      },
    ],
    removeParams: [
      {
        className: 'UserReplenishmentOrderService',
        importPath: '@spartacus/core',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ElementRef',
        importPath: '@angular/core',
      },
    ],
    addParams: [
      {
        className: 'ReplenishmentOrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ElementRef',
        importPath: '@angular/core',
      },
    ],
  },
  {
    class: 'ReplenishmentOrderDetailsService',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserReplenishmentOrderService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserReplenishmentOrderService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ReplenishmentOrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
    ],
  },
  {
    class: 'ReplenishmentOrderHistoryComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserReplenishmentOrderService',
        importPath: '@spartacus/core',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserReplenishmentOrderService',
        importPath: '@spartacus/core',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'RoutingService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ReplenishmentOrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ViewContainerRef',
        importPath: '@angular/core',
      },
      {
        className: 'LaunchDialogService',
        importPath: '@spartacus/storefront',
      },
    ],
  },
  {
    class: 'RoutingContextService',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'ActivatedRoutesService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Injector',
        importPath: '@angular/core',
      },
    ],
    removeParams: [
      {
        className: 'ActivatedRoutesService',
        importPath: '@spartacus/core',
      },
      {
        className: 'Injector',
        importPath: '@angular/core',
      },
    ],
    addParams: [
      {
        className: 'ActivatedRoutesService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UnifiedInjector',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'SaveForLaterComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'CmsService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SelectiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'CmsService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'SelectiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'CmsService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'SelectiveCartFacade',
        importPath: '@spartacus/cart/base/root',
      },
    ],
  },
  {
    class: 'TabParagraphContainerComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'CmsService',
        importPath: '@spartacus/core',
      },
      {
        className: 'WindowRef',
        importPath: '@spartacus/core',
      },
      {
        className: 'BreakpointService',
        importPath: '@spartacus/storefront',
      },
    ],
    removeParams: [
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'CmsService',
        importPath: '@spartacus/core',
      },
      {
        className: 'WindowRef',
        importPath: '@spartacus/core',
      },
      {
        className: 'BreakpointService',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'CmsService',
        importPath: '@spartacus/core',
      },
      {
        className: 'WindowRef',
        importPath: '@spartacus/core',
      },
    ],
  },
  {
    class: 'TrackingEventsComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'NgbActiveModal',
        importPath: '@ng-bootstrap/ng-bootstrap',
      },
      {
        className: 'UserOrderService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'NgbActiveModal',
        importPath: '@ng-bootstrap/ng-bootstrap',
      },
      {
        className: 'UserOrderService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'NgbActiveModal',
        importPath: '@ng-bootstrap/ng-bootstrap',
      },
      {
        className: 'OrderHistoryFacade',
        importPath: '@spartacus/order/root',
      },
    ],
  },
  {
    class: 'WishListComponent',
    importPath: '@spartacus/storefront',
    deprecatedParams: [
      {
        className: 'WishListService',
        importPath: '@spartacus/core',
      },
    ],
    removeParams: [
      {
        className: 'WishListService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'WishListFacade',
        importPath: '@spartacus/cart/wish-list/root',
      },
    ],
  },
];
