import { RoutesConfig, RoutingConfig } from '@spartacus/core';

export const defaultStorefrontRoutesConfig: RoutesConfig = {
  home: { paths: [''] },
  cart: { paths: ['cart'] },
  search: { paths: ['search/:query'] },
  login: { paths: ['login'] },
  register: { paths: ['register'] },
  resetPassword: { paths: ['login/pw/change'] },
  forgotPassword: { paths: ['forgot-password'] },
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
};

export const defaultRoutingConfig: RoutingConfig = {
  routing: {
    routes: defaultStorefrontRoutesConfig,
  },
};
