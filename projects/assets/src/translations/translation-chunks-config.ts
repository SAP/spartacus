export interface TranslationChunksConfig {
  [chunk: string]: string[];
}

export const translationChunksConfig: TranslationChunksConfig = {
  common: [
    'common',
    'spinner',
    'searchBox',
    'navigation',
    'sorting',
    'httpHandlers',
    'pageMetaResolver',
    'miniCart',
    'skipLink',
    'formErrors',
    'errorHandlers',
    'carousel',
  ],
  cart: [
    'cartDetails',
    'cartItems',
    'orderCost',
    'voucher',
    'wishList',
    'saveForLaterItems',
  ],
  address: ['addressForm', 'addressBook', 'addressCard', 'addressSuggestion'],
  payment: ['paymentForm', 'paymentMethods', 'paymentCard', 'paymentTypes'],
  myAccount: [
    'orderDetails',
    'orderHistory',
    'closeAccount',
    'updatePasswordForm',
    'updateProfileForm',
    'consentManagementForm',
    'myCoupons',
    'wishlist',
    'notificationPreference',
    'myInterests',
    'AccountOrderHistoryTabContainer',
    'returnRequestList',
    'returnRequest',
  ],
  pwa: ['pwa'],
  product: [
    'productDetails',
    'productList',
    'productFacetNavigation',
    'productSummary',
    'productReview',
    'addToCart',
    'addToWishList',
    'CMSTabParagraphContainer',
    'stockNotification',
    'TabPanelContainer',
    'itemCounter',
    'productView',
  ],
  user: ['anonymousConsents', 'loginRegister', 'checkoutLogin'],
};
