import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const CART_LIB_AND_CHECKOUT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: 'QuickOrderFormComponent',
    importPath: '@spartacus/cart/quick-order/components',
    deprecatedNode: 'globalMessageService',
    comment:
      "// TODO:Spartacus - Property 'globalMessageService' was removed from Class 'QuickOrderFormComponent'. ",
  },
  {
    class: 'QuickOrderService',
    importPath: '@spartacus/cart/quick-order/core',
    deprecatedNode: 'productAdapter',
    comment:
      "// TODO:Spartacus - Property 'productAdapter' was removed from Class 'QuickOrderService'. ",
  },
  {
    class: 'QuickOrderService',
    importPath: '@spartacus/cart/quick-order/core',
    deprecatedNode: 'removeEntry',
    comment:
      "// TODO:Spartacus - Method 'removeEntry' was removed from Class 'QuickOrderService'. ",
  },
  {
    class: 'QuickOrderService',
    importPath: '@spartacus/cart/quick-order/core',
    deprecatedNode: 'search',
    comment:
      "// TODO:Spartacus - Method 'search' was removed from Class 'QuickOrderService'. ",
  },
  {
    class: 'QuickOrderFacade',
    importPath: '@spartacus/cart/quick-order/root',
    deprecatedNode: 'removeEntry',
    comment:
      "// TODO:Spartacus - Method 'removeEntry' was removed from Class 'QuickOrderFacade'. ",
  },
  {
    class: 'QuickOrderFacade',
    importPath: '@spartacus/cart/quick-order/root',
    deprecatedNode: 'search',
    comment:
      "// TODO:Spartacus - Method 'search' was removed from Class 'QuickOrderFacade'. ",
  },
  {
    class: 'AddToSavedCartComponent',
    importPath: '@spartacus/cart/saved-cart/components',
    deprecatedNode: 'activeCartService',
    comment:
      "// TODO:Spartacus - Property 'activeCartService' was removed from Class 'AddToSavedCartComponent'. ",
  },
  {
    class: 'SavedCartAdapter',
    importPath: '@spartacus/cart/saved-cart/core',
    deprecatedNode: 'saveCart',
    comment:
      "// TODO:Spartacus - Method 'saveCart' was removed from Class 'SavedCartAdapter'. ",
  },
  {
    class: 'SavedCartConnector',
    importPath: '@spartacus/cart/saved-cart/core',
    deprecatedNode: 'saveCart',
    comment:
      "// TODO:Spartacus - Method 'saveCart' was removed from Class 'SavedCartConnector'. ",
  },
  {
    class: 'SavedCartEventBuilder',
    importPath: '@spartacus/cart/saved-cart/core',
    deprecatedNode: 'registerDeleteSavedCartEvents',
    comment:
      "// TODO:Spartacus - Method 'registerDeleteSavedCartEvents' was removed from Class 'SavedCartEventBuilder'. It was moved to 'CartEventBuilder', and was renamed to 'registerDeleteCart'.",
  },
  {
    class: 'OccSavedCartAdapter',
    importPath: '@spartacus/cart/saved-cart/occ',
    deprecatedNode: 'getSaveCartEndpoint',
    comment:
      "// TODO:Spartacus - Method 'getSaveCartEndpoint' was removed from Class 'OccSavedCartAdapter'. ",
  },
  {
    class: 'OccSavedCartAdapter',
    importPath: '@spartacus/cart/saved-cart/occ',
    deprecatedNode: 'saveCart',
    comment:
      "// TODO:Spartacus - Method 'saveCart' was removed from Class 'OccSavedCartAdapter'. ",
  },
  {
    class: 'NewSavedCartOrderEntriesContext',
    importPath: '@spartacus/cart/saved-cart/root',
    deprecatedNode: 'actionsSubject',
    comment:
      "// TODO:Spartacus - Property 'actionsSubject' was removed from Class 'NewSavedCartOrderEntriesContext'. ",
  },
  {
    class: 'SavedCartOrderEntriesContext',
    importPath: '@spartacus/cart/saved-cart/root',
    deprecatedNode: 'actionsSubject',
    comment:
      "// TODO:Spartacus - Property 'actionsSubject' was removed from Class 'SavedCartOrderEntriesContext'. ",
  },
  {
    class: 'CartNotEmptyGuard',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'activeCartService',
    comment:
      "// TODO:Spartacus - Property 'activeCartService' was removed from Class 'CartNotEmptyGuard'. ",
  },
  {
    class: 'CheckoutAuthGuard',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'activeCartService',
    comment:
      "// TODO:Spartacus - Property 'activeCartService' was removed from Class 'CheckoutAuthGuard'. ",
  },
  {
    class: 'CheckoutAuthGuard',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'globalMessageService',
    comment:
      "// TODO:Spartacus - Property 'globalMessageService' was removed from Class 'CheckoutAuthGuard'. ",
  },
  {
    class: 'CheckoutAuthGuard',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'handleUserRole',
    comment:
      "// TODO:Spartacus - Method 'handleUserRole' was removed from Class 'CheckoutAuthGuard'. ",
  },
  {
    class: 'CheckoutAuthGuard',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'userService',
    comment:
      "// TODO:Spartacus - Property 'userService' was removed from Class 'CheckoutAuthGuard'. ",
  },
  {
    class: 'CheckoutGuard',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'activeCartService',
    comment:
      "// TODO:Spartacus - Property 'activeCartService' was removed from Class 'CheckoutGuard'. ",
  },
  {
    class: 'CheckoutLoginComponent',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'activeCartService',
    comment:
      "// TODO:Spartacus - Property 'activeCartService' was removed from Class 'CheckoutLoginComponent'. ",
  },
  {
    class: 'CheckoutOrderSummaryComponent',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'activeCartService',
    comment:
      "// TODO:Spartacus - Property 'activeCartService' was removed from Class 'CheckoutOrderSummaryComponent'. ",
  },
  {
    class: 'CheckoutProgressMobileTopComponent',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'activeCartService',
    comment:
      "// TODO:Spartacus - Property 'activeCartService' was removed from Class 'CheckoutProgressMobileTopComponent'. ",
  },
  {
    class: 'CheckoutProgressMobileTopComponent',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'ngOnInit',
    comment:
      "// TODO:Spartacus - Method 'ngOnInit' was removed from Class 'CheckoutProgressMobileTopComponent'. ",
  },
  {
    class: 'CheckoutStepsSetGuard',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'checkoutCostCenterService',
    comment:
      "// TODO:Spartacus - Property 'checkoutCostCenterService' was removed from Class 'CheckoutStepsSetGuard'. ",
  },
  {
    class: 'CheckoutStepsSetGuard',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'checkoutDetailsService',
    comment:
      "// TODO:Spartacus - Property 'checkoutDetailsService' was removed from Class 'CheckoutStepsSetGuard'. ",
  },
  {
    class: 'CheckoutStepsSetGuard',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'isPaymentTypeSet',
    comment:
      "// TODO:Spartacus - Method 'isPaymentTypeSet' was removed from Class 'CheckoutStepsSetGuard'. ",
  },
  {
    class: 'CheckoutStepsSetGuard',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'isShippingAddressAndCostCenterSet',
    comment:
      "// TODO:Spartacus - Method 'isShippingAddressAndCostCenterSet' was removed from Class 'CheckoutStepsSetGuard'. ",
  },
  {
    class: 'CheckoutStepsSetGuard',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'paymentTypeService',
    comment:
      "// TODO:Spartacus - Property 'paymentTypeService' was removed from Class 'CheckoutStepsSetGuard'. ",
  },
  {
    class: 'ExpressCheckoutService',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'checkoutDeliveryService',
    comment:
      "// TODO:Spartacus - Property 'checkoutDeliveryService' was removed from Class 'ExpressCheckoutService'. ",
  },
  {
    class: 'ExpressCheckoutService',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'checkoutDetailsService',
    comment:
      "// TODO:Spartacus - Property 'checkoutDetailsService' was removed from Class 'ExpressCheckoutService'. ",
  },
  {
    class: 'ExpressCheckoutService',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'checkoutPaymentService',
    comment:
      "// TODO:Spartacus - Property 'checkoutPaymentService' was removed from Class 'ExpressCheckoutService'. ",
  },
  {
    class: 'ExpressCheckoutService',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'clearCheckoutService',
    comment:
      "// TODO:Spartacus - Property 'clearCheckoutService' was removed from Class 'ExpressCheckoutService'. ",
  },
  {
    class: 'ExpressCheckoutService',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'setShippingAddress',
    comment:
      "// TODO:Spartacus - Method 'setShippingAddress' was removed from Class 'ExpressCheckoutService'. ",
  },
  {
    class: 'NotCheckoutAuthGuard',
    importPath: '@spartacus/checkout/components',
    deprecatedNode: 'activeCartService',
    comment:
      "// TODO:Spartacus - Property 'activeCartService' was removed from Class 'NotCheckoutAuthGuard'. ",
  },
  {
    class: 'CheckoutAdapter',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'clearCheckoutDeliveryAddress',
    comment:
      "// TODO:Spartacus - Method 'clearCheckoutDeliveryAddress' was removed from Class 'CheckoutAdapter'. ",
  },
  {
    class: 'CheckoutAdapter',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'clearCheckoutDeliveryMode',
    comment:
      "// TODO:Spartacus - Method 'clearCheckoutDeliveryMode' was removed from Class 'CheckoutAdapter'. ",
  },
  {
    class: 'CheckoutAdapter',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'loadCheckoutDetails',
    comment:
      "// TODO:Spartacus - Method 'loadCheckoutDetails' was removed from Class 'CheckoutAdapter'. ",
  },
  {
    class: 'CheckoutAdapter',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'placeOrder',
    comment:
      "// TODO:Spartacus - Method 'placeOrder' was removed from Class 'CheckoutAdapter'. ",
  },
  {
    class: 'CheckoutConnector',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'clearCheckoutDeliveryAddress',
    comment:
      "// TODO:Spartacus - Method 'clearCheckoutDeliveryAddress' was removed from Class 'CheckoutConnector'. ",
  },
  {
    class: 'CheckoutConnector',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'clearCheckoutDeliveryMode',
    comment:
      "// TODO:Spartacus - Method 'clearCheckoutDeliveryMode' was removed from Class 'CheckoutConnector'. ",
  },
  {
    class: 'CheckoutConnector',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'loadCheckoutDetails',
    comment:
      "// TODO:Spartacus - Method 'loadCheckoutDetails' was removed from Class 'CheckoutConnector'. ",
  },
  {
    class: 'CheckoutConnector',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'placeOrder',
    comment:
      "// TODO:Spartacus - Method 'placeOrder' was removed from Class 'CheckoutConnector'. ",
  },
  {
    class: 'CheckoutCostCenterService',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'activeCartService',
    comment:
      "// TODO:Spartacus - Property 'activeCartService' was removed from Class 'CheckoutCostCenterService'. ",
  },
  {
    class: 'CheckoutCostCenterService',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'checkoutStore',
    comment:
      "// TODO:Spartacus - Property 'checkoutStore' was removed from Class 'CheckoutCostCenterService'. ",
  },
  {
    class: 'CheckoutCostCenterService',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'getCostCenter',
    comment:
      "// TODO:Spartacus - Method 'getCostCenter' was removed from Class 'CheckoutCostCenterService'. ",
  },
  {
    class: 'CheckoutPageMetaResolver',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'activeCartService',
    comment:
      "// TODO:Spartacus - Property 'activeCartService' was removed from Class 'CheckoutPageMetaResolver'. ",
  },
  {
    class: 'CheckoutPageMetaResolver',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'cart$',
    comment:
      "// TODO:Spartacus - Property 'cart$' was removed from Class 'CheckoutPageMetaResolver'. ",
  },
  {
    class: 'CheckoutPageMetaResolver',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'translation',
    comment:
      "// TODO:Spartacus - Property 'translation' was removed from Class 'CheckoutPageMetaResolver'. ",
  },
  {
    class: 'CheckoutPaymentAdapter',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'create',
    comment:
      "// TODO:Spartacus - Method 'create' was removed from Class 'CheckoutPaymentAdapter'. ",
  },
  {
    class: 'CheckoutPaymentAdapter',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'loadCardTypes',
    comment:
      "// TODO:Spartacus - Method 'loadCardTypes' was removed from Class 'CheckoutPaymentAdapter'. ",
  },
  {
    class: 'CheckoutPaymentAdapter',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'set',
    comment:
      "// TODO:Spartacus - Method 'set' was removed from Class 'CheckoutPaymentAdapter'. ",
  },
  {
    class: 'CheckoutPaymentConnector',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'create',
    comment:
      "// TODO:Spartacus - Method 'create' was removed from Class 'CheckoutPaymentConnector'. ",
  },
  {
    class: 'CheckoutPaymentConnector',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'set',
    comment:
      "// TODO:Spartacus - Method 'set' was removed from Class 'CheckoutPaymentConnector'. ",
  },
  {
    class: 'CheckoutPaymentService',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'actionAllowed',
    comment:
      "// TODO:Spartacus - Method 'actionAllowed' was removed from Class 'CheckoutPaymentService'. ",
  },
  {
    class: 'CheckoutPaymentService',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'activeCartService',
    comment:
      "// TODO:Spartacus - Property 'activeCartService' was removed from Class 'CheckoutPaymentService'. ",
  },
  {
    class: 'CheckoutPaymentService',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'checkoutStore',
    comment:
      "// TODO:Spartacus - Property 'checkoutStore' was removed from Class 'CheckoutPaymentService'. ",
  },
  {
    class: 'CheckoutPaymentService',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'getPaymentDetails',
    comment:
      "// TODO:Spartacus - Method 'getPaymentDetails' was removed from Class 'CheckoutPaymentService'. ",
  },
  {
    class: 'CheckoutPaymentService',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'getSetPaymentDetailsResultProcess',
    comment:
      "// TODO:Spartacus - Method 'getSetPaymentDetailsResultProcess' was removed from Class 'CheckoutPaymentService'. ",
  },
  {
    class: 'CheckoutPaymentService',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'loadSupportedCardTypes',
    comment:
      "// TODO:Spartacus - Method 'loadSupportedCardTypes' was removed from Class 'CheckoutPaymentService'. ",
  },
  {
    class: 'CheckoutPaymentService',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'paymentProcessSuccess',
    comment:
      "// TODO:Spartacus - Method 'paymentProcessSuccess' was removed from Class 'CheckoutPaymentService'. ",
  },
  {
    class: 'CheckoutPaymentService',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'processStateStore',
    comment:
      "// TODO:Spartacus - Property 'processStateStore' was removed from Class 'CheckoutPaymentService'. ",
  },
  {
    class: 'CheckoutPaymentService',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'resetSetPaymentDetailsProcess',
    comment:
      "// TODO:Spartacus - Method 'resetSetPaymentDetailsProcess' was removed from Class 'CheckoutPaymentService'. ",
  },
  {
    class: 'CheckoutState',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'cardTypes',
    comment:
      "// TODO:Spartacus - PropertySignature 'cardTypes' was removed from Interface 'CheckoutState'. ",
  },
  {
    class: 'CheckoutState',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'orderType',
    comment:
      "// TODO:Spartacus - PropertySignature 'orderType' was removed from Interface 'CheckoutState'. ",
  },
  {
    class: 'CheckoutState',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'paymentTypes',
    comment:
      "// TODO:Spartacus - PropertySignature 'paymentTypes' was removed from Interface 'CheckoutState'. ",
  },
  {
    class: 'CheckoutState',
    importPath: '@spartacus/checkout/core',
    deprecatedNode: 'steps',
    comment:
      "// TODO:Spartacus - PropertySignature 'steps' was removed from Interface 'CheckoutState'. ",
  },
  {
    class: 'CheckoutOccEndpoints',
    importPath: '@spartacus/checkout/occ',
    deprecatedNode: 'loadCheckoutDetails',
    comment:
      "// TODO:Spartacus - PropertySignature 'loadCheckoutDetails' was removed from Interface 'CheckoutOccEndpoints'. ",
  },
  {
    class: 'CheckoutOccEndpoints',
    importPath: '@spartacus/checkout/occ',
    deprecatedNode: 'paymentTypes',
    comment:
      "// TODO:Spartacus - PropertySignature 'paymentTypes' was removed from Interface 'CheckoutOccEndpoints'. ",
  },
  {
    class: 'CheckoutOccEndpoints',
    importPath: '@spartacus/checkout/occ',
    deprecatedNode: 'placeOrder',
    comment:
      "// TODO:Spartacus - PropertySignature 'placeOrder' was removed from Interface 'CheckoutOccEndpoints'. ",
  },
  {
    class: 'CheckoutOccEndpoints',
    importPath: '@spartacus/checkout/occ',
    deprecatedNode: 'setCartCostCenter',
    comment:
      "// TODO:Spartacus - PropertySignature 'setCartCostCenter' was removed from Interface 'CheckoutOccEndpoints'. ",
  },
  {
    class: 'CheckoutOccEndpoints',
    importPath: '@spartacus/checkout/occ',
    deprecatedNode: 'setCartPaymentType',
    comment:
      "// TODO:Spartacus - PropertySignature 'setCartPaymentType' was removed from Interface 'CheckoutOccEndpoints'. ",
  },
  {
    class: 'OccCheckoutAdapter',
    importPath: '@spartacus/checkout/occ',
    deprecatedNode: 'clearCheckoutDeliveryAddress',
    comment:
      "// TODO:Spartacus - Method 'clearCheckoutDeliveryAddress' was removed from Class 'OccCheckoutAdapter'. ",
  },
  {
    class: 'OccCheckoutAdapter',
    importPath: '@spartacus/checkout/occ',
    deprecatedNode: 'clearCheckoutDeliveryMode',
    comment:
      "// TODO:Spartacus - Method 'clearCheckoutDeliveryMode' was removed from Class 'OccCheckoutAdapter'. ",
  },
  {
    class: 'OccCheckoutAdapter',
    importPath: '@spartacus/checkout/occ',
    deprecatedNode: 'getClearDeliveryModeEndpoint',
    comment:
      "// TODO:Spartacus - Method 'getClearDeliveryModeEndpoint' was removed from Class 'OccCheckoutAdapter'. ",
  },
  {
    class: 'OccCheckoutAdapter',
    importPath: '@spartacus/checkout/occ',
    deprecatedNode: 'getLoadCheckoutDetailsEndpoint',
    comment:
      "// TODO:Spartacus - Method 'getLoadCheckoutDetailsEndpoint' was removed from Class 'OccCheckoutAdapter'. ",
  },
  {
    class: 'OccCheckoutAdapter',
    importPath: '@spartacus/checkout/occ',
    deprecatedNode: 'getPlaceOrderEndpoint',
    comment:
      "// TODO:Spartacus - Method 'getPlaceOrderEndpoint' was removed from Class 'OccCheckoutAdapter'. ",
  },
  {
    class: 'OccCheckoutAdapter',
    importPath: '@spartacus/checkout/occ',
    deprecatedNode: 'getRemoveDeliveryAddressEndpoint',
    comment:
      "// TODO:Spartacus - Method 'getRemoveDeliveryAddressEndpoint' was removed from Class 'OccCheckoutAdapter'. ",
  },
  {
    class: 'OccCheckoutAdapter',
    importPath: '@spartacus/checkout/occ',
    deprecatedNode: 'loadCheckoutDetails',
    comment:
      "// TODO:Spartacus - Method 'loadCheckoutDetails' was removed from Class 'OccCheckoutAdapter'. ",
  },
  {
    class: 'OccCheckoutAdapter',
    importPath: '@spartacus/checkout/occ',
    deprecatedNode: 'placeOrder',
    comment:
      "// TODO:Spartacus - Method 'placeOrder' was removed from Class 'OccCheckoutAdapter'. ",
  },
  {
    class: 'OccCheckoutPaymentAdapter',
    importPath: '@spartacus/checkout/occ',
    deprecatedNode: 'create',
    comment:
      "// TODO:Spartacus - Method 'create' was removed from Class 'OccCheckoutPaymentAdapter'. ",
  },
  {
    class: 'OccCheckoutPaymentAdapter',
    importPath: '@spartacus/checkout/occ',
    deprecatedNode: 'loadCardTypes',
    comment:
      "// TODO:Spartacus - Method 'loadCardTypes' was removed from Class 'OccCheckoutPaymentAdapter'. ",
  },
  {
    class: 'OccCheckoutPaymentAdapter',
    importPath: '@spartacus/checkout/occ',
    deprecatedNode: 'set',
    comment:
      "// TODO:Spartacus - Method 'set' was removed from Class 'OccCheckoutPaymentAdapter'. ",
  },
  {
    class: 'OccCheckoutPaymentTypeAdapter',
    importPath: '@spartacus/checkout/occ',
    deprecatedNode: 'loadPaymentTypes',
    comment:
      "// TODO:Spartacus - Method 'loadPaymentTypes' was removed from Class 'OccCheckoutPaymentTypeAdapter'. ",
  },
  {
    class: 'CheckoutCostCenterFacade',
    importPath: '@spartacus/checkout/root',
    deprecatedNode: 'getCostCenter',
    comment:
      "// TODO:Spartacus - Method 'getCostCenter' was removed from Class 'CheckoutCostCenterFacade'. ",
  },
  {
    class: 'CheckoutPaymentFacade',
    importPath: '@spartacus/checkout/root',
    deprecatedNode: 'getPaymentDetails',
    comment:
      "// TODO:Spartacus - Method 'getPaymentDetails' was removed from Class 'CheckoutPaymentFacade'. ",
  },
  {
    class: 'CheckoutPaymentFacade',
    importPath: '@spartacus/checkout/root',
    deprecatedNode: 'getSetPaymentDetailsResultProcess',
    comment:
      "// TODO:Spartacus - Method 'getSetPaymentDetailsResultProcess' was removed from Class 'CheckoutPaymentFacade'. ",
  },
  {
    class: 'CheckoutPaymentFacade',
    importPath: '@spartacus/checkout/root',
    deprecatedNode: 'loadSupportedCardTypes',
    comment:
      "// TODO:Spartacus - Method 'loadSupportedCardTypes' was removed from Class 'CheckoutPaymentFacade'. ",
  },
  {
    class: 'CheckoutPaymentFacade',
    importPath: '@spartacus/checkout/root',
    deprecatedNode: 'paymentProcessSuccess',
    comment:
      "// TODO:Spartacus - Method 'paymentProcessSuccess' was removed from Class 'CheckoutPaymentFacade'. ",
  },
  {
    class: 'CheckoutPaymentFacade',
    importPath: '@spartacus/checkout/root',
    deprecatedNode: 'resetSetPaymentDetailsProcess',
    comment:
      "// TODO:Spartacus - Method 'resetSetPaymentDetailsProcess' was removed from Class 'CheckoutPaymentFacade'. ",
  },
  {
    class: 'OrderConfirmationOrderEntriesContext',
    importPath: '@spartacus/checkout/root',
    deprecatedNode: 'checkoutService',
    comment:
      "// TODO:Spartacus - Property 'checkoutService' was removed from Class 'OrderConfirmationOrderEntriesContext'. ",
  },
  {
    class: 'OrderPlacedEvent',
    importPath: '@spartacus/checkout/root',
    deprecatedNode: 'code',
    comment:
      "// TODO:Spartacus - Property 'code' was removed from Class 'OrderPlacedEvent'. ",
  },
  {
    class: 'ActiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'cartSelector$',
    comment:
      "// TODO:Spartacus - Property 'cartSelector$' was removed from Class 'ActiveCartService'. ",
  },
  {
    class: 'ActiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'isEmail',
    comment:
      "// TODO:Spartacus - Method 'isEmail' was removed from Class 'ActiveCartService'. ",
  },
  {
    class: 'ActiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'isEmpty',
    comment:
      "// TODO:Spartacus - Method 'isEmpty' was removed from Class 'ActiveCartService'. ",
  },
  {
    class: 'ActiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'isJustLoggedIn',
    comment:
      "// TODO:Spartacus - Method 'isJustLoggedIn' was removed from Class 'ActiveCartService'. ",
  },
  {
    class: 'ActiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'multiCartService',
    comment:
      "// TODO:Spartacus - Property 'multiCartService' was removed from Class 'ActiveCartService'. ",
  },
  {
    class: 'ActiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'requireLoadedCartForGuestMerge',
    comment:
      "// TODO:Spartacus - Method 'requireLoadedCartForGuestMerge' was removed from Class 'ActiveCartService'. ",
  },
  {
    class: 'ActiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'store',
    comment:
      "// TODO:Spartacus - Property 'store' was removed from Class 'ActiveCartService'. ",
  },
  {
    class: 'AddUserAddressEvent',
    importPath: '@spartacus/core',
    deprecatedNode: 'userId',
    comment:
      "// TODO:Spartacus - Property 'userId' was removed from Class 'AddUserAddressEvent'. ",
  },
  {
    class: 'AuthHttpHeaderService',
    importPath: '@spartacus/core',
    deprecatedNode: 'handleExpiredToken',
    comment:
      "// TODO:Spartacus - Method 'handleExpiredToken' was removed from Class 'AuthHttpHeaderService'. Use 'getValidToken' instead.",
  },
  {
    class: 'AuthHttpHeaderService',
    importPath: '@spartacus/core',
    deprecatedNode: 'refreshInProgress',
    comment:
      "// TODO:Spartacus - Property 'refreshInProgress' was removed from Class 'AuthHttpHeaderService'. Use 'refreshInProgress$' Observable instead.",
  },
  {
    class: 'BadRequestHandler',
    importPath: '@spartacus/core',
    deprecatedNode: 'handleBadCartRequest',
    comment:
      "// TODO:Spartacus - Method 'handleBadCartRequest' was removed from Class 'BadRequestHandler'. ",
  },
  {
    class: 'BadRequestHandler',
    importPath: '@spartacus/core',
    deprecatedNode: 'handleVoucherOperationError',
    comment:
      "// TODO:Spartacus - Method 'handleVoucherOperationError' was removed from Class 'BadRequestHandler'. ",
  },
  {
    class: 'CartPersistenceModule',
    importPath: '@spartacus/core',
    deprecatedNode: 'forRoot',
    comment:
      "// TODO:Spartacus - Method 'forRoot' was removed from Class 'CartPersistenceModule'. ",
  },
  {
    class: 'CartValidationService',
    importPath: '@spartacus/core',
    deprecatedNode: 'activeCartService',
    comment:
      "// TODO:Spartacus - Property 'activeCartService' was removed from Class 'CartValidationService'. ",
  },
  {
    class: 'CartVoucherService',
    importPath: '@spartacus/core',
    deprecatedNode: 'activeCartService',
    comment:
      "// TODO:Spartacus - Property 'activeCartService' was removed from Class 'CartVoucherService'. ",
  },
  {
    class: 'DeleteUserAddressEvent',
    importPath: '@spartacus/core',
    deprecatedNode: 'userId',
    comment:
      "// TODO:Spartacus - Property 'userId' was removed from Class 'DeleteUserAddressEvent'. ",
  },
  {
    class: 'MultiCartState',
    importPath: '@spartacus/core',
    deprecatedNode: 'active',
    comment:
      "// TODO:Spartacus - PropertySignature 'active' was removed from Interface 'MultiCartState'. ",
  },
  {
    class: 'MultiCartState',
    importPath: '@spartacus/core',
    deprecatedNode: 'wishList',
    comment:
      "// TODO:Spartacus - PropertySignature 'wishList' was removed from Interface 'MultiCartState'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'addEmail',
    comment:
      "// TODO:Spartacus - PropertySignature 'addEmail' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'addEntries',
    comment:
      "// TODO:Spartacus - PropertySignature 'addEntries' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'cancelOrder',
    comment:
      "// TODO:Spartacus - PropertySignature 'cancelOrder' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'cancelReplenishmentOrder',
    comment:
      "// TODO:Spartacus - PropertySignature 'cancelReplenishmentOrder' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'cancelReturn',
    comment:
      "// TODO:Spartacus - PropertySignature 'cancelReturn' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'cart',
    comment:
      "// TODO:Spartacus - PropertySignature 'cart' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'carts',
    comment:
      "// TODO:Spartacus - PropertySignature 'carts' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'cartVoucher',
    comment:
      "// TODO:Spartacus - PropertySignature 'cartVoucher' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'consignmentTracking',
    comment:
      "// TODO:Spartacus - PropertySignature 'consignmentTracking' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'createCart',
    comment:
      "// TODO:Spartacus - PropertySignature 'createCart' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'deleteCart',
    comment:
      "// TODO:Spartacus - PropertySignature 'deleteCart' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'orderDetail',
    comment:
      "// TODO:Spartacus - PropertySignature 'orderDetail' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'orderHistory',
    comment:
      "// TODO:Spartacus - PropertySignature 'orderHistory' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'orderReturnDetail',
    comment:
      "// TODO:Spartacus - PropertySignature 'orderReturnDetail' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'orderReturns',
    comment:
      "// TODO:Spartacus - PropertySignature 'orderReturns' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'removeEntries',
    comment:
      "// TODO:Spartacus - PropertySignature 'removeEntries' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'replenishmentOrderDetails',
    comment:
      "// TODO:Spartacus - PropertySignature 'replenishmentOrderDetails' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'replenishmentOrderDetailsHistory',
    comment:
      "// TODO:Spartacus - PropertySignature 'replenishmentOrderDetailsHistory' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'replenishmentOrderHistory',
    comment:
      "// TODO:Spartacus - PropertySignature 'replenishmentOrderHistory' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'returnOrder',
    comment:
      "// TODO:Spartacus - PropertySignature 'returnOrder' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'saveCart',
    comment:
      "// TODO:Spartacus - PropertySignature 'saveCart' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'scheduleReplenishmentOrder',
    comment:
      "// TODO:Spartacus - PropertySignature 'scheduleReplenishmentOrder' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'updateEntries',
    comment:
      "// TODO:Spartacus - PropertySignature 'updateEntries' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'OccEndpoints',
    importPath: '@spartacus/core',
    deprecatedNode: 'validate',
    comment:
      "// TODO:Spartacus - PropertySignature 'validate' was removed from Interface 'OccEndpoints'. ",
  },
  {
    class: 'SelectiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'cartConfigService',
    comment:
      "// TODO:Spartacus - Property 'cartConfigService' was removed from Class 'SelectiveCartService'. ",
  },
  {
    class: 'SelectiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'cartId',
    comment:
      "// TODO:Spartacus - Property 'cartId' was removed from Class 'SelectiveCartService'. ",
  },
  {
    class: 'SelectiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'cartId$',
    comment:
      "// TODO:Spartacus - Property 'cartId$' was removed from Class 'SelectiveCartService'. ",
  },
  {
    class: 'SelectiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'cartSelector$',
    comment:
      "// TODO:Spartacus - Property 'cartSelector$' was removed from Class 'SelectiveCartService'. ",
  },
  {
    class: 'SelectiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'customerId',
    comment:
      "// TODO:Spartacus - Property 'customerId' was removed from Class 'SelectiveCartService'. ",
  },
  {
    class: 'SelectiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'isEmpty',
    comment:
      "// TODO:Spartacus - Method 'isEmpty' was removed from Class 'SelectiveCartService'. ",
  },
  {
    class: 'SelectiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'isEnabled',
    comment:
      "// TODO:Spartacus - Method 'isEnabled' was removed from Class 'SelectiveCartService'. ",
  },
  {
    class: 'SelectiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'isJustLoggedIn',
    comment:
      "// TODO:Spartacus - Method 'isJustLoggedIn' was removed from Class 'SelectiveCartService'. ",
  },
  {
    class: 'SelectiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'isLoggedIn',
    comment:
      "// TODO:Spartacus - Method 'isLoggedIn' was removed from Class 'SelectiveCartService'. ",
  },
  {
    class: 'SelectiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'load',
    comment:
      "// TODO:Spartacus - Method 'load' was removed from Class 'SelectiveCartService'. ",
  },
  {
    class: 'SelectiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'multiCartService',
    comment:
      "// TODO:Spartacus - Property 'multiCartService' was removed from Class 'SelectiveCartService'. ",
  },
  {
    class: 'SelectiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'PREVIOUS_USER_ID_INITIAL_VALUE',
    comment:
      "// TODO:Spartacus - Property 'PREVIOUS_USER_ID_INITIAL_VALUE' was removed from Class 'SelectiveCartService'. ",
  },
  {
    class: 'SelectiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'previousUserId',
    comment:
      "// TODO:Spartacus - Property 'previousUserId' was removed from Class 'SelectiveCartService'. ",
  },
  {
    class: 'SelectiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'store',
    comment:
      "// TODO:Spartacus - Property 'store' was removed from Class 'SelectiveCartService'. ",
  },
  {
    class: 'SelectiveCartService',
    importPath: '@spartacus/core',
    deprecatedNode: 'userId',
    comment:
      "// TODO:Spartacus - Property 'userId' was removed from Class 'SelectiveCartService'. ",
  },
  {
    class: 'UpdateUserAddressEvent',
    importPath: '@spartacus/core',
    deprecatedNode: 'userId',
    comment:
      "// TODO:Spartacus - Property 'userId' was removed from Class 'UpdateUserAddressEvent'. ",
  },
  {
    class: 'UserState',
    importPath: '@spartacus/core',
    deprecatedNode: 'consignmentTracking',
    comment:
      "// TODO:Spartacus - PropertySignature 'consignmentTracking' was removed from Interface 'UserState'. ",
  },
  {
    class: 'UserState',
    importPath: '@spartacus/core',
    deprecatedNode: 'order',
    comment:
      "// TODO:Spartacus - PropertySignature 'order' was removed from Interface 'UserState'. ",
  },
  {
    class: 'UserState',
    importPath: '@spartacus/core',
    deprecatedNode: 'orderReturn',
    comment:
      "// TODO:Spartacus - PropertySignature 'orderReturn' was removed from Interface 'UserState'. ",
  },
  {
    class: 'UserState',
    importPath: '@spartacus/core',
    deprecatedNode: 'orderReturnList',
    comment:
      "// TODO:Spartacus - PropertySignature 'orderReturnList' was removed from Interface 'UserState'. ",
  },
  {
    class: 'UserState',
    importPath: '@spartacus/core',
    deprecatedNode: 'orders',
    comment:
      "// TODO:Spartacus - PropertySignature 'orders' was removed from Interface 'UserState'. ",
  },
  {
    class: 'UserState',
    importPath: '@spartacus/core',
    deprecatedNode: 'replenishmentOrder',
    comment:
      "// TODO:Spartacus - PropertySignature 'replenishmentOrder' was removed from Interface 'UserState'. ",
  },
  {
    class: 'UserState',
    importPath: '@spartacus/core',
    deprecatedNode: 'replenishmentOrders',
    comment:
      "// TODO:Spartacus - PropertySignature 'replenishmentOrders' was removed from Interface 'UserState'. ",
  },
  {
    class: 'WishListService',
    importPath: '@spartacus/core',
    deprecatedNode: 'multiCartService',
    comment:
      "// TODO:Spartacus - Property 'multiCartService' was removed from Class 'WishListService'. ",
  },
  {
    class: 'OrderCancellationService',
    importPath: '@spartacus/order/components',
    deprecatedNode: 'userOrderService',
    comment:
      "// TODO:Spartacus - Property 'userOrderService' was removed from Class 'OrderCancellationService'. ",
  },
  {
    class: 'OrderHistoryComponent',
    importPath: '@spartacus/order/components',
    deprecatedNode: 'userOrderService',
    comment:
      "// TODO:Spartacus - Property 'userOrderService' was removed from Class 'OrderHistoryComponent'. ",
  },
  {
    class: 'OrderHistoryComponent',
    importPath: '@spartacus/order/components',
    deprecatedNode: 'userReplenishmentOrderService',
    comment:
      "// TODO:Spartacus - Property 'userReplenishmentOrderService' was removed from Class 'OrderHistoryComponent'. ",
  },
  {
    class: 'ReplenishmentOrderCancellationComponent',
    importPath: '@spartacus/order/components',
    deprecatedNode: 'userReplenishmentOrderService',
    comment:
      "// TODO:Spartacus - Property 'userReplenishmentOrderService' was removed from Class 'ReplenishmentOrderCancellationComponent'. ",
  },
  {
    class: 'ReplenishmentOrderCancellationDialogComponent',
    importPath: '@spartacus/order/components',
    deprecatedNode: 'userReplenishmentOrderService',
    comment:
      "// TODO:Spartacus - Property 'userReplenishmentOrderService' was removed from Class 'ReplenishmentOrderCancellationDialogComponent'. ",
  },
  {
    class: 'ReplenishmentOrderDetailsService',
    importPath: '@spartacus/order/components',
    deprecatedNode: 'userReplenishmentOrderService',
    comment:
      "// TODO:Spartacus - Property 'userReplenishmentOrderService' was removed from Class 'ReplenishmentOrderDetailsService'. ",
  },
  {
    class: 'ReplenishmentOrderHistoryComponent',
    importPath: '@spartacus/order/components',
    deprecatedNode: 'userReplenishmentOrderService',
    comment:
      "// TODO:Spartacus - Property 'userReplenishmentOrderService' was removed from Class 'ReplenishmentOrderHistoryComponent'. ",
  },
  {
    class: 'OrderAdapter',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'cancel',
    comment:
      "// TODO:Spartacus - Method 'cancel' was removed from Class 'OrderAdapter'. ",
  },
  {
    class: 'OrderAdapter',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'cancelReturnRequest',
    comment:
      "// TODO:Spartacus - Method 'cancelReturnRequest' was removed from Class 'OrderAdapter'. ",
  },
  {
    class: 'OrderAdapter',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'createReturnRequest',
    comment:
      "// TODO:Spartacus - Method 'createReturnRequest' was removed from Class 'OrderAdapter'. ",
  },
  {
    class: 'OrderAdapter',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'getConsignmentTracking',
    comment:
      "// TODO:Spartacus - Method 'getConsignmentTracking' was removed from Class 'OrderAdapter'. ",
  },
  {
    class: 'OrderAdapter',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'load',
    comment:
      "// TODO:Spartacus - Method 'load' was removed from Class 'OrderAdapter'. ",
  },
  {
    class: 'OrderAdapter',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'loadHistory',
    comment:
      "// TODO:Spartacus - Method 'loadHistory' was removed from Class 'OrderAdapter'. ",
  },
  {
    class: 'OrderAdapter',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'loadReturnRequestDetail',
    comment:
      "// TODO:Spartacus - Method 'loadReturnRequestDetail' was removed from Class 'OrderAdapter'. ",
  },
  {
    class: 'OrderAdapter',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'loadReturnRequestList',
    comment:
      "// TODO:Spartacus - Method 'loadReturnRequestList' was removed from Class 'OrderAdapter'. ",
  },
  {
    class: 'OrderConnector',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'cancel',
    comment:
      "// TODO:Spartacus - Method 'cancel' was removed from Class 'OrderConnector'. ",
  },
  {
    class: 'OrderConnector',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'cancelReturnRequest',
    comment:
      "// TODO:Spartacus - Method 'cancelReturnRequest' was removed from Class 'OrderConnector'. ",
  },
  {
    class: 'OrderConnector',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'get',
    comment:
      "// TODO:Spartacus - Method 'get' was removed from Class 'OrderConnector'. ",
  },
  {
    class: 'OrderConnector',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'getConsignmentTracking',
    comment:
      "// TODO:Spartacus - Method 'getConsignmentTracking' was removed from Class 'OrderConnector'. ",
  },
  {
    class: 'OrderConnector',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'getHistory',
    comment:
      "// TODO:Spartacus - Method 'getHistory' was removed from Class 'OrderConnector'. ",
  },
  {
    class: 'OrderConnector',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'getReturnRequestDetail',
    comment:
      "// TODO:Spartacus - Method 'getReturnRequestDetail' was removed from Class 'OrderConnector'. ",
  },
  {
    class: 'OrderConnector',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'getReturnRequestList',
    comment:
      "// TODO:Spartacus - Method 'getReturnRequestList' was removed from Class 'OrderConnector'. ",
  },
  {
    class: 'OrderConnector',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'return',
    comment:
      "// TODO:Spartacus - Method 'return' was removed from Class 'OrderConnector'. ",
  },
  {
    class: 'OrderService',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'cancelOrder',
    comment:
      "// TODO:Spartacus - Method 'cancelOrder' was removed from Class 'OrderService'. ",
  },
  {
    class: 'OrderService',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'clearConsignmentTracking',
    comment:
      "// TODO:Spartacus - Method 'clearConsignmentTracking' was removed from Class 'OrderService'. ",
  },
  {
    class: 'OrderService',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'clearOrderDetails',
    comment:
      "// TODO:Spartacus - Method 'clearOrderDetails' was removed from Class 'OrderService'. ",
  },
  {
    class: 'OrderService',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'clearOrderList',
    comment:
      "// TODO:Spartacus - Method 'clearOrderList' was removed from Class 'OrderService'. ",
  },
  {
    class: 'OrderService',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'getCancelOrderLoading',
    comment:
      "// TODO:Spartacus - Method 'getCancelOrderLoading' was removed from Class 'OrderService'. ",
  },
  {
    class: 'OrderService',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'getCancelOrderSuccess',
    comment:
      "// TODO:Spartacus - Method 'getCancelOrderSuccess' was removed from Class 'OrderService'. ",
  },
  {
    class: 'OrderService',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'getConsignmentTracking',
    comment:
      "// TODO:Spartacus - Method 'getConsignmentTracking' was removed from Class 'OrderService'. ",
  },
  {
    class: 'OrderService',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'getOrderHistoryList',
    comment:
      "// TODO:Spartacus - Method 'getOrderHistoryList' was removed from Class 'OrderService'. ",
  },
  {
    class: 'OrderService',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'getOrderHistoryListLoaded',
    comment:
      "// TODO:Spartacus - Method 'getOrderHistoryListLoaded' was removed from Class 'OrderService'. ",
  },
  {
    class: 'OrderService',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'loadConsignmentTracking',
    comment:
      "// TODO:Spartacus - Method 'loadConsignmentTracking' was removed from Class 'OrderService'. ",
  },
  {
    class: 'OrderService',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'loadOrderDetails',
    comment:
      "// TODO:Spartacus - Method 'loadOrderDetails' was removed from Class 'OrderService'. ",
  },
  {
    class: 'OrderService',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'loadOrderList',
    comment:
      "// TODO:Spartacus - Method 'loadOrderList' was removed from Class 'OrderService'. ",
  },
  {
    class: 'OrderService',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'processStateStore',
    comment:
      "// TODO:Spartacus - Property 'processStateStore' was removed from Class 'OrderService'. ",
  },
  {
    class: 'OrderService',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'resetCancelOrderProcessState',
    comment:
      "// TODO:Spartacus - Method 'resetCancelOrderProcessState' was removed from Class 'OrderService'. ",
  },
  {
    class: 'OrderService',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'routingService',
    comment:
      "// TODO:Spartacus - Property 'routingService' was removed from Class 'OrderService'. ",
  },
  {
    class: 'OrderService',
    importPath: '@spartacus/order/core',
    deprecatedNode: 'store',
    comment:
      "// TODO:Spartacus - Property 'store' was removed from Class 'OrderService'. ",
  },
  {
    class: 'OccOrderAdapter',
    importPath: '@spartacus/order/occ',
    deprecatedNode: 'cancel',
    comment:
      "// TODO:Spartacus - Method 'cancel' was removed from Class 'OccOrderAdapter'. ",
  },
  {
    class: 'OccOrderAdapter',
    importPath: '@spartacus/order/occ',
    deprecatedNode: 'cancelReturnRequest',
    comment:
      "// TODO:Spartacus - Method 'cancelReturnRequest' was removed from Class 'OccOrderAdapter'. ",
  },
  {
    class: 'OccOrderAdapter',
    importPath: '@spartacus/order/occ',
    deprecatedNode: 'createReturnRequest',
    comment:
      "// TODO:Spartacus - Method 'createReturnRequest' was removed from Class 'OccOrderAdapter'. ",
  },
  {
    class: 'OccOrderAdapter',
    importPath: '@spartacus/order/occ',
    deprecatedNode: 'getConsignmentTracking',
    comment:
      "// TODO:Spartacus - Method 'getConsignmentTracking' was removed from Class 'OccOrderAdapter'. ",
  },
  {
    class: 'OccOrderAdapter',
    importPath: '@spartacus/order/occ',
    deprecatedNode: 'load',
    comment:
      "// TODO:Spartacus - Method 'load' was removed from Class 'OccOrderAdapter'. ",
  },
  {
    class: 'OccOrderAdapter',
    importPath: '@spartacus/order/occ',
    deprecatedNode: 'loadHistory',
    comment:
      "// TODO:Spartacus - Method 'loadHistory' was removed from Class 'OccOrderAdapter'. ",
  },
  {
    class: 'OccOrderAdapter',
    importPath: '@spartacus/order/occ',
    deprecatedNode: 'loadReturnRequestDetail',
    comment:
      "// TODO:Spartacus - Method 'loadReturnRequestDetail' was removed from Class 'OccOrderAdapter'. ",
  },
  {
    class: 'OccOrderAdapter',
    importPath: '@spartacus/order/occ',
    deprecatedNode: 'loadReturnRequestList',
    comment:
      "// TODO:Spartacus - Method 'loadReturnRequestList' was removed from Class 'OccOrderAdapter'. ",
  },
  {
    class: 'OrderDetailsOrderEntriesContext',
    importPath: '@spartacus/order/root',
    deprecatedNode: 'userOrderService',
    comment:
      "// TODO:Spartacus - Property 'userOrderService' was removed from Class 'OrderDetailsOrderEntriesContext'. ",
  },
  {
    class: 'OrderFacade',
    importPath: '@spartacus/order/root',
    deprecatedNode: 'cancelOrder',
    comment:
      "// TODO:Spartacus - Method 'cancelOrder' was removed from Class 'OrderFacade'. ",
  },
  {
    class: 'OrderFacade',
    importPath: '@spartacus/order/root',
    deprecatedNode: 'clearConsignmentTracking',
    comment:
      "// TODO:Spartacus - Method 'clearConsignmentTracking' was removed from Class 'OrderFacade'. ",
  },
  {
    class: 'OrderFacade',
    importPath: '@spartacus/order/root',
    deprecatedNode: 'clearOrderDetails',
    comment:
      "// TODO:Spartacus - Method 'clearOrderDetails' was removed from Class 'OrderFacade'. ",
  },
  {
    class: 'OrderFacade',
    importPath: '@spartacus/order/root',
    deprecatedNode: 'clearOrderList',
    comment:
      "// TODO:Spartacus - Method 'clearOrderList' was removed from Class 'OrderFacade'. ",
  },
  {
    class: 'OrderFacade',
    importPath: '@spartacus/order/root',
    deprecatedNode: 'getCancelOrderLoading',
    comment:
      "// TODO:Spartacus - Method 'getCancelOrderLoading' was removed from Class 'OrderFacade'. ",
  },
  {
    class: 'OrderFacade',
    importPath: '@spartacus/order/root',
    deprecatedNode: 'getCancelOrderSuccess',
    comment:
      "// TODO:Spartacus - Method 'getCancelOrderSuccess' was removed from Class 'OrderFacade'. ",
  },
  {
    class: 'OrderFacade',
    importPath: '@spartacus/order/root',
    deprecatedNode: 'getConsignmentTracking',
    comment:
      "// TODO:Spartacus - Method 'getConsignmentTracking' was removed from Class 'OrderFacade'. ",
  },
  {
    class: 'OrderFacade',
    importPath: '@spartacus/order/root',
    deprecatedNode: 'getOrderHistoryList',
    comment:
      "// TODO:Spartacus - Method 'getOrderHistoryList' was removed from Class 'OrderFacade'. ",
  },
  {
    class: 'OrderFacade',
    importPath: '@spartacus/order/root',
    deprecatedNode: 'getOrderHistoryListLoaded',
    comment:
      "// TODO:Spartacus - Method 'getOrderHistoryListLoaded' was removed from Class 'OrderFacade'. ",
  },
  {
    class: 'OrderFacade',
    importPath: '@spartacus/order/root',
    deprecatedNode: 'loadConsignmentTracking',
    comment:
      "// TODO:Spartacus - Method 'loadConsignmentTracking' was removed from Class 'OrderFacade'. ",
  },
  {
    class: 'OrderFacade',
    importPath: '@spartacus/order/root',
    deprecatedNode: 'loadOrderDetails',
    comment:
      "// TODO:Spartacus - Method 'loadOrderDetails' was removed from Class 'OrderFacade'. ",
  },
  {
    class: 'OrderFacade',
    importPath: '@spartacus/order/root',
    deprecatedNode: 'loadOrderList',
    comment:
      "// TODO:Spartacus - Method 'loadOrderList' was removed from Class 'OrderFacade'. ",
  },
  {
    class: 'OrderFacade',
    importPath: '@spartacus/order/root',
    deprecatedNode: 'resetCancelOrderProcessState',
    comment:
      "// TODO:Spartacus - Method 'resetCancelOrderProcessState' was removed from Class 'OrderFacade'. ",
  },
  {
    class: 'ConfiguratorCartService',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedNode: 'checkoutFacade',
    comment:
      "// TODO:Spartacus - Property 'checkoutFacade' was removed from Class 'ConfiguratorCartService'. ",
  },
  {
    class: 'ConfiguratorCommonsService',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedNode: 'removeObsoleteProductBoundConfiguration',
    comment:
      "// TODO:Spartacus - Method 'removeObsoleteProductBoundConfiguration' was removed from Class 'ConfiguratorCommonsService'. Consult the migration documentation on how to deal with that.",
  },
  {
    class: 'ConfiguratorExitButtonComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedNode: 'product$',
    comment:
      "// TODO:Spartacus - Property 'product$' was removed from Class 'ConfiguratorExitButtonComponent'. ",
  },
  {
    class: 'ConfiguratorGroupTitleComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedNode: 'configuration$',
    comment:
      "// TODO:Spartacus - Property 'configuration$' was removed from Class 'ConfiguratorGroupTitleComponent'. ",
  },
  {
    class: 'ConfiguratorOverviewNotificationBannerComponent',
    importPath: '@spartacus/product-configurator/rulebased',
    deprecatedNode: 'countIssuesInGroup',
    comment:
      "// TODO:Spartacus - Method 'countIssuesInGroup' was removed from Class 'ConfiguratorOverviewNotificationBannerComponent'. ",
  },
  {
    class: 'ActiveCartOrderEntriesContext',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'actionsSubject',
    comment:
      "// TODO:Spartacus - Property 'actionsSubject' was removed from Class 'ActiveCartOrderEntriesContext'. ",
  },
  {
    class: 'ActiveCartOrderEntriesContext',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'activeCartService',
    comment:
      "// TODO:Spartacus - Property 'activeCartService' was removed from Class 'ActiveCartOrderEntriesContext'. ",
  },
  {
    class: 'AddedToCartDialogComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'cartService',
    comment:
      "// TODO:Spartacus - Property 'cartService' was removed from Class 'AddedToCartDialogComponent'. ",
  },
  {
    class: 'AddedToCartDialogComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'ngOnInit',
    comment:
      "// TODO:Spartacus - Method 'ngOnInit' was removed from Class 'AddedToCartDialogComponent'. ",
  },
  {
    class: 'AddedToCartDialogComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'numberOfEntriesBeforeAdd',
    comment:
      "// TODO:Spartacus - Property 'numberOfEntriesBeforeAdd' was removed from Class 'AddedToCartDialogComponent'. ",
  },
  {
    class: 'AddToCartComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'modalRef',
    comment:
      "// TODO:Spartacus - Property 'modalRef' was removed from Class 'AddToCartComponent'. ",
  },
  {
    class: 'AddToCartComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'modalService',
    comment:
      "// TODO:Spartacus - Property 'modalService' was removed from Class 'AddToCartComponent'. ",
  },
  {
    class: 'AddToCartComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'numberOfEntriesBeforeAdd',
    comment:
      "// TODO:Spartacus - Property 'numberOfEntriesBeforeAdd' was removed from Class 'AddToCartComponent'. ",
  },
  {
    class: 'AddToCartComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'openModal',
    comment:
      "// TODO:Spartacus - Method 'openModal' was removed from Class 'AddToCartComponent'. ",
  },
  {
    class: 'AddToWishListComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'wishListService',
    comment:
      "// TODO:Spartacus - Property 'wishListService' was removed from Class 'AddToWishListComponent'. ",
  },
  {
    class: 'CartTotalsComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'cartValidationInProgress',
    comment:
      "// TODO:Spartacus - Property 'cartValidationInProgress' was removed from Class 'CartTotalsComponent'. ",
  },
  {
    class: 'CartTotalsComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'disableButtonWhileNavigation',
    comment:
      "// TODO:Spartacus - Method 'disableButtonWhileNavigation' was removed from Class 'CartTotalsComponent'. ",
  },
  {
    class: 'CartTotalsComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'entries$',
    comment:
      "// TODO:Spartacus - Property 'entries$' was removed from Class 'CartTotalsComponent'. ",
  },
  {
    class: 'CartTotalsComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'ngOnDestroy',
    comment:
      "// TODO:Spartacus - Method 'ngOnDestroy' was removed from Class 'CartTotalsComponent'. ",
  },
  {
    class: 'CartTotalsComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'router',
    comment:
      "// TODO:Spartacus - Property 'router' was removed from Class 'CartTotalsComponent'. ",
  },
  {
    class: 'CartTotalsComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'subscription',
    comment:
      "// TODO:Spartacus - Property 'subscription' was removed from Class 'CartTotalsComponent'. ",
  },
  {
    class: 'CartValidationWarningsComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'cartValidationStateService',
    comment:
      "// TODO:Spartacus - Property 'cartValidationStateService' was removed from Class 'CartValidationWarningsComponent'. ",
  },
  {
    class: 'CmsGuardsService',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'injector',
    comment:
      "// TODO:Spartacus - Property 'injector' was removed from Class 'CmsGuardsService'. ",
  },
  {
    class: 'MiniCartComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'activeCartService',
    comment:
      "// TODO:Spartacus - Property 'activeCartService' was removed from Class 'MiniCartComponent'. ",
  },
  {
    class: 'NavigationUIComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'reinitalizeMenu',
    comment:
      "// TODO:Spartacus - Method 'reinitalizeMenu' was removed from Class 'NavigationUIComponent'. ",
  },
  {
    class: 'OrderCancellationService',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'userOrderService',
    comment:
      "// TODO:Spartacus - Property 'userOrderService' was removed from Class 'OrderCancellationService'. ",
  },
  {
    class: 'OrderHistoryComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'userOrderService',
    comment:
      "// TODO:Spartacus - Property 'userOrderService' was removed from Class 'OrderHistoryComponent'. ",
  },
  {
    class: 'OrderHistoryComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'userReplenishmentOrderService',
    comment:
      "// TODO:Spartacus - Property 'userReplenishmentOrderService' was removed from Class 'OrderHistoryComponent'. ",
  },
  {
    class: 'ProgressButtonComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'clikEvent',
    comment:
      "// TODO:Spartacus - Property 'clikEvent' was removed from Class 'ProgressButtonComponent'. It is renamed to 'clickEvent' to fix a typo.",
  },
  {
    class: 'ReplenishmentOrderCancellationComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'userReplenishmentOrderService',
    comment:
      "// TODO:Spartacus - Property 'userReplenishmentOrderService' was removed from Class 'ReplenishmentOrderCancellationComponent'. ",
  },
  {
    class: 'ReplenishmentOrderCancellationDialogComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'userReplenishmentOrderService',
    comment:
      "// TODO:Spartacus - Property 'userReplenishmentOrderService' was removed from Class 'ReplenishmentOrderCancellationDialogComponent'. ",
  },
  {
    class: 'ReplenishmentOrderDetailsService',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'userReplenishmentOrderService',
    comment:
      "// TODO:Spartacus - Property 'userReplenishmentOrderService' was removed from Class 'ReplenishmentOrderDetailsService'. ",
  },
  {
    class: 'ReplenishmentOrderHistoryComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'userReplenishmentOrderService',
    comment:
      "// TODO:Spartacus - Property 'userReplenishmentOrderService' was removed from Class 'ReplenishmentOrderHistoryComponent'. ",
  },
  {
    class: 'TabParagraphContainerComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'ngOnDestroy',
    comment:
      "// TODO:Spartacus - Method 'ngOnDestroy' was removed from Class 'TabParagraphContainerComponent'. ",
  },
  {
    class: 'TabParagraphContainerComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'subscription',
    comment:
      "// TODO:Spartacus - Property 'subscription' was removed from Class 'TabParagraphContainerComponent'. ",
  },
  {
    class: 'WishListComponent',
    importPath: '@spartacus/storefront',
    deprecatedNode: 'wishListService',
    comment:
      "// TODO:Spartacus - Property 'wishListService' was removed from Class 'WishListComponent'. ",
  },
];
