import { testProductUrl } from '../tabbing-order';

export interface GroupSkipperPageConfig {
  url: string;
  length: number;
}

export interface GroupSkipperConfig {
  [name: string]: GroupSkipperPageConfig;
}

export const groupSkipperConfigNotLoggedIn: GroupSkipperConfig = {
  home: { url: '/', length: 3 },
  login: { url: '/login', length: 3 },
  register: { url: '/login/register', length: 3 },
  termsAndConditiong: { url: '/terms-and-conditions', length: 3 },
  forgotPassword: { url: '/login/forgot-password', length: 3 },
  productList: { url: '/Brands/all/c/brands', length: 4 },
  product: { url: testProductUrl, length: 3 },
  cart: { url: '/cart', length: 3 },
  sale: { url: '/sale', length: 3 },
  contact: { url: '/contact', length: 3 },
  help: { url: '/help', length: 3 },
  storeFinder: { url: '/store-finder', length: 3 },
};

export const groupSkipperConfigMyAccount: GroupSkipperConfig = {
  orderHistory: { url: '/my-account/orders', length: 3 },
  changePassword: { url: '/my-account/update-password', length: 3 },
  personalDetails: { url: '/my-account/update-profile', length: 3 },
  updateEmail: { url: '/my-account/update-email', length: 3 },
  closeAccount: { url: '/my-account/close-account', length: 3 },
  consentManagement: { url: '/my-account/consents', length: 3 },
  addressBook: { url: '/my-account/address-book', length: 3 },
  paymentDetails: { url: '/my-account/payment-details', length: 3 },
};

export const groupSkipperConfigCheckout: GroupSkipperConfig = {
  shippingAddress: { url: '/checkout/shipping-address', length: 3 },
  deliveryMode: { url: '/checkout/delivery-mode', length: 3 },
  paymentDetails: { url: '/checkout/payment-details', length: 3 },
  reviewOrder: { url: '/checkout/review-order', length: 3 },
  orderConfirmation: { url: '/order-confirmation', length: 3 },
};
