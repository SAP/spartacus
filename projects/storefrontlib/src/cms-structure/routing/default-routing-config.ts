import { RoutesConfig, RoutingConfig } from '@spartacus/core';

export const defaultStorefrontRoutesConfig: RoutesConfig = {
  home: { paths: [''] },
  notFound: { paths: ['not-found'] },
  cart: { paths: ['cart'] },

  // semantic links for login related pages
  login: {
    paths: ['login'],
    protected: false,
    authFlow: true,
  },
  register: {
    paths: ['login/register'],
    protected: false,
    authFlow: true,
  },
  forgotPassword: {
    paths: ['login/forgot-password'],
    protected: false,
    authFlow: true,
  },
  resetPassword: {
    paths: ['login/pw/change'],
    protected: false,
    authFlow: true,
  },
  logout: { paths: ['logout'], protected: false, authFlow: true },

  // plp routes
  search: { paths: ['search/:query'] },
  category: {
    paths: ['category/:categoryCode'],
    paramsMapping: { categoryCode: 'code' },
  },
  brand: { paths: ['Brands/:brandName/c/:brandCode'] },

  // pdp routes
  product: {
    paths: ['product/:productCode/:name'],
    paramsMapping: { productCode: 'code' },
  },

  termsAndConditions: { paths: ['terms-and-conditions'] },
  orders: {
    paths: ['my-account/orders'],
  },
  orderDetails: {
    paths: ['my-account/order/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  orderGuest: {
    paths: ['guest/order/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  orderReturn: {
    paths: ['my-account/order/return/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  orderReturnConfirmation: {
    paths: ['my-account/order/return/confirmation/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  orderCancel: {
    paths: ['my-account/order/cancel/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  orderCancelConfirmation: {
    paths: ['my-account/order/cancel/confirmation/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  returnRequestDetails: {
    paths: ['my-account/return-request/:returnCode'],
    paramsMapping: { returnCode: 'rma' },
  },
  coupons: { paths: ['my-account/coupons'] },
  couponClaim: {
    paths: ['my-account/coupon/claim/:couponCode'],
    paramsMapping: { couponCode: 'code' },
  },
  replenishmentOrders: {
    paths: ['my-account/my-replenishments'],
  },
  replenishmentDetails: {
    paths: ['my-account/my-replenishment/:replenishmentOrderCode'],
    paramsMapping: { replenishmentOrderCode: 'replenishmentOrderCode' },
  },
};

export const defaultRoutingConfig: RoutingConfig = {
  routing: {
    routes: defaultStorefrontRoutesConfig,
  },
};
