import { I18nConfig } from './i18n-config';

export const defaultI18nConfig: I18nConfig = {
  i18n: {
    fallbackLang: false,
    debug: false,
    namespaceMapping: {
      common: 'common',
      storeFinder: 'storeFinder',
      pwa: 'pwa',

      spinner: 'ui',
      header: 'ui',

      addressBook: 'cmsLib',
      addressCard: 'cmsLib',
      searchBox: 'cmsLib',

      addToCart: 'cart',
      cartDetails: 'cart',
      cartItems: 'cart',
      orderCost: 'cart',

      address: 'checkout',
      checkout: 'checkout',
      checkoutAddress: 'checkout',
      checkoutOrderConfirmation: 'checkout',
      checkoutReview: 'checkout',
      checkoutShipping: 'checkout',
      payment: 'checkout',

      orderDetails: 'myAccount',
      orderHistory: 'myAccount',
      paymentMethods: 'myAccount',

      productDetails: 'product',
      productList: 'product',
      productFacetNavigation: 'product',
      productSummary: 'product',
      productReview: 'product',

      forgottenPassword: 'user',
      loginForm: 'user',
      login: 'user',
      register: 'user',
    },
  },
};
