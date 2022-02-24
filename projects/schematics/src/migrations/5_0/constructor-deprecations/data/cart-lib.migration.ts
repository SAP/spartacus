import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CART_LIB_MIGRATION: ConstructorDeprecation[] = [
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
    ],
    addParams: [
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
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
    ],
    addParams: [
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
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
        className: 'EventService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ProductSearchConnector',
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
    ],
    addParams: [
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
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
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
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
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'MultiCartFacade',
        importPath: '@spartacus/cart/base/root',
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
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ProductImportInfoService',
        importPath: '@spartacus/cart/base/core',
      },
      {
        className: 'MultiCartFacade',
        importPath: '@spartacus/cart/base/root',
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
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ProductImportInfoService',
        importPath: '@spartacus/cart/base/core',
      },
      {
        className: 'MultiCartFacade',
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
    ],
    addParams: [
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
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
    class: 'CheckoutDetailsService',
    importPath: '@spartacus/checkout/components',
    deprecatedParams: [
      {
        className: 'CheckoutFacade',
        importPath: '@spartacus/checkout/root',
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
    ],
    addParams: [
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
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
    class: 'PaymentMethodComponent',
    importPath: '@spartacus/checkout/components',
    deprecatedParams: [
      {
        className: 'UserPaymentService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutFacade',
        importPath: '@spartacus/checkout/root',
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
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActivatedRoute',
        importPath: '@angular/router',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
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
    class: 'ReviewSubmitComponent',
    importPath: '@spartacus/checkout/components',
    deprecatedParams: [
      {
        className: 'CheckoutDeliveryFacade',
        importPath: '@spartacus/checkout/root',
      },
      {
        className: 'CheckoutPaymentFacade',
        importPath: '@spartacus/checkout/root',
      },
      {
        className: 'UserAddressService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutStepService',
        importPath: '@spartacus/checkout/components',
      },
      {
        className: 'PaymentTypeFacade',
        importPath: '@spartacus/checkout/root',
      },
      {
        className: 'CheckoutCostCenterFacade',
        importPath: '@spartacus/checkout/root',
      },
      {
        className: 'UserCostCenterService',
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
    class: 'ShippingAddressComponent',
    importPath: '@spartacus/checkout/components',
    deprecatedParams: [
      {
        className: 'UserAddressService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutDeliveryFacade',
        importPath: '@spartacus/checkout/root',
      },
      {
        className: 'ActivatedRoute',
        importPath: '@angular/router',
      },
      {
        className: 'TranslationService',
        importPath: '@spartacus/core',
      },
      {
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutStepService',
        importPath: '@spartacus/checkout/components',
      },
      {
        className: 'GlobalMessageService',
        importPath: '@spartacus/core',
      },
      {
        className: 'PaymentTypeFacade',
        importPath: '@spartacus/checkout/root',
      },
      {
        className: 'UserCostCenterService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CheckoutCostCenterFacade',
        importPath: '@spartacus/checkout/root',
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
    class: 'CheckoutDeliveryService',
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
      {
        className: 'CheckoutService',
        importPath: '@spartacus/checkout/core',
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
      {
        className: 'CheckoutService',
        importPath: '@spartacus/checkout/core',
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
    class: 'CheckoutService',
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
    class: 'PaymentTypeService',
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
    ],
    addParams: [
      {
        className: 'MultiCartFacade',
        importPath: '@spartacus/cart/base/root',
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
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
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
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
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
        className: 'OrderEntryPromotionsService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [],
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
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
      {
        className: 'CartConfigService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'MultiCartFacade',
        importPath: '@spartacus/cart/base/root',
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
        className: 'MultiCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'MultiCartFacade',
        importPath: '@spartacus/cart/base/root',
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
        className: 'ActiveCartService',
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
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'CmsComponentData',
        importPath: '@spartacus/storefront',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
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
    ],
    addParams: [
      {
        className: 'WishListFacade',
        importPath: '@spartacus/cart/wish-list/root',
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
      {
        className: 'Router',
        importPath: '@angular/router',
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
        className: 'ActiveCartService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'CartValidationFacade',
        importPath: '@spartacus/cart/base/root',
      },
      {
        className: 'ActiveCartFacade',
        importPath: '@spartacus/cart/base/root',
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
    ],
    addParams: [
      {
        className: 'OrderFacade',
        importPath: '@spartacus/order/root',
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
        className: 'UserOrderService',
        importPath: '@spartacus/core',
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
        className: 'UnifiedInjector',
        importPath: '@spartacus/core',
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
        className: 'UserOrderService',
        importPath: '@spartacus/core',
      },
      {
        className: 'UserReplenishmentOrderService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'OrderFacade',
        importPath: '@spartacus/order/root',
      },
      {
        className: 'ReplenishmentOrderFacade',
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
    ],
    addParams: [
      {
        className: 'OrderReturnRequestFacade',
        importPath: '@spartacus/order/root',
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
        className: 'OrderReturnRequestService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'OrderReturnRequestFacade',
        importPath: '@spartacus/order/root',
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
        className: 'PageLayoutHandler',
        importPath: '@spartacus/storefront',
      },
    ],
    addParams: [
      {
        className: 'UnifiedInjector',
        importPath: '@spartacus/core',
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
    ],
    addParams: [
      {
        className: 'ReplenishmentOrderFacade',
        importPath: '@spartacus/order/root',
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
    ],
    addParams: [
      {
        className: 'ReplenishmentOrderFacade',
        importPath: '@spartacus/order/root',
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
        className: 'UserReplenishmentOrderService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ReplenishmentOrderFacade',
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
        className: 'UserReplenishmentOrderService',
        importPath: '@spartacus/core',
      },
    ],
    addParams: [
      {
        className: 'ReplenishmentOrderFacade',
        importPath: '@spartacus/order/root',
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
        className: 'Injector',
        importPath: '@angular/core',
      },
    ],
    addParams: [
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
        className: 'UserOrderService',
        importPath: '@spartacus/core',
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
