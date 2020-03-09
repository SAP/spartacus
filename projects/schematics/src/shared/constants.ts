export const UTF_8 = 'utf-8';

/***** Imports start *****/
export const ANGULAR_SCHEMATICS = '@schematics/angular';
export const ANGULAR_CORE = '@angular/core';
export const RXJS = 'rxjs';

export const SPARTACUS_CORE = '@spartacus/core';
export const SPARTACUS_STOREFRONTLIB = '@spartacus/storefront';

export const NGRX_STORE = '@ngrx/store';
/***** Imports end *****/

/***** Classes start *****/
export const OBSERVABLE_CLASS = 'Observable';

export const STORE = 'Store';

export const CMS_COMPONENT_DATA_CLASS = 'CmsComponentData';
export const CONFIG_MODULE_CLASS = 'ConfigModule';
export const CMS_CONFIG = 'CmsConfig';
export const CMS_SELECTORS = 'CmsSelectors';
export const CMS_ACTIONS = 'CmsActions';
export const LOAD_CMS_COMPONENT_CLASS = 'LoadCmsComponent';
export const LOAD_CMS_COMPONENT_FAIL_CLASS = 'LoadCmsComponentFail';
export const LOAD_CMS_COMPONENT_SUCCESS_CLASS = 'LoadCmsComponentSuccess';
export const CMS_GET_COMPONENT_FROM_PAGE = 'CmsGetComponentFromPage';
export const USER_ADDRESS_SERVICE = 'UserAddressService';
export const AUTH_SERVICE = 'AuthService';
export const FEATURE_CONFIG_SERVICE = 'FeatureConfigService';
export const PAGE_META_RESOLVER = 'PageMetaResolver';
export const CMS_SERVICE = 'CmsService';
export const PAGE_META_SERVICE = 'PageMetaService';
export const CHECKOUT_SERVICE = 'CheckoutService';
export const CHECKOUT_PAYMENT_SERVICE = 'CheckoutPaymentService';
export const CHECKOUT_DELIVERY_SERVICE = 'CheckoutDeliveryService';
export const CART_DATA_SERVICE = 'CartDataService';
export const CART_SERVICE = 'CartService';
export const ACTIVE_CART_SERVICE = 'ActiveCartService';
export const ADDRESS_BOOK_COMPONENT_SERVICE = 'AddressBookComponentService';
export const CHECKOUT_GUARD = 'CheckoutGuard';
export const CHECKOUT_CONFIG = 'CheckoutConfig';
export const CHECKOUT_CONFIG_SERVICE = 'CheckoutConfigService';
export const EXPRESS_CHECKOUT_SERVICE = 'ExpressCheckoutService';
export const ROUTER = 'Router';
export const ROUTING_CONFIG_SERVICE = 'RoutingConfigService ';
/***** Classes end *****/

/***** Cart removed public api start *****/
export const CART_EFFECTS = 'CartEffects';
export const WISHLIST_EFFECTS = 'WishlistEffects';
export const CART_VOUCHER_EFFECTS = 'CartVoucherEffects';
export const CART_ENTRY_EFFECTS = 'CartEntryEffects';
export const CART_COMBINED_EFFECTS = 'effects';

export const GET_REDUCERS = 'getReducers';
export const REDUCER_TOKEN = 'reducerToken';
export const REDUCER_PROVIDER = 'reducerProvider';
export const CLEAR_CART_STATE = 'clearCartState';
export const META_REDUCERS = 'metaReducers';
export const CLEAR_MULTI_CART_STATE = 'clearMultiCartState';
export const MULTI_CART_META_REDUCERS = 'multiCartMetaReducers';
export const MULTI_CART_REDUCER_TOKEN = 'multiCartReducerToken';
export const GET_MULTI_CART_REDUCERS = 'getMultiCartReducers';
export const MULTI_CART_REDUCER_PROVIDER = 'multiCartReducerProvider';
/***** Cart removed public api end *****/

/***** Properties start *****/
export const CMS_COMPONENT_DATA_PROPERTY_NAME = 'componentData';
/***** Properties end *****/

/***** APIs start *****/
export const TODO_SPARTACUS = 'TODO:Spartacus -';

export const GET_COMPONENT_STATE_OLD_API = 'getComponentState';
export const GET_COMPONENTS_STATE_NEW_API = 'getComponentsState';

export const GET_COMPONENT_ENTITIES_OLD_API = 'getComponentEntities';
export const GET_COMPONENT_ENTITIES_COMMENT = `// ${TODO_SPARTACUS} '${GET_COMPONENT_ENTITIES_OLD_API}' has been removed, please use some of the newer API methods.`;

export const COMPONENT_STATE_SELECTOR_FACTORY_OLD_API =
  'componentStateSelectorFactory';
export const COMPONENTS_STATE_SELECTOR_FACTORY_NEW_API =
  'componentsLoaderStateSelectorFactory';

export const COMPONENT_SELECTOR_FACTORY_OLD_API = 'componentSelectorFactory';
export const COMPONENTS_SELECTOR_FACTORY_NEW_API = 'componentsSelectorFactory';
/***** APIs end *****/
