import { I18nConfig } from './i18n-config';

export const defaultI18nConfig: I18nConfig = {
  i18n: {
    fallbackLang: false,
    debug: false,
    chunks: {
      common: ['common', 'spinner', 'header', 'searchBox'],
      cart: ['cartDetails', 'cartItems', 'orderCost'],
      address: ['addressForm', 'addressBook', 'addressCard'],
      payment: ['paymentForm', 'paymentMethods'],
      myAccount: ['orderDetails', 'orderHistory', 'myInterests'],
      storeFinder: ['storeFinder'],
      pwa: ['pwa'],
      checkout: [
        'checkout',
        'checkoutAddress',
        'checkoutOrderConfirmation',
        'checkoutReview',
        'checkoutShipping',
      ],
      product: [
        'productDetails',
        'productList',
        'productFacetNavigation',
        'productSummary',
        'productReview',
        'addToCart',
        'stockNotification',
      ],
      user: [
        'forgottenPassword',
        'loginForm',
        'login',
        'register',
        'updateEmailForm',
        'updatePasswordForm',
        'updateProfileForm',
      ],
    },
  },
};
