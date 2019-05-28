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
