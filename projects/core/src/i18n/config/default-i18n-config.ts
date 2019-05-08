import { I18nConfig } from './i18n-config';

export const defaultI18nConfig: I18nConfig = {
  i18n: {
    fallbackLang: false,
    debug: false,
    chunks: {
      common: 'common',
      spinner: 'common',
      header: 'common',
      searchBox: 'common',

      cartDetails: 'cart',
      cartItems: 'cart',
      orderCost: 'cart',

      addressForm: 'address',
      addressBook: 'address',
      addressCard: 'address',

      paymentForm: 'payment',
      paymentMethods: 'payment',

      checkout: 'checkout',
      checkoutAddress: 'checkout',
      checkoutOrderConfirmation: 'checkout',
      checkoutReview: 'checkout',
      checkoutShipping: 'checkout',

      orderDetails: 'myAccount',
      orderHistory: 'myAccount',
      myInterests: 'myAccount',

      productDetails: 'product',
      productList: 'product',
      productFacetNavigation: 'product',
      productSummary: 'product',
      productReview: 'product',
      addToCart: 'product',

      forgottenPassword: 'user',
      loginForm: 'user',
      login: 'user',
      register: 'user',
      updateEmailForm: 'user',
      updatePasswordForm: 'user',
      updateProfileForm: 'user',

      storeFinder: 'storeFinder',
      pwa: 'pwa',
      common: ['common', 'spinner', 'header', 'searchBox'],
      cart: ['cartDetails', 'cartItems', 'orderCost'],
      address: ['addressForm', 'addressBook', 'addressCard'],
      payment: ['paymentForm', 'paymentMethods'],
      myAccount: ['orderDetails', 'orderHistory'],
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
