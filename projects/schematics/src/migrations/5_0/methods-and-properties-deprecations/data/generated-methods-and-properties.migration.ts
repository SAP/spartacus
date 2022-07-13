import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

export const GENERATED_METHODS_AND_PROPERTIES_MIGRATION: MethodPropertyDeprecation[] =
  //
  // Generated array, don't update manually.
  //
  [
    {
      class: 'AsmMainUiComponent',
      importPath: '@spartacus/asm/components',
      deprecatedNode: 'userService',
      comment:
        "// TODO:Spartacus - Property 'userService' was removed from Class 'AsmMainUiComponent'. ",
    },
    {
      class: 'CustomerEmulationComponent',
      importPath: '@spartacus/asm/components',
      deprecatedNode: 'userService',
      comment:
        "// TODO:Spartacus - Property 'userService' was removed from Class 'CustomerEmulationComponent'. ",
    },
    {
      class: 'CsAgentAuthService',
      importPath: '@spartacus/asm/root',
      deprecatedNode: 'userService',
      comment:
        "// TODO:Spartacus - Property 'userService' was removed from Class 'CsAgentAuthService'. ",
    },
    {
      class: 'CartQuickOrderFormComponent',
      importPath: '@spartacus/cart/quick-order/components',
      deprecatedNode: 'activeCartService',
      comment:
        "The type of property 'activeCartService: ActiveCartService' changed to: 'activeCartService: ActiveCartFacade' ",
    },
    {
      class: 'QuickOrderComponent',
      importPath: '@spartacus/cart/quick-order/components',
      deprecatedNode: 'activeCartService',
      comment:
        "The type of property 'activeCartService: ActiveCartService' changed to: 'activeCartService: ActiveCartFacade' ",
    },
    {
      class: 'QuickOrderFormComponent',
      importPath: '@spartacus/cart/quick-order/components',
      deprecatedNode: 'cd',
      comment:
        "The type of property 'cd: ChangeDetectorRef | undefined' changed to: 'cd: ChangeDetectorRef' ",
    },
    {
      class: 'QuickOrderFormComponent',
      importPath: '@spartacus/cart/quick-order/components',
      deprecatedNode: 'config',
      comment:
        "The type of property 'config: Config | undefined' changed to: 'config: Config' ",
    },
    {
      class: 'QuickOrderFormComponent',
      importPath: '@spartacus/cart/quick-order/components',
      deprecatedNode: 'globalMessageService',
      comment:
        "// TODO:Spartacus - Property 'globalMessageService' was removed from Class 'QuickOrderFormComponent'. ",
    },
    {
      class: 'QuickOrderFormComponent',
      importPath: '@spartacus/cart/quick-order/components',
      deprecatedNode: 'winRef',
      comment:
        "The type of property 'winRef: WindowRef | undefined' changed to: 'winRef: WindowRef' ",
    },
    {
      class: 'QuickOrderService',
      importPath: '@spartacus/cart/quick-order/core',
      deprecatedNode: 'activeCartService',
      comment:
        "The type of property 'activeCartService: ActiveCartService' changed to: 'activeCartService: ActiveCartFacade' ",
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
      deprecatedNode: 'productSearchConnector',
      comment:
        "The type of property 'productSearchConnector: ProductSearchConnector | undefined' changed to: 'productSearchConnector: ProductSearchConnector' ",
    },
    {
      class: 'QuickOrderService',
      importPath: '@spartacus/cart/quick-order/core',
      deprecatedNode: 'removeEntry',
      comment:
        "// TODO:Spartacus - Method 'removeEntry' was removed from Class 'QuickOrderService'. Use `softDeleteEntry` instead.",
    },
    {
      class: 'QuickOrderService',
      importPath: '@spartacus/cart/quick-order/core',
      deprecatedNode: 'search',
      comment:
        "// TODO:Spartacus - Method 'search' was removed from Class 'QuickOrderService'. Use `searchProducts` instead.",
    },
    {
      class: 'QuickOrderConfig',
      importPath: '@spartacus/cart/quick-order/root',
      deprecatedNode: 'quickOrder',
      comment:
        "The type of property 'quickOrder: { searchForm?: { displayProductImages: boolean; maxProducts: number; minCharactersBeforeRequest: number; }; }' changed to: 'quickOrder: { searchForm?: { displayProductImages: boolean; maxProducts: number; minCharactersBeforeRequest: number; }; list?: { hardDeleteTimeout: number; }; }' ",
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
      class: 'QuickOrderOrderEntriesContext',
      importPath: '@spartacus/cart/quick-order/root',
      deprecatedNode: 'handleErrors',
      comment:
        "The 'handleErrors' method's signature changed to: 'handleErrors(  response: HttpErrorResponse,  productCode: string): ProductImportInfo'",
    },
    {
      class: 'QuickOrderOrderEntriesContext',
      importPath: '@spartacus/cart/quick-order/root',
      deprecatedNode: 'handleResults',
      comment:
        "The 'handleResults' method's signature changed to: 'handleResults(  product: Product,  productData: ProductData): ProductImportInfo'",
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
      deprecatedNode: 'multiCartService',
      comment:
        "The type of property 'multiCartService: MultiCartService' changed to: 'multiCartService: MultiCartFacade' ",
    },
    {
      class: 'SavedCartEventBuilder',
      importPath: '@spartacus/cart/saved-cart/core',
      deprecatedNode: 'registerDeleteSavedCartEvents',
      comment:
        "// TODO:Spartacus - Method 'registerDeleteSavedCartEvents' was removed from Class 'SavedCartEventBuilder'. Use 'registerDeleteCart' Method from Class 'CartEventBuilder' instead.",
    },
    {
      class: 'SavedCartService',
      importPath: '@spartacus/cart/saved-cart/core',
      deprecatedNode: 'getSavedCart',
      comment:
        "The 'getSavedCart' method's signature changed to: 'getSavedCart(  cartId: string): Observable<StateUtils.ProcessesLoaderState<Cart | undefined>>'",
    },
    {
      class: 'SavedCartService',
      importPath: '@spartacus/cart/saved-cart/core',
      deprecatedNode: 'multiCartService',
      comment:
        "The type of property 'multiCartService: MultiCartService' changed to: 'multiCartService: MultiCartFacade' ",
    },
    {
      class: 'SavedCartService',
      importPath: '@spartacus/cart/saved-cart/core',
      deprecatedNode: 'userService',
      comment:
        "// TODO:Spartacus - Property 'userService' was removed from Class 'SavedCartService'. ",
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
      class: 'NewSavedCartOrderEntriesContext',
      importPath: '@spartacus/cart/saved-cart/root',
      deprecatedNode: 'multiCartService',
      comment:
        "The type of property 'multiCartService: MultiCartService' changed to: 'multiCartService: MultiCartFacade' ",
    },
    {
      class: 'SavedCartFacade',
      importPath: '@spartacus/cart/saved-cart/root',
      deprecatedNode: 'getSavedCart',
      comment:
        "The 'getSavedCart' method's signature changed to: 'getSavedCart(  cartId: string): Observable<StateUtils.ProcessesLoaderState<Cart | undefined>>'",
    },
    {
      class: 'SavedCartOrderEntriesContext',
      importPath: '@spartacus/cart/saved-cart/root',
      deprecatedNode: 'actionsSubject',
      comment:
        "// TODO:Spartacus - Property 'actionsSubject' was removed from Class 'SavedCartOrderEntriesContext'. ",
    },
    {
      class: 'SavedCartOrderEntriesContext',
      importPath: '@spartacus/cart/saved-cart/root',
      deprecatedNode: 'multiCartService',
      comment:
        "The type of property 'multiCartService: MultiCartService' changed to: 'multiCartService: MultiCartFacade' ",
    },
    {
      class: 'CdcLogoutGuard',
      importPath: '@spartacus/cdc/root',
      deprecatedNode: 'authRedirectService',
      comment:
        "// TODO:Spartacus - Property 'authRedirectService' was removed from Class 'CdcLogoutGuard'. ",
    },
    {
      class: 'ProfileTagPushEventsService',
      importPath: '@spartacus/cds',
      deprecatedNode: 'activeCartService',
      comment:
        "// TODO:Spartacus - Property 'activeCartService' was removed from Class 'ProfileTagPushEventsService'. ",
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
      deprecatedNode: 'handleAnonymousUser',
      comment:
        "The 'handleAnonymousUser' method's signature changed to: 'handleAnonymousUser(): boolean | UrlTree'",
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
      class: 'CheckoutStepService',
      importPath: '@spartacus/checkout/components',
      deprecatedNode: 'disableEnableStep',
      comment:
        "The 'disableEnableStep' method's signature changed to: 'disableEnableStep(  currentStepType: CheckoutStepType | string,  disabled: boolean): void'",
    },
    {
      class: 'CheckoutStepsSetGuard',
      importPath: '@spartacus/checkout/components',
      deprecatedNode: 'canActivate',
      comment:
        "The 'canActivate' method's signature changed to: 'canActivate(  route: ActivatedRouteSnapshot): Observable<boolean | UrlTree>'",
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
      deprecatedNode: 'isStepSet',
      comment:
        "The 'isStepSet' method's signature changed to: 'isStepSet(  step: CheckoutStep): Observable<boolean | UrlTree>'",
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
      class: 'CheckoutCostCenterService',
      importPath: '@spartacus/checkout/core',
      deprecatedNode: 'setCostCenter',
      comment:
        "The 'setCostCenter' method's signature changed to: 'setCostCenter(  costCenterId: string): Observable<Cart>'",
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
      deprecatedNode: 'resolveTitle',
      comment:
        "The 'resolveTitle' method's signature changed to: 'resolveTitle(): Observable<string | undefined>'",
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
      deprecatedNode: 'getCardTypes',
      comment:
        "// TODO:Spartacus - Method 'getCardTypes' was removed from Class 'CheckoutPaymentConnector'. ",
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
      deprecatedNode: 'createPaymentDetails',
      comment:
        "The 'createPaymentDetails' method's signature changed to: 'createPaymentDetails(  paymentDetails: PaymentDetails): Observable<unknown>'",
    },
    {
      class: 'CheckoutPaymentService',
      importPath: '@spartacus/checkout/core',
      deprecatedNode: 'getCardTypes',
      comment:
        "// TODO:Spartacus - Method 'getCardTypes' was removed from Class 'CheckoutPaymentService'. ",
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
      class: 'CheckoutPaymentService',
      importPath: '@spartacus/checkout/core',
      deprecatedNode: 'setPaymentDetails',
      comment:
        "The 'setPaymentDetails' method's signature changed to: 'setPaymentDetails(  paymentDetails: PaymentDetails): Observable<unknown>'",
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
      deprecatedNode: 'getCardTypesEndpoint',
      comment:
        "// TODO:Spartacus - Method 'getCardTypesEndpoint' was removed from Class 'OccCheckoutPaymentAdapter'. ",
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
      class: 'CheckoutCostCenterFacade',
      importPath: '@spartacus/checkout/root',
      deprecatedNode: 'setCostCenter',
      comment:
        "The 'setCostCenter' method's signature changed to: 'setCostCenter(  costCenterId: string): Observable<Cart>'",
    },
    {
      class: 'CheckoutPaymentFacade',
      importPath: '@spartacus/checkout/root',
      deprecatedNode: 'createPaymentDetails',
      comment:
        "The 'createPaymentDetails' method's signature changed to: 'createPaymentDetails(  paymentDetails: PaymentDetails): Observable<unknown>'",
    },
    {
      class: 'CheckoutPaymentFacade',
      importPath: '@spartacus/checkout/root',
      deprecatedNode: 'getCardTypes',
      comment:
        "// TODO:Spartacus - Method 'getCardTypes' was removed from Class 'CheckoutPaymentFacade'. ",
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
      class: 'CheckoutPaymentFacade',
      importPath: '@spartacus/checkout/root',
      deprecatedNode: 'setPaymentDetails',
      comment:
        "The 'setPaymentDetails' method's signature changed to: 'setPaymentDetails(  paymentDetails: PaymentDetails): Observable<unknown>'",
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
      deprecatedNode: 'getEntry',
      comment:
        "The 'getEntry' method's signature changed to: 'getEntry(  productCode: string): Observable<OrderEntry | undefined>'",
    },
    {
      class: 'ActiveCartService',
      importPath: '@spartacus/core',
      deprecatedNode: 'getLastEntry',
      comment:
        "The 'getLastEntry' method's signature changed to: 'getLastEntry(  productCode: string): Observable<OrderEntry | undefined>'",
    },
    {
      class: 'ActiveCartService',
      importPath: '@spartacus/core',
      deprecatedNode: 'isCartCreating',
      comment:
        "The 'isCartCreating' method's signature changed to: 'isCartCreating(  cartState: StateUtils.ProcessesLoaderState<Cart | undefined>,  cartId: string): boolean | undefined'",
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
      deprecatedNode: 'isGuestCart',
      comment:
        "The 'isGuestCart' method's signature changed to: 'isGuestCart(  cart: Cart): Observable<boolean>'",
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
      deprecatedNode: 'requireLoadedCart',
      comment:
        "The 'requireLoadedCart' method's signature changed to: 'requireLoadedCart(  forGuestMerge: boolean): Observable<Cart>'",
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
      class: 'AnonymousConsentsService',
      importPath: '@spartacus/core',
      deprecatedNode: 'getConsent',
      comment:
        "The 'getConsent' method's signature changed to: 'getConsent(  templateId: string): Observable<AnonymousConsent | undefined>'",
    },
    {
      class: 'AnonymousConsentsService',
      importPath: '@spartacus/core',
      deprecatedNode: 'getTemplate',
      comment:
        "The 'getTemplate' method's signature changed to: 'getTemplate(  templateCode: string): Observable<ConsentTemplate | undefined>'",
    },
    {
      class: 'AnonymousConsentsService',
      importPath: '@spartacus/core',
      deprecatedNode: 'isConsentGiven',
      comment:
        "The 'isConsentGiven' method's signature changed to: 'isConsentGiven(  consent: AnonymousConsent | undefined): boolean'",
    },
    {
      class: 'AuthHttpHeaderService',
      importPath: '@spartacus/core',
      deprecatedNode: 'getValidToken',
      comment:
        "The 'getValidToken' method's signature changed to: 'getValidToken(  requestToken: AuthToken | undefined): Observable<AuthToken | undefined>'",
    },
    {
      class: 'AuthHttpHeaderService',
      importPath: '@spartacus/core',
      deprecatedNode: 'handleExpiredAccessToken',
      comment:
        "The 'handleExpiredAccessToken' method's signature changed to: 'handleExpiredAccessToken(  request: HttpRequest<any>,  next: HttpHandler,  initialToken: AuthToken | undefined): Observable<HttpEvent<AuthToken>>'",
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
        "// TODO:Spartacus - Property 'refreshInProgress' was removed from Class 'AuthHttpHeaderService'. Use 'refreshInProgress$' Observable instead from 'AuthService'.",
    },
    {
      class: 'AuthHttpHeaderService',
      importPath: '@spartacus/core',
      deprecatedNode: 'stopProgress$',
      comment:
        "The type of property 'stopProgress$: Observable<[AuthToken, AuthToken]>' changed to: 'stopProgress$: Observable<[AuthToken | undefined, AuthToken | undefined]>' ",
    },
    {
      class: 'AuthHttpHeaderService',
      importPath: '@spartacus/core',
      deprecatedNode: 'tokenToRetryRequest$',
      comment:
        "The type of property 'tokenToRetryRequest$: Observable<AuthToken>' changed to: 'tokenToRetryRequest$: Observable<AuthToken | undefined>' ",
    },
    {
      class: 'AuthRedirectService',
      importPath: '@spartacus/core',
      deprecatedNode: 'reportAuthGuard',
      comment:
        "// TODO:Spartacus - Method 'reportAuthGuard' was removed from Class 'AuthRedirectService'. Use 'saveCurrentNavigationUrl' method instead.",
    },
    {
      class: 'AuthRedirectService',
      importPath: '@spartacus/core',
      deprecatedNode: 'reportNotAuthGuard',
      comment:
        "// TODO:Spartacus - Method 'reportNotAuthGuard' was removed from Class 'AuthRedirectService'. No replacement needed. Every visited URL is now remembered automatically as redirect URL on 'NavigationEnd' event.",
    },
    {
      class: 'AuthStatePersistenceService',
      importPath: '@spartacus/core',
      deprecatedNode: 'readStateFromStorage',
      comment:
        "The 'readStateFromStorage' method's signature changed to: 'readStateFromStorage(): SyncedAuthState | undefined'",
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
        "// TODO:Spartacus - Method 'handleVoucherOperationError' was removed from Class 'BadRequestHandler'. It is now being handled in 'BadVoucherRequestHandler' from @spartacus/cart/base/core",
    },
    {
      class: 'CreateWishList',
      importPath: '@spartacus/core',
      deprecatedNode: 'payload',
      comment:
        "The type of property 'payload: { userId: string; name: string; description?: string; }' changed to: 'payload: { userId: string; name?: string; description?: string; }' ",
    },
    {
      class: 'CreateWishListSuccess',
      importPath: '@spartacus/core',
      deprecatedNode: 'payload',
      comment:
        "The type of property 'payload: { cart: Cart; userId: string; }' changed to: 'payload: { cart: Cart; cartId: string; }' ",
    },
    {
      class: 'LoadWishListSuccess',
      importPath: '@spartacus/core',
      deprecatedNode: 'payload',
      comment:
        "The type of property 'payload: LoadWishListSuccessPayload' changed to: 'payload: { cart: Cart; cartId: string; }' ",
    },
    {
      class: 'CartAdapter',
      importPath: '@spartacus/core',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  userId: string,  cartId: string): Observable<Cart | undefined>'",
    },
    {
      class: 'CartConnector',
      importPath: '@spartacus/core',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  userId: string,  cartId: string): Observable<Cart | undefined>'",
    },
    {
      class: 'CartEventBuilder',
      importPath: '@spartacus/core',
      deprecatedNode: 'activeCartService',
      comment:
        "The type of property 'activeCartService: ActiveCartService' changed to: 'activeCartService: ActiveCartFacade' ",
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
      class: 'CartVoucherService',
      importPath: '@spartacus/core',
      deprecatedNode: 'store',
      comment:
        "The type of property 'store: Store<fromProcessStore.StateWithProcess<void>>' changed to: 'store: Store<StateWithProcess<void>>' ",
    },
    {
      class: 'ClientTokenInterceptor',
      importPath: '@spartacus/core',
      deprecatedNode: 'getClientToken',
      comment:
        "The 'getClientToken' method's signature changed to: 'getClientToken(  isClientTokenRequest: boolean): Observable<ClientToken | undefined>'",
    },
    {
      class: 'ClientTokenService',
      importPath: '@spartacus/core',
      deprecatedNode: 'getClientToken',
      comment:
        "The 'getClientToken' method's signature changed to: 'getClientToken(): Observable<ClientToken | undefined>'",
    },
    {
      class: 'LoadCmsComponent',
      importPath: '@spartacus/core',
      deprecatedNode: 'payload',
      comment:
        "The type of property 'payload: { uid: string; pageContext: PageContext; }' changed to: 'payload: { uid: string; pageContext?: PageContext; }' ",
    },
    {
      class: 'CmsComponentConnector',
      importPath: '@spartacus/core',
      deprecatedNode: 'config',
      comment:
        "The type of property 'config: OccConfig' changed to: 'config: CmsConfig' ",
    },
    {
      class: 'CmsService',
      importPath: '@spartacus/core',
      deprecatedNode: 'getPage',
      comment:
        "The 'getPage' method's signature changed to: 'getPage(  pageContext: PageContext,  forceReload: boolean): Observable<Page | null>'",
    },
    {
      class: 'CmsService',
      importPath: '@spartacus/core',
      deprecatedNode: 'loadNavigationItems',
      comment:
        "The 'loadNavigationItems' method's signature changed to: 'loadNavigationItems(  rootUid: string,  itemList: {\n        id: string | undefined;\n        superType: string | undefined;\n    }[]): void'",
    },
    {
      class: 'CmsStructureConfigService',
      importPath: '@spartacus/core',
      deprecatedNode: 'getPageFromConfig',
      comment:
        "The 'getPageFromConfig' method's signature changed to: 'getPageFromConfig(  pageId: string): Observable<CmsPageConfig | undefined>'",
    },
    {
      class: 'Command',
      importPath: '@spartacus/core',
      deprecatedNode: 'execute',
      comment:
        "The 'execute' method's signature changed to: 'execute(  parameters: PARAMS): Observable<RESULT>'",
    },
    {
      class: 'CommandService',
      importPath: '@spartacus/core',
      deprecatedNode: 'create',
      comment:
        "The 'create' method's signature changed to: 'create(  commandFactory: (command: PARAMS) => Observable<any>,  options: {\n        strategy?: CommandStrategy;\n    }): Command<PARAMS, RESULT>'",
    },
    {
      class: 'ConfigInitializerService',
      importPath: '@spartacus/core',
      deprecatedNode: 'ongoingScopes$',
      comment:
        "The type of property 'ongoingScopes$: BehaviorSubject<string[]>' changed to: 'ongoingScopes$: BehaviorSubject<string[] | undefined>' ",
    },
    {
      class: 'ConfigModule',
      importPath: '@spartacus/core',
      deprecatedNode: 'withConfigFactory',
      comment:
        "The 'withConfigFactory' method's signature changed to: 'withConfigFactory(  configFactory: ConfigFactory,  deps: any[]): ModuleWithProviders<ConfigModule>'",
    },
    {
      class: 'ConfigurableRoutesService',
      importPath: '@spartacus/core',
      deprecatedNode: 'validateRouteConfig',
      comment:
        "The 'validateRouteConfig' method's signature changed to: 'validateRouteConfig(  routeConfig: RouteConfig | null | undefined,  routeName: string,  route: Route): void'",
    },
    {
      class: 'ConsentService',
      importPath: '@spartacus/core',
      deprecatedNode: 'getConsent',
      comment:
        "The 'getConsent' method's signature changed to: 'getConsent(  templateCode: string): Observable<AnonymousConsent | Consent | undefined>'",
    },
    {
      class: 'CurrencyStatePersistenceService',
      importPath: '@spartacus/core',
      deprecatedNode: 'onRead',
      comment:
        "The 'onRead' method's signature changed to: 'onRead(  valueFromStorage: string | undefined): void'",
    },
    {
      class: 'DefaultRoutePageMetaResolver',
      importPath: '@spartacus/core',
      deprecatedNode: 'getParams',
      comment:
        "The 'getParams' method's signature changed to: 'getParams(): Observable<{\n        [_: string]: any;\n    } | undefined>'",
    },
    {
      class: 'DeleteUserAddressEvent',
      importPath: '@spartacus/core',
      deprecatedNode: 'userId',
      comment:
        "// TODO:Spartacus - Property 'userId' was removed from Class 'DeleteUserAddressEvent'. ",
    },
    {
      class: 'ForbiddenHandler',
      importPath: '@spartacus/core',
      deprecatedNode: 'handleError',
      comment:
        "The 'handleError' method's signature changed to: 'handleError(  request: HttpRequest<any>): void'",
    },
    {
      class: 'GlobalMessageConfig',
      importPath: '@spartacus/core',
      deprecatedNode: 'globalMessages',
      comment:
        "The type of property 'globalMessages: { [GlobalMessageType.MSG_TYPE_CONFIRMATION]?: GlobalMessageTypeConfig; [GlobalMessageType.MSG_TYPE_INFO]?: GlobalMessageTypeConfig; [GlobalMessageType.MSG_TYPE_ERROR]?: GlobalMessageTypeConfig; [GlobalMessageType.MSG_TYPE_WARNING]?: GlobalMessageTypeConfig; }' changed to: 'globalMessages: { [GlobalMessageType.MSG_TYPE_CONFIRMATION]?: GlobalMessageTypeConfig; [GlobalMessageType.MSG_TYPE_INFO]?: GlobalMessageTypeConfig; [GlobalMessageType.MSG_TYPE_ERROR]?: GlobalMessageTypeConfig; [GlobalMessageType.MSG_TYPE_WARNING]?: GlobalMessageTypeConfig; [GlobalMessageType.MSG_TYPE_ASSISTIVE]?: GlobalMessageTypeConfig; }' ",
    },
    {
      class: 'HttpErrorHandler',
      importPath: '@spartacus/core',
      deprecatedNode: 'platformId',
      comment:
        "The type of property 'platformId: Object' changed to: 'platformId: Object | undefined' ",
    },
    {
      class: 'InterceptorUtil',
      importPath: '@spartacus/core',
      deprecatedNode: 'getInterceptorParam',
      comment:
        "The 'getInterceptorParam' method's signature changed to: 'getInterceptorParam(  headerName: string,  headers: HttpHeaders): T | undefined'",
    },
    {
      class: 'LanguageStatePersistenceService',
      importPath: '@spartacus/core',
      deprecatedNode: 'onRead',
      comment:
        "The 'onRead' method's signature changed to: 'onRead(  valueFromStorage: string | undefined): void'",
    },
    {
      class: 'MockTranslatePipe',
      importPath: '@spartacus/core',
      deprecatedNode: 'transform',
      comment:
        "The 'transform' method's signature changed to: 'transform(  input: Translatable | string,  options: object): string | undefined'",
    },
    {
      class: 'MultiCartService',
      importPath: '@spartacus/core',
      deprecatedNode: 'createCart',
      comment:
        "The 'createCart' method's signature changed to: 'createCart(  { userId, oldCartId, toMergeCartGuid, extraData, }: {\n        userId: string;\n        oldCartId?: string;\n        toMergeCartGuid?: string;\n        extraData?: {\n            active?: boolean;\n        };\n    }): Observable<Cart>'",
    },
    {
      class: 'MultiCartService',
      importPath: '@spartacus/core',
      deprecatedNode: 'getCartEntity',
      comment:
        "The 'getCartEntity' method's signature changed to: 'getCartEntity(  cartId: string): Observable<StateUtils.ProcessesLoaderState<Cart | undefined>>'",
    },
    {
      class: 'MultiCartService',
      importPath: '@spartacus/core',
      deprecatedNode: 'getEntry',
      comment:
        "The 'getEntry' method's signature changed to: 'getEntry(  cartId: string,  productCode: string): Observable<OrderEntry | undefined>'",
    },
    {
      class: 'MultiCartService',
      importPath: '@spartacus/core',
      deprecatedNode: 'getLastEntry',
      comment:
        "The 'getLastEntry' method's signature changed to: 'getLastEntry(  cartId: string,  productCode: string): Observable<OrderEntry | undefined>'",
    },
    {
      class: 'NotAuthGuard',
      importPath: '@spartacus/core',
      deprecatedNode: 'authRedirectService',
      comment:
        "// TODO:Spartacus - Property 'authRedirectService' was removed from Class 'NotAuthGuard'. ",
    },
    {
      class: 'OAuthLibWrapperService',
      importPath: '@spartacus/core',
      deprecatedNode: 'tryLogin',
      comment:
        "The 'tryLogin' method's signature changed to: 'tryLogin(): Promise<OAuthTryLoginResult>'",
    },
    {
      class: 'OccCartAdapter',
      importPath: '@spartacus/core',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  userId: string,  cartId: string): Observable<Cart | undefined>'",
    },
    {
      class: 'OccCartVoucherAdapter',
      importPath: '@spartacus/core',
      deprecatedNode: 'getCartVoucherEndpoint',
      comment:
        "The 'getCartVoucherEndpoint' method's signature changed to: 'getCartVoucherEndpoint(  userId: string,  cartId: string): string'",
    },
    {
      class: 'OccCostCenterNormalizer',
      importPath: '@spartacus/core',
      deprecatedNode: 'normalizeBoolean',
      comment:
        "The 'normalizeBoolean' method's signature changed to: 'normalizeBoolean(  property: string | boolean | undefined): boolean'",
    },
    {
      class: 'OrderReturnRequestService',
      importPath: '@spartacus/core',
      deprecatedNode: 'getOrderReturnRequestList',
      comment:
        "The 'getOrderReturnRequestList' method's signature changed to: 'getOrderReturnRequestList(  pageSize: number): Observable<ReturnRequestList | undefined>'",
    },
    {
      class: 'OrderReturnRequestService',
      importPath: '@spartacus/core',
      deprecatedNode: 'store',
      comment:
        "The type of property 'store: Store<StateWithUser | StateWithProcess<void>>' changed to: 'store: Store<StateWithOrder>' ",
    },
    {
      class: 'GetProductSuggestions',
      importPath: '@spartacus/core',
      deprecatedNode: 'payload',
      comment:
        "The type of property 'payload: { term: string; searchConfig: SearchConfig; }' changed to: 'payload: { term: string; searchConfig?: SearchConfig; }' ",
    },
    {
      class: 'GetProductSuggestionsFail',
      importPath: '@spartacus/core',
      deprecatedNode: 'payload',
      comment:
        "The type of property 'payload: ErrorModel' changed to: 'payload: ErrorModel | undefined' ",
    },
    {
      class: 'SearchProducts',
      importPath: '@spartacus/core',
      deprecatedNode: 'auxiliary',
      comment:
        "The type of property 'auxiliary: boolean' changed to: 'auxiliary: boolean | undefined' ",
    },
    {
      class: 'SearchProducts',
      importPath: '@spartacus/core',
      deprecatedNode: 'payload',
      comment:
        "The type of property 'payload: { queryText: string; searchConfig: SearchConfig; }' changed to: 'payload: { queryText: string; searchConfig?: SearchConfig; }' ",
    },
    {
      class: 'SearchProductsFail',
      importPath: '@spartacus/core',
      deprecatedNode: 'auxiliary',
      comment:
        "The type of property 'auxiliary: boolean' changed to: 'auxiliary: boolean | undefined' ",
    },
    {
      class: 'SearchProductsFail',
      importPath: '@spartacus/core',
      deprecatedNode: 'payload',
      comment:
        "The type of property 'payload: ErrorModel' changed to: 'payload: ErrorModel | undefined' ",
    },
    {
      class: 'SearchProductsSuccess',
      importPath: '@spartacus/core',
      deprecatedNode: 'auxiliary',
      comment:
        "The type of property 'auxiliary: boolean' changed to: 'auxiliary: boolean | undefined' ",
    },
    {
      class: 'ProductEventBuilder',
      importPath: '@spartacus/core',
      deprecatedNode: 'buildFacetChangedEvent',
      comment:
        "The 'buildFacetChangedEvent' method's signature changed to: 'buildFacetChangedEvent(): Observable<FacetChangedEvent | undefined>'",
    },
    {
      class: 'ProductSearchService',
      importPath: '@spartacus/core',
      deprecatedNode: 'search',
      comment:
        "The 'search' method's signature changed to: 'search(  query: string | undefined,  searchConfig: SearchConfig): void'",
    },
    {
      class: 'ProductService',
      importPath: '@spartacus/core',
      deprecatedNode: 'get',
      comment:
        "The 'get' method's signature changed to: 'get(  productCode: string,  scopes: (ProductScope | string)[] | ProductScope | string): Observable<Product | undefined>'",
    },
    {
      class: 'RoutingConfigService',
      importPath: '@spartacus/core',
      deprecatedNode: 'getRouteConfig',
      comment:
        "The 'getRouteConfig' method's signature changed to: 'getRouteConfig(  routeName: string): RouteConfig | undefined'",
    },
    {
      class: 'RoutingPageMetaResolver',
      importPath: '@spartacus/core',
      deprecatedNode: 'getPageMetaConfig',
      comment:
        "The 'getPageMetaConfig' method's signature changed to: 'getPageMetaConfig(  route: ActivatedRouteSnapshotWithPageMeta): RoutePageMetaConfig | undefined'",
    },
    {
      class: 'RoutingService',
      importPath: '@spartacus/core',
      deprecatedNode: 'getNextPageContext',
      comment:
        "The 'getNextPageContext' method's signature changed to: 'getNextPageContext(): Observable<PageContext | undefined>'",
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
      deprecatedNode: 'getEntry',
      comment:
        "The 'getEntry' method's signature changed to: 'getEntry(  productCode: string): Observable<OrderEntry | undefined>'",
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
      class: 'SelectiveCartService',
      importPath: '@spartacus/core',
      deprecatedNode: 'userService',
      comment:
        "// TODO:Spartacus - Property 'userService' was removed from Class 'SelectiveCartService'. ",
    },
    {
      class: 'SemanticPathService',
      importPath: '@spartacus/core',
      deprecatedNode: 'get',
      comment:
        "The 'get' method's signature changed to: 'get(  routeName: string): string | undefined'",
    },
    {
      class: 'SiteConnector',
      importPath: '@spartacus/core',
      deprecatedNode: 'getBaseSite',
      comment:
        "The 'getBaseSite' method's signature changed to: 'getBaseSite(  siteUid: string): Observable<BaseSite | undefined>'",
    },
    {
      class: 'CurrencyChange',
      importPath: '@spartacus/core',
      deprecatedNode: 'payload',
      comment:
        "The type of property 'payload: { previous: string; current: string; }' changed to: 'payload: { previous: string | null; current: string | null; }' ",
    },
    {
      class: 'LanguageChange',
      importPath: '@spartacus/core',
      deprecatedNode: 'payload',
      comment:
        "The type of property 'payload: { previous: string; current: string; }' changed to: 'payload: { previous: string | null; current: string | null; }' ",
    },
    {
      class: 'SiteContextInterceptor',
      importPath: '@spartacus/core',
      deprecatedNode: 'activeCurr',
      comment:
        "The type of property 'activeCurr: string' changed to: 'activeCurr: string | undefined' ",
    },
    {
      class: 'SiteContextInterceptor',
      importPath: '@spartacus/core',
      deprecatedNode: 'activeLang',
      comment:
        "The type of property 'activeLang: string' changed to: 'activeLang: string | undefined' ",
    },
    {
      class: 'SiteContextParamsService',
      importPath: '@spartacus/core',
      deprecatedNode: 'getParamDefaultValue',
      comment:
        "The 'getParamDefaultValue' method's signature changed to: 'getParamDefaultValue(  param: string): string | undefined'",
    },
    {
      class: 'SiteContextParamsService',
      importPath: '@spartacus/core',
      deprecatedNode: 'getValue',
      comment:
        "The 'getValue' method's signature changed to: 'getValue(  param: string): string | undefined'",
    },
    {
      class: 'UpdateUserAddressEvent',
      importPath: '@spartacus/core',
      deprecatedNode: 'userId',
      comment:
        "// TODO:Spartacus - Property 'userId' was removed from Class 'UpdateUserAddressEvent'. ",
    },
    {
      class: 'ClaimCustomerCoupon',
      importPath: '@spartacus/core',
      deprecatedNode: 'payload',
      comment:
        "The type of property 'payload: { userId: string; couponCode: any; }' changed to: 'payload: { userId: string; couponCode: string; }' ",
    },
    {
      class: 'GiveUserConsent',
      importPath: '@spartacus/core',
      deprecatedNode: 'payload',
      comment:
        "The type of property 'payload: { userId: string; consentTemplateId: string; consentTemplateVersion: number; }' changed to: 'payload: { userId: string; consentTemplateId: string | undefined; consentTemplateVersion: number | undefined; }' ",
    },
    {
      class: 'TransferAnonymousConsent',
      importPath: '@spartacus/core',
      deprecatedNode: 'payload',
      comment:
        "The type of property 'payload: { userId: string; consentTemplateId: string; consentTemplateVersion: number; }' changed to: 'payload: { userId: string; consentTemplateId: string | undefined; consentTemplateVersion: number | undefined; }' ",
    },
    {
      class: 'UserAddressService',
      importPath: '@spartacus/core',
      deprecatedNode: 'getCountry',
      comment:
        "The 'getCountry' method's signature changed to: 'getCountry(  isocode: string): Observable<Country | null>'",
    },
    {
      class: 'UserAddressService',
      importPath: '@spartacus/core',
      deprecatedNode: 'store',
      comment:
        "The type of property 'store: Store<StateWithUser | StateWithProcess<void>>' changed to: 'store: Store<StateWithUser>' ",
    },
    {
      class: 'UserConsentService',
      importPath: '@spartacus/core',
      deprecatedNode: 'getConsent',
      comment:
        "The 'getConsent' method's signature changed to: 'getConsent(  templateId: string): Observable<Consent | undefined>'",
    },
    {
      class: 'UserConsentService',
      importPath: '@spartacus/core',
      deprecatedNode: 'isConsentWithdrawn',
      comment:
        "The 'isConsentWithdrawn' method's signature changed to: 'isConsentWithdrawn(  consent: Consent | undefined): boolean'",
    },
    {
      class: 'UserCostCenterService',
      importPath: '@spartacus/core',
      deprecatedNode: 'store',
      comment:
        "The type of property 'store: Store<StateWithUser | StateWithProcess<void>>' changed to: 'store: Store<StateWithUser>' ",
    },
    {
      class: 'UserPaymentService',
      importPath: '@spartacus/core',
      deprecatedNode: 'store',
      comment:
        "The type of property 'store: Store<StateWithUser | StateWithProcess<void>>' changed to: 'store: Store<StateWithUser>' ",
    },
    {
      class: 'UserService',
      importPath: '@spartacus/core',
      deprecatedNode: 'get',
      comment:
        "// TODO:Spartacus - Method 'get' was removed from Class 'UserService'. ",
    },
    {
      class: 'UserService',
      importPath: '@spartacus/core',
      deprecatedNode: 'userAccountFacade',
      comment:
        "// TODO:Spartacus - Property 'userAccountFacade' was removed from Class 'UserService'. ",
    },
    {
      class: 'UserService',
      importPath: '@spartacus/core',
      deprecatedNode: 'userProfileFacade',
      comment:
        "The type of property 'userProfileFacade: UserProfileFacadeTransitionalToken' changed to: 'userProfileFacade: UserProfileFacadeTransitionalToken | undefined' ",
    },
    {
      class: 'WindowRef',
      importPath: '@spartacus/core',
      deprecatedNode: 'serverOrigin',
      comment:
        "The type of property 'serverOrigin: string' changed to: 'serverOrigin: string | undefined' ",
    },
    {
      class: 'WindowRef',
      importPath: '@spartacus/core',
      deprecatedNode: 'serverUrl',
      comment:
        "The type of property 'serverUrl: string' changed to: 'serverUrl: string | undefined' ",
    },
    {
      class: 'WishListService',
      importPath: '@spartacus/core',
      deprecatedNode: 'multiCartService',
      comment:
        "// TODO:Spartacus - Property 'multiCartService' was removed from Class 'WishListService'. ",
    },
    {
      class: 'WishListService',
      importPath: '@spartacus/core',
      deprecatedNode: 'userService',
      comment:
        "// TODO:Spartacus - Property 'userService' was removed from Class 'WishListService'. ",
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
      deprecatedNode: 'getOrderDetails',
      comment:
        "The 'getOrderDetails' method's signature changed to: 'getOrderDetails(): Observable<Order | undefined>'",
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
      deprecatedNode: 'getOrderDetails',
      comment:
        "The 'getOrderDetails' method's signature changed to: 'getOrderDetails(): Observable<Order | undefined>'",
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
      class: 'AmountCellComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'property',
      comment:
        "The type of property 'property: string' changed to: 'property: string | undefined' ",
    },
    {
      class: 'AssignCellComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'notify',
      comment:
        "The 'notify' method's signature changed to: 'notify(  item: any,  state: string): void'",
    },
    {
      class: 'BaseMessageComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'messageIcon',
      comment:
        "The type of property 'messageIcon: ICON_TYPE' changed to: 'messageIcon: ICON_TYPE | undefined' ",
    },
    {
      class: 'BaseMessageComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'resolveType',
      comment:
        "The 'resolveType' method's signature changed to: 'resolveType(): string | undefined'",
    },
    {
      class: 'BaseMessageComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'type',
      comment:
        "The type of property 'type: string' changed to: 'type: string | undefined' ",
    },
    {
      class: 'BudgetFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'createCodeWithName',
      comment:
        "The 'createCodeWithName' method's signature changed to: 'createCodeWithName(  name: AbstractControl | null,  code: AbstractControl | null): void'",
    },
    {
      class: 'BudgetFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'form',
      comment:
        "The type of property 'form: FormGroup' changed to: 'form: FormGroup | null' ",
    },
    {
      class: 'BudgetFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'units$',
      comment:
        "The type of property 'units$: Observable<B2BUnitNode[]>' changed to: 'units$: Observable<B2BUnitNode[] | undefined>' ",
    },
    {
      class: 'BudgetItemService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'update',
      comment:
        "The 'update' method's signature changed to: 'update(  code: string,  value: Budget): Observable<OrganizationItemStatus<Budget>>'",
    },
    {
      class: 'CardComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'item$',
      comment:
        "The type of property 'item$: Observable<T>' changed to: 'item$: Observable<T | undefined>' ",
    },
    {
      class: 'CardComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'itemKey',
      comment:
        "The type of property 'itemKey: any' changed to: 'itemKey: string | undefined' ",
    },
    {
      class: 'CardComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'refreshMessages',
      comment:
        "The 'refreshMessages' method's signature changed to: 'refreshMessages(  item: T | undefined): void'",
    },
    {
      class: 'CardComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'showHint',
      comment:
        "The type of property 'showHint: boolean' changed to: 'showHint: boolean | undefined' ",
    },
    {
      class: 'CellComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'property',
      comment:
        "The type of property 'property: string' changed to: 'property: string | undefined' ",
    },
    {
      class: 'CostCenterAssignedBudgetListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  pagination: PaginationModel,  code: string): Observable<EntitiesModel<Budget> | undefined>'",
    },
    {
      class: 'CostCenterBudgetListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  pagination: PaginationModel,  code: string): Observable<EntitiesModel<Budget> | undefined>'",
    },
    {
      class: 'CostCenterFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'createCodeWithName',
      comment:
        "The 'createCodeWithName' method's signature changed to: 'createCodeWithName(  name: AbstractControl | null,  code: AbstractControl | null): void'",
    },
    {
      class: 'CostCenterFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'form',
      comment:
        "The type of property 'form: FormGroup' changed to: 'form: FormGroup | null' ",
    },
    {
      class: 'CostCenterFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'units$',
      comment:
        "The type of property 'units$: Observable<B2BUnitNode[]>' changed to: 'units$: Observable<B2BUnitNode[] | undefined>' ",
    },
    {
      class: 'CurrentItemService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'getItem',
      comment:
        "The 'getItem' method's signature changed to: 'getItem(  params: any[]): Observable<T | undefined>'",
    },
    {
      class: 'CurrentItemService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'item$',
      comment:
        "The type of property 'item$: Observable<T>' changed to: 'item$: Observable<T | undefined>' ",
    },
    {
      class: 'CurrentUnitAddressService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'getItem',
      comment:
        "The 'getItem' method's signature changed to: 'getItem(  unitUid: string,  addressId: string): Observable<Address | undefined>'",
    },
    {
      class: 'CurrentUnitAddressService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'item$',
      comment:
        "The type of property 'item$: Observable<Address>' changed to: 'item$: Observable<Address | undefined>' ",
    },
    {
      class: 'CurrentUserService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'name$',
      comment:
        "The type of property 'name$: Observable<string>' changed to: 'name$: Observable<string | undefined>' ",
    },
    {
      class: 'DeleteItemComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'confirmation',
      comment:
        "The type of property 'confirmation: Subject<ConfirmationMessageData>' changed to: 'confirmation: Subject<ConfirmationMessageData> | null' ",
    },
    {
      class: 'DeleteItemComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'current$',
      comment:
        "The type of property 'current$: Observable<T>' changed to: 'current$: Observable<T | undefined>' ",
    },
    {
      class: 'DisableInfoComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'current$',
      comment:
        "The type of property 'current$: Observable<T>' changed to: 'current$: Observable<T | undefined>' ",
    },
    {
      class: 'DisableInfoComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'displayDisabledCreate',
      comment:
        "The 'displayDisabledCreate' method's signature changed to: 'displayDisabledCreate(  item: T): boolean | undefined'",
    },
    {
      class: 'DisableInfoComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'displayDisabledDisable',
      comment:
        "The 'displayDisabledDisable' method's signature changed to: 'displayDisabledDisable(  item: T): boolean | undefined'",
    },
    {
      class: 'DisableInfoComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'displayDisabledEdit',
      comment:
        "The 'displayDisabledEdit' method's signature changed to: 'displayDisabledEdit(  item: T): boolean | undefined'",
    },
    {
      class: 'DisableInfoComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'displayDisabledEnable',
      comment:
        "The 'displayDisabledEnable' method's signature changed to: 'displayDisabledEnable(  item: T): boolean | undefined'",
    },
    {
      class: 'FormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'form$',
      comment:
        "The type of property 'form$: Observable<FormGroup>' changed to: 'form$: Observable<FormGroup | null>' ",
    },
    {
      class: 'FormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'notify',
      comment:
        "The 'notify' method's signature changed to: 'notify(  item: T | undefined,  action: string): void'",
    },
    {
      class: 'FormService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'form',
      comment:
        "The type of property 'form: FormGroup' changed to: 'form: FormGroup | null' ",
    },
    {
      class: 'FormService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'getForm',
      comment:
        "The 'getForm' method's signature changed to: 'getForm(  item: T): FormGroup | null'",
    },
    {
      class: 'ItemActiveDirective',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'subscription',
      comment:
        "The type of property 'subscription: any' changed to: 'subscription: Subscription' ",
    },
    {
      class: 'ItemExistsDirective',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'subscription',
      comment:
        "The type of property 'subscription: any' changed to: 'subscription: Subscription' ",
    },
    {
      class: 'ItemService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'current$',
      comment:
        "The type of property 'current$: Observable<T>' changed to: 'current$: Observable<T | undefined>' ",
    },
    {
      class: 'ItemService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'getForm',
      comment:
        "The 'getForm' method's signature changed to: 'getForm(  item: T): FormGroup | null'",
    },
    {
      class: 'ListComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'browse',
      comment:
        "The 'browse' method's signature changed to: 'browse(  pagination: P | undefined,  pageNumber: number): void'",
    },
    {
      class: 'ListComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'getListCount',
      comment:
        "The 'getListCount' method's signature changed to: 'getListCount(  dataTable: Table | EntitiesModel<T>): number | undefined'",
    },
    {
      class: 'ListComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'listData$',
      comment:
        "The type of property 'listData$: Observable<EntitiesModel<T>>' changed to: 'listData$: Observable<EntitiesModel<T> | undefined>' ",
    },
    {
      class: 'ListComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'sort',
      comment:
        "The 'sort' method's signature changed to: 'sort(  pagination: P | undefined): void'",
    },
    {
      class: 'ListComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'sortCode',
      comment:
        "The type of property 'sortCode: string' changed to: 'sortCode: string | undefined' ",
    },
    {
      class: 'ListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'getData',
      comment:
        "The 'getData' method's signature changed to: 'getData(  args: any): Observable<EntitiesModel<T> | undefined>'",
    },
    {
      class: 'ListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'hasGhostData',
      comment:
        "The 'hasGhostData' method's signature changed to: 'hasGhostData(  data: EntitiesModel<T> | undefined): boolean'",
    },
    {
      class: 'ListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  pagination: PaginationModel,  args: any): Observable<EntitiesModel<T> | undefined>'",
    },
    {
      class: 'MessageService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'close',
      comment:
        "The 'close' method's signature changed to: 'close(  message: Subject<MessageEventData> | null): void'",
    },
    {
      class: 'MessageService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'data$',
      comment:
        "The type of property 'data$: ReplaySubject<MessageData>' changed to: 'data$: ReplaySubject<T>' ",
    },
    {
      class: 'MessageService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'get',
      comment:
        "The 'get' method's signature changed to: 'get(): Observable<T>'",
    },
    {
      class: 'PermissionFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'form',
      comment:
        "The type of property 'form: FormGroup' changed to: 'form: FormGroup | null' ",
    },
    {
      class: 'PermissionFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'types$',
      comment:
        "The type of property 'types$: Observable<OrderApprovalPermissionType[]>' changed to: 'types$: Observable<OrderApprovalPermissionType[] | undefined>' ",
    },
    {
      class: 'PermissionFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'units$',
      comment:
        "The type of property 'units$: Observable<B2BUnitNode[]>' changed to: 'units$: Observable<B2BUnitNode[] | undefined>' ",
    },
    {
      class: 'PermissionFormService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'patchData',
      comment:
        "The 'patchData' method's signature changed to: 'patchData(  item: Permission): void'",
    },
    {
      class: 'PermissionItemService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'update',
      comment:
        "The 'update' method's signature changed to: 'update(  code: string,  value: Permission): Observable<OrganizationItemStatus<Permission>>'",
    },
    {
      class: 'StatusCellComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'label',
      comment:
        'The type of property \'label: "organization.enabled" | "organization.disabled"\' changed to: \'label: "organization.enabled" | "organization.disabled" | undefined\' ',
    },
    {
      class: 'SubListComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'listData$',
      comment:
        "The type of property 'listData$: Observable<EntitiesModel<any>>' changed to: 'listData$: Observable<EntitiesModel<any> | undefined>' ",
    },
    {
      class: 'SubListComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'showHint',
      comment:
        "The type of property 'showHint: boolean' changed to: 'showHint: boolean | undefined' ",
    },
    {
      class: 'SubListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'filterSelected',
      comment:
        "The 'filterSelected' method's signature changed to: 'filterSelected(  list: EntitiesModel<T> | undefined): EntitiesModel<T> | undefined'",
    },
    {
      class: 'ToggleStatusComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'confirmation',
      comment:
        "The type of property 'confirmation: Subject<ConfirmationMessageData>' changed to: 'confirmation: Subject<ConfirmationMessageData> | null' ",
    },
    {
      class: 'ToggleStatusComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'current$',
      comment:
        "The type of property 'current$: Observable<T>' changed to: 'current$: Observable<T | undefined>' ",
    },
    {
      class: 'UnitAddressDetailsComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'getCountry',
      comment:
        "The 'getCountry' method's signature changed to: 'getCountry(  isoCode: string | undefined): Observable<Country | undefined>'",
    },
    {
      class: 'UnitAddressDetailsComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'unit$',
      comment:
        "The type of property 'unit$: Observable<B2BUnit>' changed to: 'unit$: Observable<B2BUnit | undefined>' ",
    },
    {
      class: 'UnitAddressFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'form',
      comment:
        "The type of property 'form: FormGroup' changed to: 'form: FormGroup | null' ",
    },
    {
      class: 'UnitAddressFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'unit$',
      comment:
        "The type of property 'unit$: Observable<B2BUnit>' changed to: 'unit$: Observable<B2BUnit | undefined>' ",
    },
    {
      class: 'UnitAddressListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  _pagination: PaginationModel,  code: string): Observable<EntitiesModel<Address> | undefined>'",
    },
    {
      class: 'UnitApproverListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  pagination: PaginationModel,  code: string): Observable<EntitiesModel<B2BUser> | undefined>'",
    },
    {
      class: 'UnitAssignedApproverListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  pagination: PaginationModel,  code: string): Observable<EntitiesModel<B2BUser> | undefined>'",
    },
    {
      class: 'UnitChildItemService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'buildRouteParams',
      comment:
        "The 'buildRouteParams' method's signature changed to: 'buildRouteParams(  item: B2BUnit): {\n        uid: string | undefined;\n    }'",
    },
    {
      class: 'UnitChildrenComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'unit$',
      comment:
        "The type of property 'unit$: Observable<B2BUnit>' changed to: 'unit$: Observable<B2BUnit | undefined>' ",
    },
    {
      class: 'UnitCostCenterItemService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'buildRouteParams',
      comment:
        "The 'buildRouteParams' method's signature changed to: 'buildRouteParams(  item: CostCenter): {\n        uid: string | undefined;\n    }'",
    },
    {
      class: 'UnitCostCenterListComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'unit$',
      comment:
        "The type of property 'unit$: Observable<B2BUnit>' changed to: 'unit$: Observable<B2BUnit | undefined>' ",
    },
    {
      class: 'UnitFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'createUidWithName',
      comment:
        "The 'createUidWithName' method's signature changed to: 'createUidWithName(  name: AbstractControl | null,  code: AbstractControl | null): void'",
    },
    {
      class: 'UnitFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'form',
      comment:
        "The type of property 'form: FormGroup' changed to: 'form: FormGroup | null' ",
    },
    {
      class: 'UnitFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'units$',
      comment:
        "The type of property 'units$: Observable<B2BUnitNode[]>' changed to: 'units$: Observable<B2BUnitNode[] | undefined>' ",
    },
    {
      class: 'UnitFormService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'isRootUnit',
      comment:
        "The 'isRootUnit' method's signature changed to: 'isRootUnit(  item: B2BUnit | undefined): boolean'",
    },
    {
      class: 'UnitItemService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'update',
      comment:
        "The 'update' method's signature changed to: 'update(  code: string,  value: B2BUnit): Observable<OrganizationItemStatus<B2BUnit>>'",
    },
    {
      class: 'UnitListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'convertListItem',
      comment:
        "The 'convertListItem' method's signature changed to: 'convertListItem(  unit: B2BUnitNode | undefined,  depthLevel: number,  pagination: {\n        totalResults: number;\n    }): EntitiesModel<B2BUnitTreeNode> | undefined'",
    },
    {
      class: 'UnitListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(): Observable<EntitiesModel<B2BUnitTreeNode> | undefined>'",
    },
    {
      class: 'UnitUserListComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'unit$',
      comment:
        "The type of property 'unit$: Observable<B2BUnit>' changed to: 'unit$: Observable<B2BUnit | undefined>' ",
    },
    {
      class: 'UnitUserListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  pagination: PaginationModel,  code: string): Observable<EntitiesModel<B2BUser> | undefined>'",
    },
    {
      class: 'UnitUserRolesFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'form$',
      comment:
        "The type of property 'form$: Observable<FormGroup>' changed to: 'form$: Observable<FormGroup | null>' ",
    },
    {
      class: 'UnitUserRolesFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'item',
      comment:
        "The type of property 'item: B2BUser' changed to: 'item: B2BUser | undefined' ",
    },
    {
      class: 'UnitUserRolesFormService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'getForm',
      comment:
        "The 'getForm' method's signature changed to: 'getForm(  item: B2BUser): FormGroup | null'",
    },
    {
      class: 'UserApproverListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  pagination: PaginationModel,  code: string): Observable<EntitiesModel<B2BUser> | undefined>'",
    },
    {
      class: 'UserAssignedApproverListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  pagination: PaginationModel,  code: string): Observable<EntitiesModel<B2BUser> | undefined>'",
    },
    {
      class: 'UserAssignedPermissionListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  pagination: PaginationModel,  code: string): Observable<EntitiesModel<B2BUser> | undefined>'",
    },
    {
      class: 'UserAssignedUserGroupListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  pagination: PaginationModel,  code: string): Observable<EntitiesModel<UserGroup> | undefined>'",
    },
    {
      class: 'UserChangePasswordFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'form$',
      comment:
        "The type of property 'form$: Observable<FormGroup>' changed to: 'form$: Observable<FormGroup | null>' ",
    },
    {
      class: 'UserChangePasswordFormService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'getForm',
      comment:
        "The 'getForm' method's signature changed to: 'getForm(  item: User): FormGroup | null'",
    },
    {
      class: 'UserFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'form',
      comment:
        "The type of property 'form: FormGroup' changed to: 'form: FormGroup | null' ",
    },
    {
      class: 'UserFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'units$',
      comment:
        "The type of property 'units$: Observable<B2BUnitNode[]>' changed to: 'units$: Observable<B2BUnitNode[] | undefined>' ",
    },
    {
      class: 'UserFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'userService',
      comment:
        "// TODO:Spartacus - Property 'userService' was removed from Class 'UserFormComponent'. ",
    },
    {
      class: 'UserGroupAssignedPermissionsListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  pagination: PaginationModel,  code: string): Observable<EntitiesModel<Permission> | undefined>'",
    },
    {
      class: 'UserGroupAssignedUserListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  pagination: PaginationModel,  code: string): Observable<EntitiesModel<B2BUser> | undefined>'",
    },
    {
      class: 'UserGroupFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'createUidWithName',
      comment:
        "The 'createUidWithName' method's signature changed to: 'createUidWithName(  name: AbstractControl | null,  code: AbstractControl | null): void'",
    },
    {
      class: 'UserGroupFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'form',
      comment:
        "The type of property 'form: FormGroup' changed to: 'form: FormGroup | null' ",
    },
    {
      class: 'UserGroupFormComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'units$',
      comment:
        "The type of property 'units$: Observable<B2BUnitNode[]>' changed to: 'units$: Observable<B2BUnitNode[] | undefined>' ",
    },
    {
      class: 'UserGroupPermissionListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  pagination: PaginationModel,  code: string): Observable<EntitiesModel<Permission> | undefined>'",
    },
    {
      class: 'UserGroupUserListComponent',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'notify',
      comment:
        "The 'notify' method's signature changed to: 'notify(  item: UserGroup | undefined): void'",
    },
    {
      class: 'UserGroupUserListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  pagination: PaginationModel,  code: string): Observable<EntitiesModel<B2BUser> | undefined>'",
    },
    {
      class: 'UserItemService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'update',
      comment:
        "The 'update' method's signature changed to: 'update(  code: string,  value: B2BUser): Observable<OrganizationItemStatus<B2BUser>>'",
    },
    {
      class: 'UserPermissionListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  pagination: PaginationModel,  code: string): Observable<EntitiesModel<B2BUser> | undefined>'",
    },
    {
      class: 'UserUserGroupListService',
      importPath: '@spartacus/organization/administration/components',
      deprecatedNode: 'load',
      comment:
        "The 'load' method's signature changed to: 'load(  pagination: PaginationModel,  code: string): Observable<EntitiesModel<UserGroup> | undefined>'",
    },
    {
      class: 'AdminGuard',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'userService',
      comment:
        "// TODO:Spartacus - Property 'userService' was removed from Class 'AdminGuard'. ",
    },
    {
      class: 'B2BUserService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getApprovers',
      comment:
        "The 'getApprovers' method's signature changed to: 'getApprovers(  orgCustomerId: string,  params: SearchConfig): Observable<EntitiesModel<B2BUser> | undefined>'",
    },
    {
      class: 'B2BUserService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getErrorState',
      comment:
        "The 'getErrorState' method's signature changed to: 'getErrorState(  orgCustomerId: string): Observable<boolean>'",
    },
    {
      class: 'B2BUserService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getList',
      comment:
        "The 'getList' method's signature changed to: 'getList(  params: SearchConfig): Observable<EntitiesModel<B2BUser> | undefined>'",
    },
    {
      class: 'B2BUserService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getPermissions',
      comment:
        "The 'getPermissions' method's signature changed to: 'getPermissions(  orgCustomerId: string,  params: SearchConfig): Observable<EntitiesModel<Permission> | undefined>'",
    },
    {
      class: 'B2BUserService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getUserGroups',
      comment:
        "The 'getUserGroups' method's signature changed to: 'getUserGroups(  orgCustomerId: string,  params: SearchConfig): Observable<EntitiesModel<UserGroup> | undefined>'",
    },
    {
      class: 'B2BUserService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'store',
      comment:
        "The type of property 'store: Store<StateWithOrganization | StateWithProcess<void>>' changed to: 'store: Store<StateWithOrganization>' ",
    },
    {
      class: 'BudgetService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getErrorState',
      comment:
        "The 'getErrorState' method's signature changed to: 'getErrorState(  budgetCode: string): Observable<boolean>'",
    },
    {
      class: 'BudgetService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getList',
      comment:
        "The 'getList' method's signature changed to: 'getList(  params: SearchConfig): Observable<EntitiesModel<Budget> | undefined>'",
    },
    {
      class: 'BudgetService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'store',
      comment:
        "The type of property 'store: Store<StateWithOrganization | StateWithProcess<void>>' changed to: 'store: Store<StateWithOrganization>' ",
    },
    {
      class: 'CostCenterService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getBudgets',
      comment:
        "The 'getBudgets' method's signature changed to: 'getBudgets(  costCenterCode: string,  params: SearchConfig): Observable<EntitiesModel<Budget> | undefined>'",
    },
    {
      class: 'CostCenterService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getErrorState',
      comment:
        "The 'getErrorState' method's signature changed to: 'getErrorState(  costCenterCode: string): Observable<boolean>'",
    },
    {
      class: 'CostCenterService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getList',
      comment:
        "The 'getList' method's signature changed to: 'getList(  params: SearchConfig): Observable<EntitiesModel<CostCenter> | undefined>'",
    },
    {
      class: 'CostCenterService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'store',
      comment:
        "The type of property 'store: Store<StateWithOrganization | StateWithProcess<void>>' changed to: 'store: Store<StateWithOrganization>' ",
    },
    {
      class: 'OrgUnitService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'findUnitChildrenInTree',
      comment:
        "The 'findUnitChildrenInTree' method's signature changed to: 'findUnitChildrenInTree(  orginitId: string,  unit: B2BUnitNode): B2BUnitNode[]'",
    },
    {
      class: 'OrgUnitService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getActiveUnitList',
      comment:
        "The 'getActiveUnitList' method's signature changed to: 'getActiveUnitList(): Observable<B2BUnitNode[] | undefined>'",
    },
    {
      class: 'OrgUnitService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getAddress',
      comment:
        "The 'getAddress' method's signature changed to: 'getAddress(  orgUnitId: string,  addressId: string): Observable<Address | undefined>'",
    },
    {
      class: 'OrgUnitService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getAddresses',
      comment:
        "The 'getAddresses' method's signature changed to: 'getAddresses(  orgUnitId: string): Observable<EntitiesModel<Address> | undefined>'",
    },
    {
      class: 'OrgUnitService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getApprovalProcesses',
      comment:
        "The 'getApprovalProcesses' method's signature changed to: 'getApprovalProcesses(): Observable<B2BApprovalProcess[] | undefined>'",
    },
    {
      class: 'OrgUnitService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getErrorState',
      comment:
        "The 'getErrorState' method's signature changed to: 'getErrorState(  orgCustomerId: string): Observable<boolean>'",
    },
    {
      class: 'OrgUnitService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getList',
      comment:
        "The 'getList' method's signature changed to: 'getList(): Observable<B2BUnitNode[] | undefined>'",
    },
    {
      class: 'OrgUnitService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getTree',
      comment:
        "The 'getTree' method's signature changed to: 'getTree(): Observable<B2BUnitNode | undefined>'",
    },
    {
      class: 'OrgUnitService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getUsers',
      comment:
        "The 'getUsers' method's signature changed to: 'getUsers(  orgUnitId: string,  roleId: string,  params: SearchConfig): Observable<EntitiesModel<B2BUser> | undefined>'",
    },
    {
      class: 'OrgUnitService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'store',
      comment:
        "The type of property 'store: Store<StateWithOrganization | StateWithProcess<void>>' changed to: 'store: Store<StateWithOrganization>' ",
    },
    {
      class: 'PermissionService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getErrorState',
      comment:
        "The 'getErrorState' method's signature changed to: 'getErrorState(  permissionCode: string): Observable<boolean>'",
    },
    {
      class: 'PermissionService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getList',
      comment:
        "The 'getList' method's signature changed to: 'getList(  params: SearchConfig): Observable<EntitiesModel<Permission> | undefined>'",
    },
    {
      class: 'PermissionService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getTypes',
      comment:
        "The 'getTypes' method's signature changed to: 'getTypes(): Observable<OrderApprovalPermissionType[] | undefined>'",
    },
    {
      class: 'PermissionService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'store',
      comment:
        "The type of property 'store: Store<StateWithOrganization | StateWithProcess<void>>' changed to: 'store: Store<StateWithOrganization>' ",
    },
    {
      class: 'UserGroupService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getAvailableOrderApprovalPermissions',
      comment:
        "The 'getAvailableOrderApprovalPermissions' method's signature changed to: 'getAvailableOrderApprovalPermissions(  userGroupId: string,  params: SearchConfig): Observable<EntitiesModel<Permission> | undefined>'",
    },
    {
      class: 'UserGroupService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getAvailableOrgCustomers',
      comment:
        "The 'getAvailableOrgCustomers' method's signature changed to: 'getAvailableOrgCustomers(  userGroupId: string,  params: SearchConfig): Observable<EntitiesModel<B2BUser> | undefined>'",
    },
    {
      class: 'UserGroupService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getErrorState',
      comment:
        "The 'getErrorState' method's signature changed to: 'getErrorState(  code: string): Observable<boolean>'",
    },
    {
      class: 'UserGroupService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'getList',
      comment:
        "The 'getList' method's signature changed to: 'getList(  params: SearchConfig): Observable<EntitiesModel<UserGroup> | undefined>'",
    },
    {
      class: 'UserGroupService',
      importPath: '@spartacus/organization/administration/core',
      deprecatedNode: 'store',
      comment:
        "The type of property 'store: Store<StateWithOrganization | StateWithProcess<void>>' changed to: 'store: Store<StateWithOrganization>' ",
    },
    {
      class: 'OrderApprovalDetailFormComponent',
      importPath: '@spartacus/organization/order-approval',
      deprecatedNode: 'orderApproval$',
      comment:
        "The type of property 'orderApproval$: Observable<OrderApproval>' changed to: 'orderApproval$: Observable<OrderApproval | undefined>' ",
    },
    {
      class: 'OrderApprovalDetailService',
      importPath: '@spartacus/organization/order-approval',
      deprecatedNode: 'getOrderApproval',
      comment:
        "The 'getOrderApproval' method's signature changed to: 'getOrderApproval(): Observable<OrderApproval | undefined>'",
    },
    {
      class: 'OrderApprovalDetailService',
      importPath: '@spartacus/organization/order-approval',
      deprecatedNode: 'orderApproval$',
      comment:
        "The type of property 'orderApproval$: Observable<OrderApproval>' changed to: 'orderApproval$: Observable<OrderApproval | undefined>' ",
    },
    {
      class: 'OrderApprovalListComponent',
      importPath: '@spartacus/organization/order-approval',
      deprecatedNode: 'orderApprovals$',
      comment:
        "The type of property 'orderApprovals$: Observable<EntitiesModel<OrderApproval>>' changed to: 'orderApprovals$: Observable<EntitiesModel<OrderApproval> | undefined>' ",
    },
    {
      class: 'OrderApprovalListComponent',
      importPath: '@spartacus/organization/order-approval',
      deprecatedNode: 'sortLabels$',
      comment:
        "The type of property 'sortLabels$: any' changed to: 'sortLabels$: Observable<{ byDate: string; byOrderNumber: string; }>' ",
    },
    {
      class: 'OrderApprovalService',
      importPath: '@spartacus/organization/order-approval',
      deprecatedNode: 'get',
      comment:
        "The 'get' method's signature changed to: 'get(  orderApprovalCode: string): Observable<OrderApproval | undefined>'",
    },
    {
      class: 'OrderApprovalService',
      importPath: '@spartacus/organization/order-approval',
      deprecatedNode: 'getList',
      comment:
        "The 'getList' method's signature changed to: 'getList(  params: SearchConfig): Observable<EntitiesModel<OrderApproval> | undefined>'",
    },
    {
      class: 'BulkPricingService',
      importPath: '@spartacus/product/bulk-pricing/core',
      deprecatedNode: 'convert',
      comment:
        "The 'convert' method's signature changed to: 'convert(  productPriceScope: Product | undefined): BulkPrice[] | undefined'",
    },
    {
      class: 'ConfiguratorAttributeHeaderComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'getConflictMessageKey',
      comment:
        "The 'getConflictMessageKey' method's signature changed to: 'getConflictMessageKey(): string'",
    },
    {
      class: 'ConfiguratorAttributeHeaderComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'isAttributeGroup',
      comment:
        "The 'isAttributeGroup' method's signature changed to: 'isAttributeGroup(): boolean'",
    },
    {
      class: 'ConfiguratorAttributeHeaderComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'isMultiSelection',
      comment:
        "// TODO:Spartacus - Method 'isMultiSelection' was removed from Class 'ConfiguratorAttributeHeaderComponent'. It has been converted to a getter instead.",
    },
    {
      class: 'ConfiguratorAttributeMultiSelectionBundleComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'extractProductCardParameters',
      comment:
        "The 'extractProductCardParameters' method's signature changed to: 'extractProductCardParameters(  disableAllButtons: boolean | null,  hideRemoveButton: boolean | null,  value: Configurator.Value,  index: number): ConfiguratorAttributeProductCardComponentOptions'",
    },
    {
      class: 'ConfiguratorAttributeSingleSelectionBundleComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'extractProductCardParameters',
      comment:
        "The 'extractProductCardParameters' method's signature changed to: 'extractProductCardParameters(  value: Configurator.Value,  index: number): ConfiguratorAttributeProductCardComponentOptions'",
    },
    {
      class: 'ConfiguratorCartService',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'activeCartService',
      comment:
        "The type of property 'activeCartService: ActiveCartService' changed to: 'activeCartService: ActiveCartFacade' ",
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
      deprecatedNode: 'activeCartService',
      comment:
        "The type of property 'activeCartService: ActiveCartService' changed to: 'activeCartService: ActiveCartFacade' ",
    },
    {
      class: 'ConfiguratorCommonsService',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'removeObsoleteProductBoundConfiguration',
      comment:
        "// TODO:Spartacus - Method 'removeObsoleteProductBoundConfiguration' was removed from Class 'ConfiguratorCommonsService'. It is no longer needed because an obsolete product bound configuration is handled within action `RemoveCartBoundConfigurations`. So in case you called `removeObsoleteProductBoundConfiguration` before, consider to raise that action, which will clear all cart bound configurations, and in addition delete the obsolete product bound configuration that is predecessor of a cart bound configuration.",
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
        "// TODO:Spartacus - Property 'configuration$' was removed from Class 'ConfiguratorGroupTitleComponent'. In case you use it in a sub component, consider to declare it there via `configuration$: Observable<Configurator.Configuration> = this.configRouterExtractorService .extractRouterData() .pipe( switchMap((routerData) => this.configuratorCommonsService.getConfiguration(routerData.owner) ) );`",
    },
    {
      class: 'ConfiguratorOverviewNotificationBannerComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'countIssuesInGroup',
      comment:
        "// TODO:Spartacus - Method 'countIssuesInGroup' was removed from Class 'ConfiguratorOverviewNotificationBannerComponent'. ",
    },
    {
      class: 'ConfiguratorProductTitleComponent',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'product$',
      comment:
        "The type of property 'product$: Observable<Product>' changed to: 'product$: Observable<Product | undefined>' ",
    },
    {
      class: 'ConfiguratorStorefrontUtilsService',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'isInViewport',
      comment:
        "// TODO:Spartacus - Method 'isInViewport' was removed from Class 'ConfiguratorStorefrontUtilsService'. It is not needed anymore as scrolling is always executed on navigation regardless of position of element.",
    },
    {
      class: 'OccConfiguratorVariantNormalizer',
      importPath: '@spartacus/product-configurator/rulebased',
      deprecatedNode: 'convertAttributeType',
      comment:
        "The 'convertAttributeType' method's signature changed to: 'convertAttributeType(  sourceAttribute: OccConfigurator.Attribute): Configurator.UiType'",
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
      class: 'ActiveFacetsComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getFocusKey',
      comment:
        "The 'getFocusKey' method's signature changed to: 'getFocusKey(  facetList: FacetList,  facet: Breadcrumb): string | undefined'",
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
      deprecatedNode: 'entry$',
      comment:
        "The type of property 'entry$: Observable<OrderEntry>' changed to: 'entry$: Observable<OrderEntry | undefined>' ",
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
      class: 'AddressBookComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'editCard',
      comment:
        "The type of property 'editCard: string' changed to: 'editCard: string | null' ",
    },
    {
      class: 'AddressBookComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getCardContent',
      comment:
        "The 'getCardContent' method's signature changed to: 'getCardContent(  address: Address): Observable<Card>'",
    },
    {
      class: 'AddressBookComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'setAddressAsDefault',
      comment:
        "The 'setAddressAsDefault' method's signature changed to: 'setAddressAsDefault(  address: Address): void'",
    },
    {
      class: 'AddressFormComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'countrySelected',
      comment:
        "The 'countrySelected' method's signature changed to: 'countrySelected(  country: Country | undefined): void'",
    },
    {
      class: 'AddressFormComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'suggestedAddressModalRef',
      comment:
        "The type of property 'suggestedAddressModalRef: ModalRef' changed to: 'suggestedAddressModalRef: ModalRef | null' ",
    },
    {
      class: 'AddToCartComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'activeCartService',
      comment:
        "The type of property 'activeCartService: ActiveCartService' changed to: 'activeCartService: ActiveCartFacade' ",
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
      deprecatedNode: 'getProductInWishList',
      comment:
        "The 'getProductInWishList' method's signature changed to: 'getProductInWishList(  product: Product,  entries: OrderEntry[]): OrderEntry | undefined'",
    },
    {
      class: 'AddToWishListComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'wishListService',
      comment:
        "// TODO:Spartacus - Property 'wishListService' was removed from Class 'AddToWishListComponent'. ",
    },
    {
      class: 'AnonymousConsentDialogComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getCorrespondingConsent',
      comment:
        "The 'getCorrespondingConsent' method's signature changed to: 'getCorrespondingConsent(  template: ConsentTemplate,  consents: AnonymousConsent[]): AnonymousConsent | null'",
    },
    {
      class: 'AnonymousConsentDialogComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'showLegalDescription',
      comment:
        "The type of property 'showLegalDescription: boolean' changed to: 'showLegalDescription: boolean | undefined' ",
    },
    {
      class: 'AppliedCouponsComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'cartVoucherService',
      comment:
        "The type of property 'cartVoucherService: CartVoucherService' changed to: 'cartVoucherService: CartVoucherFacade' ",
    },
    {
      class: 'BreadcrumbSchemaBuilder',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'collect',
      comment:
        "The 'collect' method's signature changed to: 'collect(  pageMeta: PageMeta | null): any'",
    },
    {
      class: 'BreakpointService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getMaxSize',
      comment:
        "The 'getMaxSize' method's signature changed to: 'getMaxSize(  breakpoint: BREAKPOINT): number | null'",
    },
    {
      class: 'BreakpointService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getMinSize',
      comment:
        "The 'getMinSize' method's signature changed to: 'getMinSize(  breakpoint: BREAKPOINT): number | null'",
    },
    {
      class: 'BreakpointService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getSize',
      comment:
        "The 'getSize' method's signature changed to: 'getSize(  breakpoint: BREAKPOINT): number | null'",
    },
    {
      class: 'CardComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'content',
      comment:
        "The type of property 'content: Card' changed to: 'content: Card | null' ",
    },
    {
      class: 'CarouselComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'title',
      comment:
        "The type of property 'title: string' changed to: 'title: string | undefined | null' ",
    },
    {
      class: 'CartCouponComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'activeCartService',
      comment:
        "The type of property 'activeCartService: ActiveCartService' changed to: 'activeCartService: ActiveCartFacade' ",
    },
    {
      class: 'CartCouponComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'cartVoucherService',
      comment:
        "The type of property 'cartVoucherService: CartVoucherService' changed to: 'cartVoucherService: CartVoucherFacade' ",
    },
    {
      class: 'CartDetailsComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'activeCartService',
      comment:
        "The type of property 'activeCartService: ActiveCartService' changed to: 'activeCartService: ActiveCartFacade' ",
    },
    {
      class: 'CartDetailsComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'selectiveCartService',
      comment:
        "The type of property 'selectiveCartService: SelectiveCartService' changed to: 'selectiveCartService: SelectiveCartFacade' ",
    },
    {
      class: 'CartItemListComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'activeCartService',
      comment:
        "The type of property 'activeCartService: ActiveCartService' changed to: 'activeCartService: ActiveCartFacade' ",
    },
    {
      class: 'CartItemListComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getControl',
      comment:
        "The 'getControl' method's signature changed to: 'getControl(  item: OrderEntry): Observable<FormGroup> | undefined'",
    },
    {
      class: 'CartItemListComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'multiCartService',
      comment:
        "The type of property 'multiCartService: MultiCartService' changed to: 'multiCartService: MultiCartFacade' ",
    },
    {
      class: 'CartItemListComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'selectiveCartService',
      comment:
        "The type of property 'selectiveCartService: SelectiveCartService' changed to: 'selectiveCartService: SelectiveCartFacade' ",
    },
    {
      class: 'CartPageLayoutHandler',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'activeCartService',
      comment:
        "The type of property 'activeCartService: ActiveCartService' changed to: 'activeCartService: ActiveCartFacade' ",
    },
    {
      class: 'CartPageLayoutHandler',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'handle',
      comment:
        "The 'handle' method's signature changed to: 'handle(  slots$: Observable<string[]>,  pageTemplate: string,  section: string): Observable<string[]>'",
    },
    {
      class: 'CartPageLayoutHandler',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'selectiveCartService',
      comment:
        "The type of property 'selectiveCartService: SelectiveCartService' changed to: 'selectiveCartService: SelectiveCartFacade' ",
    },
    {
      class: 'CartTotalsComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'activeCartService',
      comment:
        "The type of property 'activeCartService: ActiveCartService' changed to: 'activeCartService: ActiveCartFacade' ",
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
      deprecatedNode: 'router',
      comment:
        "// TODO:Spartacus - Property 'router' was removed from Class 'CartTotalsComponent'. ",
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
      class: 'CartValidationGuard',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'activeCartService',
      comment:
        "The type of property 'activeCartService: ActiveCartService' changed to: 'activeCartService: ActiveCartFacade' ",
    },
    {
      class: 'CartValidationGuard',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'cartValidationService',
      comment:
        "The type of property 'cartValidationService: CartValidationService' changed to: 'cartValidationService: CartValidationFacade' ",
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
      class: 'ComponentHandlerService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getLauncher',
      comment:
        "The 'getLauncher' method's signature changed to: 'getLauncher(  componentMapping: CmsComponentMapping,  viewContainerRef: ViewContainerRef,  elementInjector: Injector,  module: NgModuleRef<any>): Observable<{\n        elementRef: ElementRef;\n        componentRef?: ComponentRef<any>;\n    }> | undefined'",
    },
    {
      class: 'ComponentHandlerService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'resolve',
      comment:
        "The 'resolve' method's signature changed to: 'resolve(  componentMapping: CmsComponentMapping): ComponentHandler | undefined'",
    },
    {
      class: 'ComponentWrapperDirective',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'cmpRef',
      comment:
        "The type of property 'public' changed to: '`cmpRef` has been made `protected` due to being unsafe.' ",
    },
    {
      class: 'ConsentManagementFormComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'consent',
      comment:
        "The type of property 'consent: AnonymousConsent' changed to: 'consent: AnonymousConsent | null' ",
    },
    {
      class: 'ConsentManagementFormComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'isRequired',
      comment:
        "The 'isRequired' method's signature changed to: 'isRequired(  templateId: string | undefined): boolean'",
    },
    {
      class: 'CustomFormValidators',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'dateRange',
      comment:
        "The 'dateRange' method's signature changed to: 'dateRange(  startDateKey: string,  endDateKey: string,  getDate: (value: string) => Date | undefined): (_: FormGroup) => ValidationErrors | null'",
    },
    {
      class: 'DatePickerComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getDate',
      comment:
        "The 'getDate' method's signature changed to: 'getDate(  date: string): string | undefined'",
    },
    {
      class: 'DatePickerService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getDate',
      comment:
        "The 'getDate' method's signature changed to: 'getDate(  value: string): Date | undefined'",
    },
    {
      class: 'DirectionService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'config',
      comment:
        "The type of property 'config: Direction' changed to: 'config: Direction | undefined' ",
    },
    {
      class: 'DirectionService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getDirection',
      comment:
        "The 'getDirection' method's signature changed to: 'getDirection(  language: string): DirectionMode | undefined'",
    },
    {
      class: 'DirectionService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'setDirection',
      comment:
        "The 'setDirection' method's signature changed to: 'setDirection(  el: HTMLElement,  direction: DirectionMode | undefined): void'",
    },
    {
      class: 'FileUploadComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'update',
      comment:
        "The type of property 'update: EventEmitter<FileList>' changed to: 'update: EventEmitter<FileList | null>' ",
    },
    {
      class: 'FooterNavigationComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'styleClass$',
      comment:
        "The type of property 'styleClass$: Observable<string>' changed to: 'styleClass$: Observable<string | undefined>' ",
    },
    {
      class: 'FormErrorsComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: '_control',
      comment:
        "The type of property '_control: FormControl' changed to: '_control: FormControl | AbstractControl' ",
    },
    {
      class: 'FormErrorsComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'control',
      comment:
        "The type of property 'control: FormControl' changed to: 'control: FormControl | AbstractControl' ",
    },
    {
      class: 'FormErrorsComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'errors$',
      comment:
        "// TODO:Spartacus - Property 'errors$' was removed from Class 'FormErrorsComponent'. Use 'errorsDetails$' instead.",
    },
    {
      class: 'FormErrorsComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'errorsDetails$',
      comment:
        "The type of property 'errorsDetails$: Observable<Array<[string, string]>>' changed to: 'errorsDetails$: Observable<Array<[string, string | boolean]>>' ",
    },
    {
      class: 'FormErrorsComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'translationParams',
      comment:
        "The type of property 'translationParams: { [key: string]: string; }' changed to: 'translationParams: { [key: string]: string | null; }' ",
    },
    {
      class: 'GenericLinkComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'fragment',
      comment:
        "The type of property 'fragment: string' changed to: 'fragment: string | undefined' ",
    },
    {
      class: 'GenericLinkComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'MAILTO_PROTOCOL_REGEX',
      comment:
        "// TODO:Spartacus - Property 'MAILTO_PROTOCOL_REGEX' was removed from Class 'GenericLinkComponent'. ",
    },
    {
      class: 'GenericLinkComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'queryParams',
      comment:
        "The type of property 'queryParams: Params' changed to: 'queryParams: Params | undefined' ",
    },
    {
      class: 'GenericLinkComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'rel',
      comment:
        "The type of property 'rel: string' changed to: 'rel: \"noopener\" | null' ",
    },
    {
      class: 'GenericLinkComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'routerUrl',
      comment:
        "The type of property 'routerUrl: any[]' changed to: 'routerUrl: string[] | undefined' ",
    },
    {
      class: 'GenericLinkComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'style',
      comment:
        "The type of property 'style: string' changed to: 'style: string | undefined' ",
    },
    {
      class: 'GenericLinkComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'TEL_PROTOCOL_REGEX',
      comment:
        "// TODO:Spartacus - Property 'TEL_PROTOCOL_REGEX' was removed from Class 'GenericLinkComponent'. ",
    },
    {
      class: 'IconComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'icon',
      comment:
        "The type of property 'icon: SafeHtml' changed to: 'icon: SafeHtml | undefined' ",
    },
    {
      class: 'IconLoaderService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getFlipDirection',
      comment:
        "The 'getFlipDirection' method's signature changed to: 'getFlipDirection(  type: ICON_TYPE | string): DirectionMode | undefined'",
    },
    {
      class: 'IconLoaderService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getHtml',
      comment:
        "The 'getHtml' method's signature changed to: 'getHtml(  type: ICON_TYPE | string): SafeHtml | undefined'",
    },
    {
      class: 'IconLoaderService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getSymbol',
      comment:
        "The 'getSymbol' method's signature changed to: 'getSymbol(  iconType: ICON_TYPE | string): string | undefined'",
    },
    {
      class: 'JsonLdDirective',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'generateJsonLdScript',
      comment:
        "The 'generateJsonLdScript' method's signature changed to: 'generateJsonLdScript(  schema: string | {}): SafeHtml | undefined'",
    },
    {
      class: 'JsonLdDirective',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'jsonLD',
      comment:
        "The type of property 'jsonLD: SafeHtml' changed to: 'jsonLD: SafeHtml | undefined' ",
    },
    {
      class: 'LaunchDialogService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'dialogClose',
      comment:
        "The type of property 'dialogClose: Observable<string>' changed to: 'dialogClose: Observable<string | undefined>' ",
    },
    {
      class: 'LaunchDialogService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getStrategy',
      comment:
        "The 'getStrategy' method's signature changed to: 'getStrategy(  config: LaunchOptions): LaunchRenderStrategy | undefined'",
    },
    {
      class: 'LinkComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'styleClasses',
      comment:
        "The type of property 'styleClasses: string' changed to: 'styleClasses: string | undefined' ",
    },
    {
      class: 'LoginGuard',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'authRedirectService',
      comment:
        "// TODO:Spartacus - Property 'authRedirectService' was removed from Class 'LoginGuard'. ",
    },
    {
      class: 'LogoutGuard',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'authRedirectService',
      comment:
        "// TODO:Spartacus - Property 'authRedirectService' was removed from Class 'LogoutGuard'. ",
    },
    {
      class: 'MediaComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'loadingStrategy',
      comment:
        "The type of property 'loadingStrategy: string | ImageLoadingStrategy | null' changed to: 'loadingStrategy: ImageLoadingStrategy | null' ",
    },
    {
      class: 'MediaComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'media',
      comment:
        "The type of property 'media: Media' changed to: 'media: Media | undefined' ",
    },
    {
      class: 'MediaService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'resolveBestFormat',
      comment:
        "The 'resolveBestFormat' method's signature changed to: 'resolveBestFormat(  media: MediaContainer | Image): string | undefined'",
    },
    {
      class: 'MessageComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getIconType',
      comment:
        "The type of property 'getIconType: string' changed to: 'getIconType: ICON_TYPE' ",
    },
    {
      class: 'MiniCartComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'activeCartService',
      comment:
        "// TODO:Spartacus - Property 'activeCartService' was removed from Class 'MiniCartComponent'. ",
    },
    {
      class: 'ModalService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getActiveModal',
      comment:
        "The 'getActiveModal' method's signature changed to: 'getActiveModal(): ModalRef | null'",
    },
    {
      class: 'MyInterestsComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'removeInterest',
      comment:
        "The 'removeInterest' method's signature changed to: 'removeInterest(  relation: ProductInterestEntryRelation & {\n        product$?: Observable<Product | undefined>;\n    }): void'",
    },
    {
      class: 'NavigationComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'styleClass$',
      comment:
        "The type of property 'styleClass$: Observable<string>' changed to: 'styleClass$: Observable<string | undefined>' ",
    },
    {
      class: 'NavigationService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getLink',
      comment:
        "The 'getLink' method's signature changed to: 'getLink(  item: any): string | string[] | undefined'",
    },
    {
      class: 'NavigationUIComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'node',
      comment:
        "The type of property 'node: NavigationNode' changed to: 'node: NavigationNode | null' ",
    },
    {
      class: 'NavigationUIComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'reinitalizeMenu',
      comment:
        "// TODO:Spartacus - Method 'reinitalizeMenu' was removed from Class 'NavigationUIComponent'. Use 'reinitializeMenu' instead.",
    },
    {
      class: 'NavigationUIComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'resetMenuOnClose',
      comment:
        "The type of property 'resetMenuOnClose: boolean' changed to: 'resetMenuOnClose: boolean | undefined' ",
    },
    {
      class: 'OrderCancellationService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'userOrderService',
      comment:
        "// TODO:Spartacus - Property 'userOrderService' was removed from Class 'OrderCancellationService'. ",
    },
    {
      class: 'OrderDetailItemsComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'cancel$',
      comment:
        "The type of property 'cancel$: Observable<Consignment[]>' changed to: 'cancel$: Observable<Consignment[] | undefined>' ",
    },
    {
      class: 'OrderDetailItemsComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'completed$',
      comment:
        "The type of property 'completed$: Observable<Consignment[]>' changed to: 'completed$: Observable<Consignment[] | undefined>' ",
    },
    {
      class: 'OrderDetailItemsComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'order$',
      comment:
        "The type of property 'order$: Observable<any>' changed to: 'order$: Observable<Order>' ",
    },
    {
      class: 'OrderDetailItemsComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'others$',
      comment:
        "The type of property 'others$: Observable<Consignment[]>' changed to: 'others$: Observable<Consignment[] | undefined>' ",
    },
    {
      class: 'OrderHistoryComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'orders$',
      comment:
        "The type of property 'orders$: Observable<OrderHistoryList>' changed to: 'orders$: Observable<OrderHistoryList | undefined>' ",
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
      class: 'OrderOverviewComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getOrderCurrentDateCardContent',
      comment:
        "The 'getOrderCurrentDateCardContent' method's signature changed to: 'getOrderCurrentDateCardContent(  isoDate: string | null): Observable<Card>'",
    },
    {
      class: 'OrderOverviewComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getReplenishmentNextDateCardContent',
      comment:
        "The 'getReplenishmentNextDateCardContent' method's signature changed to: 'getReplenishmentNextDateCardContent(  isoDate: string | null): Observable<Card>'",
    },
    {
      class: 'OrderOverviewComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getReplenishmentStartOnCardContent',
      comment:
        "The 'getReplenishmentStartOnCardContent' method's signature changed to: 'getReplenishmentStartOnCardContent(  isoDate: string | null): Observable<Card>'",
    },
    {
      class: 'OrderReturnRequestListComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'returnRequests$',
      comment:
        "The type of property 'returnRequests$: Observable<ReturnRequestList>' changed to: 'returnRequests$: Observable<ReturnRequestList | undefined>' ",
    },
    {
      class: 'OrderReturnService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'returnRequestService',
      comment:
        "The type of property 'returnRequestService: OrderReturnRequestService' changed to: 'returnRequestService: OrderReturnRequestFacade' ",
    },
    {
      class: 'OutletDirective',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'loaded',
      comment:
        "The type of property 'loaded: EventEmitter<Boolean>' changed to: 'loaded: EventEmitter<boolean>' ",
    },
    {
      class: 'OutletService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'get',
      comment:
        "The 'get' method's signature changed to: 'get(  outlet: string,  position: OutletPosition,  stacked: boolean): T[] | T | undefined'",
    },
    {
      class: 'PageLayoutComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'pageFoldSlot$',
      comment:
        "The type of property 'pageFoldSlot$: Observable<string>' changed to: 'pageFoldSlot$: Observable<string | undefined>' ",
    },
    {
      class: 'PageLayoutComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'section$',
      comment:
        "The type of property 'section$: BehaviorSubject<string>' changed to: 'section$: BehaviorSubject<string | undefined>' ",
    },
    {
      class: 'PageLayoutService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getPageFoldSlot',
      comment:
        "The 'getPageFoldSlot' method's signature changed to: 'getPageFoldSlot(  pageTemplate: string): Observable<string | undefined>'",
    },
    {
      class: 'PageLayoutService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getSlotConfig',
      comment:
        "The 'getSlotConfig' method's signature changed to: 'getSlotConfig(  templateUid: string,  configAttribute: string,  section: string,  breakpoint: BREAKPOINT): SlotConfig | undefined'",
    },
    {
      class: 'PageLayoutService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getSlotConfigForSection',
      comment:
        "The 'getSlotConfigForSection' method's signature changed to: 'getSlotConfigForSection(  templateUid: string,  configAttribute: string,  section: string,  breakpoint: BREAKPOINT): SlotConfig | undefined'",
    },
    {
      class: 'PageSlotComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'position',
      comment:
        "The type of property 'position: string' changed to: 'position: string | undefined' ",
    },
    {
      class: 'PageSlotComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'position$',
      comment:
        "The type of property 'position$: BehaviorSubject<string>' changed to: 'position$: BehaviorSubject<string | undefined>' ",
    },
    {
      class: 'PageSlotService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'document',
      comment:
        "The type of property 'document: any' changed to: 'document: Document' ",
    },
    {
      class: 'PageSlotService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getComponentDeferOptions',
      comment:
        "The 'getComponentDeferOptions' method's signature changed to: 'getComponentDeferOptions(  slot: string | undefined,  componentType: string): IntersectionOptions'",
    },
    {
      class: 'PageSlotService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'prerenderedSlots',
      comment:
        "The type of property 'prerenderedSlots: string[] | undefined' changed to: 'prerenderedSlots: (string | null)[] | undefined' ",
    },
    {
      class: 'PaginationBuilder',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getStartOfRange',
      comment:
        "The 'getStartOfRange' method's signature changed to: 'getStartOfRange(  pageCount: number,  current: number): number | null'",
    },
    {
      class: 'PaginationComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'defaultPage',
      comment:
        "The type of property 'defaultPage: any' changed to: 'defaultPage: number | undefined' ",
    },
    {
      class: 'PaymentMethodsComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'editCard',
      comment:
        "The type of property 'editCard: string' changed to: 'editCard: string | undefined' ",
    },
    {
      class: 'PopoverComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'close',
      comment:
        "The 'close' method's signature changed to: 'close(  event: MouseEvent | KeyboardEvent | Event): void'",
    },
    {
      class: 'PopoverComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'isClickedOnDirective',
      comment:
        "The 'isClickedOnDirective' method's signature changed to: 'isClickedOnDirective(  event: MouseEvent): any'",
    },
    {
      class: 'PopoverComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'isClickedOnPopover',
      comment:
        "The 'isClickedOnPopover' method's signature changed to: 'isClickedOnPopover(  event: MouseEvent): any'",
    },
    {
      class: 'PopoverComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'isTemplate',
      comment:
        "// TODO:Spartacus - Property 'isTemplate' was removed from Class 'PopoverComponent'. ",
    },
    {
      class: 'PositioningService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'offset',
      comment:
        "The 'offset' method's signature changed to: 'offset(  element: HTMLElement,  round: boolean): UIPositionRectangle'",
    },
    {
      class: 'PositioningService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'position',
      comment:
        "The 'position' method's signature changed to: 'position(  element: HTMLElement,  round: boolean): UIPositionRectangle'",
    },
    {
      class: 'ProductAttributesComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'product$',
      comment:
        "The type of property 'product$: Observable<Product>' changed to: 'product$: Observable<Product | null>' ",
    },
    {
      class: 'ProductCarouselComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'items$',
      comment:
        "The type of property 'items$: Observable<Observable<Product>[]>' changed to: 'items$: Observable<Observable<Product | undefined>[]>' ",
    },
    {
      class: 'ProductCarouselComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'PRODUCT_SCOPE',
      comment:
        "The type of property 'PRODUCT_SCOPE:' changed to: 'PRODUCT_SCOPE: ProductScope[]' ",
    },
    {
      class: 'ProductCarouselComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'title$',
      comment:
        "The type of property 'title$: Observable<string>' changed to: 'title$: Observable<string | undefined>' ",
    },
    {
      class: 'ProductDetailsTabComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'product$',
      comment:
        "The type of property 'product$: Observable<Product>' changed to: 'product$: Observable<Product | null>' ",
    },
    {
      class: 'ProductIntroComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'ngAfterContentChecked',
      comment:
        "// TODO:Spartacus - Method 'ngAfterContentChecked' was removed from Class 'ProductIntroComponent'. ",
    },
    {
      class: 'ProductIntroComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'product$',
      comment:
        "The type of property 'product$: Observable<Product>' changed to: 'product$: Observable<Product | null>' ",
    },
    {
      class: 'ProductIntroComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'reviewsTabAvailable',
      comment:
        "// TODO:Spartacus - Property 'reviewsTabAvailable' was removed from Class 'ProductIntroComponent'. Use 'areReviewsAvailable$' instead.",
    },
    {
      class: 'ProductListComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'isInfiniteScroll',
      comment:
        "The type of property 'isInfiniteScroll: boolean' changed to: 'isInfiniteScroll: boolean | undefined' ",
    },
    {
      class: 'ProductListComponentService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getQueryFromRouteParams',
      comment:
        "The 'getQueryFromRouteParams' method's signature changed to: 'getQueryFromRouteParams(  { query, categoryCode, brandCode, }: ProductListRouteParams): string | undefined'",
    },
    {
      class: 'ProductReferencesComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'items$',
      comment:
        "The type of property 'items$: Observable<Observable<Product>[]>' changed to: 'items$: Observable<Observable<Product | undefined>[]>' ",
    },
    {
      class: 'ProductReferencesComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'title$',
      comment:
        "The type of property 'title$: Observable<string>' changed to: 'title$: Observable<string | undefined>' ",
    },
    {
      class: 'ProductReviewsComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'product$',
      comment:
        "The type of property 'product$: Observable<Product>' changed to: 'product$: Observable<Product | null>' ",
    },
    {
      class: 'ProductScrollComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'maxProducts',
      comment:
        "The type of property 'maxProducts: number' changed to: 'maxProducts: number | undefined' ",
    },
    {
      class: 'ProductScrollComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'productLimit',
      comment:
        "The type of property 'productLimit: number' changed to: 'productLimit: number | undefined' ",
    },
    {
      class: 'ProductSummaryComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'product$',
      comment:
        "The type of property 'product$: Observable<Product>' changed to: 'product$: Observable<Product | null>' ",
    },
    {
      class: 'ProductViewComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'modeChange',
      comment:
        "The type of property 'modeChange: EventEmitter<string>' changed to: 'modeChange: EventEmitter<ViewModes>' ",
    },
    {
      class: 'ProgressButtonComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'clikEvent',
      comment:
        "// TODO:Spartacus - Property 'clikEvent' was removed from Class 'ProgressButtonComponent'. Use 'clickEvent' instead.",
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
      deprecatedNode: 'replenishmentOrders$',
      comment:
        "The type of property 'replenishmentOrders$: Observable<ReplenishmentOrderList>' changed to: 'replenishmentOrders$: Observable<ReplenishmentOrderList | undefined>' ",
    },
    {
      class: 'ReplenishmentOrderHistoryComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'userReplenishmentOrderService',
      comment:
        "// TODO:Spartacus - Property 'userReplenishmentOrderService' was removed from Class 'ReplenishmentOrderHistoryComponent'. ",
    },
    {
      class: 'RoutingContextService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'injector',
      comment:
        "The type of property 'injector: Injector' changed to: 'injector: UnifiedInjector' ",
    },
    {
      class: 'SaveForLaterComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'cartService',
      comment:
        "The type of property 'cartService: ActiveCartService' changed to: 'cartService: ActiveCartFacade' ",
    },
    {
      class: 'SaveForLaterComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'selectiveCartService',
      comment:
        "The type of property 'selectiveCartService: SelectiveCartService' changed to: 'selectiveCartService: SelectiveCartFacade' ",
    },
    {
      class: 'SearchBoxComponentService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getExactSuggestion',
      comment:
        "The 'getExactSuggestion' method's signature changed to: 'getExactSuggestion(  config: SearchBoxConfig): Observable<string | undefined>'",
    },
    {
      class: 'SearchBoxComponentService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getSearchMessage',
      comment:
        "The 'getSearchMessage' method's signature changed to: 'getSearchMessage(  config: SearchBoxConfig): Observable<string | undefined>'",
    },
    {
      class: 'SearchBoxSuggestionSelectedEvent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'searchSuggestions',
      comment:
        "The type of property 'searchSuggestions: Suggestion[]' changed to: 'searchSuggestions: (Suggestion | string)[]' ",
    },
    {
      class: 'SelectFocusUtility',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'findFirstFocusable',
      comment:
        "The 'findFirstFocusable' method's signature changed to: 'findFirstFocusable(  host: HTMLElement | null | undefined,  config: AutoFocusConfig): HTMLElement | undefined'",
    },
    {
      class: 'SelectFocusUtility',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'findFocusable',
      comment:
        "The 'findFocusable' method's signature changed to: 'findFocusable(  host: HTMLElement | null | undefined,  locked: boolean,  invisible: boolean): HTMLElement[]'",
    },
    {
      class: 'SelectFocusUtility',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'query',
      comment:
        "The 'query' method's signature changed to: 'query(  host: HTMLElement | null | undefined,  selector: string): HTMLElement[]'",
    },
    {
      class: 'SeoMetaService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'pageMetaLinkService',
      comment:
        "The type of property 'pageMetaLinkService: PageMetaLinkService' changed to: 'pageMetaLinkService: PageMetaLinkService | undefined' ",
    },
    {
      class: 'SiteContextComponentService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getContext',
      comment:
        "The 'getContext' method's signature changed to: 'getContext(  context: SiteContextType): Observable<string | undefined>'",
    },
    {
      class: 'SortingComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'selectedLabel',
      comment:
        "The type of property 'selectedLabel: string' changed to: 'selectedLabel: string | undefined' ",
    },
    {
      class: 'SortingComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'selectedOption',
      comment:
        "The type of property 'selectedOption: string' changed to: 'selectedOption: string | undefined' ",
    },
    {
      class: 'SortingComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'sortLabels',
      comment:
        "The type of property 'sortLabels: { [code: string]: string; }' changed to: 'sortLabels: { [code: string]: string; } | null' ",
    },
    {
      class: 'SortingComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'sortOptions',
      comment:
        "The type of property 'sortOptions: SortModel[]' changed to: 'sortOptions: SortModel[] | undefined' ",
    },
    {
      class: 'SplitViewService',
      importPath: '@spartacus/storefront',
      deprecatedNode: '_views$',
      comment:
        "The type of property '_views$: BehaviorSubject<any[]>' changed to: '_views$: BehaviorSubject<SplitViewState[]>' ",
    },
    {
      class: 'StorefrontComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'startNavigating',
      comment:
        "The type of property 'startNavigating: any' changed to: 'startNavigating: boolean' ",
    },
    {
      class: 'StorefrontComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'stopNavigating',
      comment:
        "The type of property 'stopNavigating: any' changed to: 'stopNavigating: boolean' ",
    },
    {
      class: 'TableHeaderCellComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'fieldOptions',
      comment:
        "The type of property 'fieldOptions: TableFieldOptions' changed to: 'fieldOptions: TableFieldOptions | undefined' ",
    },
    {
      class: 'TableHeaderCellComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'header',
      comment:
        "The type of property 'header: string' changed to: 'header: string | undefined' ",
    },
    {
      class: 'TableHeaderCellComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'i18nRoot',
      comment:
        "The type of property 'i18nRoot: string' changed to: 'i18nRoot: string | undefined' ",
    },
    {
      class: 'TableRendererService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getDataOutletContext',
      comment:
        "The 'getDataOutletContext' method's signature changed to: 'getDataOutletContext(  type: string,  options: TableOptions | undefined,  i18nRoot: string,  field: string,  data: any): TableDataOutletContext'",
    },
    {
      class: 'TableRendererService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getDataRenderer',
      comment:
        "The 'getDataRenderer' method's signature changed to: 'getDataRenderer(  structure: TableStructure,  field: string): Type<any> | undefined'",
    },
    {
      class: 'TableRendererService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getHeaderOutletContext',
      comment:
        "The 'getHeaderOutletContext' method's signature changed to: 'getHeaderOutletContext(  type: string,  options: TableOptions | undefined,  i18nRoot: string,  field: string): TableHeaderOutletContext'",
    },
    {
      class: 'TableRendererService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getHeaderRenderer',
      comment:
        "The 'getHeaderRenderer' method's signature changed to: 'getHeaderRenderer(  structure: TableStructure,  field: string): Type<any> | undefined'",
    },
    {
      class: 'TableService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'getTableConfig',
      comment:
        "The 'getTableConfig' method's signature changed to: 'getTableConfig(  type: string,  breakpoint: BREAKPOINT,  defaultStructure: ResponsiveTableConfiguration): TableStructureConfiguration | null'",
    },
    {
      class: 'TabParagraphContainerComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'breakpointService',
      comment:
        "// TODO:Spartacus - Property 'breakpointService' was removed from Class 'TabParagraphContainerComponent'. ",
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
      class: 'ThemeService',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'setTheme',
      comment:
        "The 'setTheme' method's signature changed to: 'setTheme(  theme: string | undefined): void'",
    },
    {
      class: 'ViewComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: '_hidden',
      comment:
        "The type of property '_hidden: any' changed to: '_hidden: boolean | undefined' ",
    },
    {
      class: 'ViewComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'disappeared',
      comment:
        "The type of property 'disappeared: boolean' changed to: 'disappeared: boolean | undefined' ",
    },
    {
      class: 'WishListComponent',
      importPath: '@spartacus/storefront',
      deprecatedNode: 'wishListService',
      comment:
        "// TODO:Spartacus - Property 'wishListService' was removed from Class 'WishListComponent'. ",
    },
    {
      class: 'RegisterComponent',
      importPath: '@spartacus/user/profile/components',
      deprecatedNode: 'anonymousConsent$',
      comment:
        "The type of property 'anonymousConsent$: Observable<{ consent: AnonymousConsent; template: string; }>' changed to: 'anonymousConsent$: Observable<{ consent: AnonymousConsent | undefined; template: string; }>' ",
    },
    {
      class: 'RegisterComponent',
      importPath: '@spartacus/user/profile/components',
      deprecatedNode: 'isConsentGiven',
      comment:
        "The 'isConsentGiven' method's signature changed to: 'isConsentGiven(  consent: AnonymousConsent | undefined): boolean'",
    },
  ];
