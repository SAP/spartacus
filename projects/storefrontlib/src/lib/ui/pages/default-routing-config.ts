import { RoutesConfig, RoutingConfig } from '@spartacus/core';

export const defaultStorefrontRoutesConfig: RoutesConfig = {
  home: { paths: [''] },
  cart: { paths: ['cart'] },
  search: { paths: ['search/:query'] },

  // semantic links for login related pages
  login: { paths: ['login'] },
  register: { paths: ['login/register'] },
  forgotPassword: { paths: ['login/forgot-password'] },

  checkout: { paths: ['checkout'] },
  orderConfirmation: { paths: ['order-confirmation'] },
  product: {
    paths: ['product/:productCode'],
    paramsMapping: { productCode: 'code' },
  },
  category: {
    paths: ['category/:categoryCode'],
    paramsMapping: { categoryCode: 'code' },
  },
  brand: { paths: ['Brands/:brandName/c/:brandCode'] },
  termsAndConditions: { paths: ['termsAndConditions'] },
  orderDetails: {
    paths: ['my-account/orders/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  notificationPreference: { paths: ['my-account/notification-preference'] },
  addressBook: { paths: ['my-account/address-book'] },
  updatePassword: { paths: ['my-account/update-password'] },
  paymentManagement: { paths: ['my-account/payment-details'] },
  updateEmail: { paths: ['my-account/update-email'] },
  updateProfile: { paths: ['my-account/update-profile'] },
  closeAccount: { paths: ['my-account/close-account'] },
  myInterests: { paths: ['my-account/my-interests'] },
};

export const defaultRoutingConfig: RoutingConfig = {
  routing: {
    routes: defaultStorefrontRoutesConfig,
  },
};
