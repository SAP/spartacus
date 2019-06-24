import { I18nConfig } from './i18n-config';

export const defaultI18nConfig: I18nConfig = {
  i18n: {
    fallbackLang: false,
    debug: false,
    chunks: {
      common: [
        'common',
        'spinner',
        'searchBox',
        'navigation',
        'sorting',
        'httpHandlers',
        'pageMetaResolver',
        'miniCart',
        'miniLogin',
      ],
      cart: ['cartDetails', 'cartItems', 'orderCost'],
      address: ['addressForm', 'addressBook', 'addressCard'],
      payment: ['paymentForm', 'paymentMethods', 'paymentCard'],
      myAccount: ['orderDetails', 'orderHistory', 'closeAccount'],
      storeFinder: ['storeFinder'],
      pwa: ['pwa'],
      checkout: [
        'checkout',
        'checkoutAddress',
        'checkoutOrderConfirmation',
        'checkoutReview',
        'checkoutShipping',
        'checkoutProgress',
      ],
      product: [
        'productDetails',
        'productList',
        'productFacetNavigation',
        'productSummary',
        'productReview',
        'addToCart',
        'CMSTabParagraphContainer',
      ],
      user: [
        'forgottenPassword',
        'loginForm',
        'register',
        'updateEmailForm',
        'updatePasswordForm',
        'updateProfileForm',
        'consentManagementForm',
      ],
    },
  },
};
