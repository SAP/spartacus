import { RoutesConfig, RoutingConfig } from '@spartacus/core';

export const defaultStorefrontRoutesConfig: RoutesConfig = {
  home: { paths: [''] },
  notFound: { paths: ['not-found'] },
  cart: { paths: ['cart'] },
  search: { paths: ['search/:query'] },

  // semantic links for login related pages
  login: { paths: ['login'] },
  logout: { paths: ['logout'] },
  register: { paths: ['login/register'] },
  forgotPassword: { paths: ['login/forgot-password'] },

  checkout: { paths: ['checkout'] },
  checkoutShippingAddress: { paths: ['checkout/shipping-address'] },
  checkoutDeliveryMode: { paths: ['checkout/delivery-mode'] },
  checkoutPaymentDetails: { paths: ['checkout/payment-details'] },
  checkoutReviewOrder: { paths: ['checkout/review-order'] },
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
    paths: ['my-account/order/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  orders: {
    paths: ['my-account/orders'],
  },
};

export const defaultRoutingConfig: RoutingConfig = {
  routing: {
    routes: defaultStorefrontRoutesConfig,
  },
};
