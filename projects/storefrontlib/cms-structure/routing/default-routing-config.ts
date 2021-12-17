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

  /** @deprecated since 4.2, use order lib instead */
  orders: {
    paths: ['my-account/orders'],
  },
  /** @deprecated since 4.2, use order lib instead */
  orderDetails: {
    paths: ['my-account/order/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  /** @deprecated since 4.2, use order lib instead */
  orderGuest: {
    paths: ['guest/order/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  /** @deprecated since 4.2, use order lib instead */
  orderReturn: {
    paths: ['my-account/order/return/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  /** @deprecated since 4.2, use order lib instead */
  orderReturnConfirmation: {
    paths: ['my-account/order/return/confirmation/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  /** @deprecated since 4.2, use order lib instead */
  orderCancel: {
    paths: ['my-account/order/cancel/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  /** @deprecated since 4.2, use order lib instead */
  orderCancelConfirmation: {
    paths: ['my-account/order/cancel/confirmation/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  /** @deprecated since 4.2, use order lib instead */
  returnRequestDetails: {
    paths: ['my-account/return-request/:returnCode'],
    paramsMapping: { returnCode: 'rma' },
  },
  coupons: { paths: ['my-account/coupons'] },
  couponClaim: {
    paths: ['my-account/coupon/claim/:couponCode'],
    paramsMapping: { couponCode: 'code' },
  },
  /** @deprecated since 4.2, use order lib instead */
  replenishmentOrders: {
    paths: ['my-account/my-replenishments'],
  },
  /** @deprecated since 4.2, use order lib instead */
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
