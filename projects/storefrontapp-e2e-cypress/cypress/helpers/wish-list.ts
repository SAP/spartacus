import { cheapProduct, user } from '../sample-data/checkout-flow';
import { login, register } from './auth-forms';
import * as checkoutAsPersistentUser from './checkout-as-persistent-user';
import * as checkout from './checkout-flow';
import { waitForPage } from './checkout-flow';
import {
  AddressData,
  fillPaymentDetails,
  fillShippingAddress,
  PaymentDetails,
} from './checkout-forms';
import { generateMail, randomString } from './user';

interface TestProduct {
  code: string;
  type?: string;
  name?: string;
  price?: number;
}

export const products: TestProduct[] = [
  {
    code: '1934793',
    name: 'PowerShot A480',
  },
  cheapProduct,
  {
    code: '779841',
    name: 'FUN Flash Single Use Camera',
  },
];

export const WishListUser = {
  user: 'standard',
  registrationData: {
    firstName: 'Winston',
    lastName: 'Rumfoord',
    password: 'Password123.',
    titleCode: 'mr',
    email: generateMail(randomString(), true),
  },
};

function registerWishListUser() {
  register({ ...WishListUser.registrationData });
  cy.url().should('not.contain', 'register');
}

function loginWishListUser() {
  login(
    WishListUser.registrationData.email,
    WishListUser.registrationData.password
  );
  cy.url().should('not.contain', 'login');
}

export function waitForGetWishList() {
  cy.server();

  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/*/carts/*?fields=*&lang=en&curr=USD`
  ).as('get_wish_list');
}

export function addToWishListAnonymous(product: TestProduct) {
  const productPage = waitForPage(product.code, 'productPage');

  cy.visit(`/product/${product.code}`);

  cy.wait(`@${productPage}`);

  cy.get('cx-add-to-wishlist .button-add-link').click({ force: true });

  cy.get('cx-breadcrumb > h1').should('contain', 'Login');

  cy.get('cx-login-register .btn-register').click({ force: true });

  registerWishListUser();

  loginWishListUser();

  cy.get('cx-product-intro > .code').should('contain', `${product.code}`);
}

export function addToWishListFromPage() {
  waitForGetWishList();

  cy.get('cx-add-to-wishlist .button-add').click({ force: true });

  cy.wait('@get_wish_list');
}

export function addToWishList(product: TestProduct) {
  const productPage = waitForPage(product.code, 'productPage');

  cy.visit(`/product/${product.code}`);

  cy.wait(`@${productPage}`);

  waitForGetWishList();

  cy.get('cx-add-to-wishlist .button-add').click({ force: true });

  cy.wait('@get_wish_list');
}

export function verifyProductInWishListPdp() {
  cy.get('cx-add-to-wishlist .button-remove').should('exist');
}

export function verifyProductNotInWishListPdp() {
  cy.get('cx-add-to-wishlist .button-add').should('exist');
}

export function verifyProductInWishList(product: TestProduct) {
  cy.selectUserMenuOption({
    option: 'Wish List',
  });

  getWishListItem(product.name).within(() => {
    cy.get('.cx-code').should('contain', product.code);
  });
}

export function removeProductFromWishListPage(product: TestProduct) {
  waitForGetWishList();
  getWishListItem(product.name).within(() => {
    cy.get('.cx-return-button>button').click({ force: true });
  });
  cy.wait('@get_wish_list');
  getWishListItem(product.name).should('not.exist');
}

export function removeProductFromPdp() {
  waitForGetWishList();

  cy.get('cx-add-to-wishlist .button-remove').click({ force: true });

  cy.wait('@get_wish_list');

  verifyProductNotInWishListPdp();
}

export function addProductToCart(product: TestProduct) {
  cy.server();

  cy.route(
    'POST',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/*/carts/*/entries?code=*&qty=*&lang=en&curr=USD`
  ).as('add_to_cart');

  getWishListItem(product.name).within(() => {
    cy.get('cx-add-to-cart button').click();
  });

  cy.wait('@add_to_cart');

  const cartPage = waitForPage('/cart', 'getCartPage');

  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-dialog-buttons>.btn-primary').click({ force: true });
  });

  cy.wait(`@${cartPage}`);

  getCartItem(product.name).within(() => {
    cy.get('.cx-code').should('contain', product.code);
    cy.get('cx-item-counter input').should('have.value', '1');
  });
}

export function checkWishListPersisted(product: TestProduct) {
  cy.selectUserMenuOption({
    option: 'Sign Out',
  });

  cy.findByText(/Sign in \/ Register/i).click();

  loginWishListUser();

  verifyProductInWishList(product);

  goToProductPage(product);

  verifyProductInWishListPdp();
}

export function goToProductPage(product: TestProduct) {
  const productPage = waitForPage(product.code, 'productPage');
  getWishListItem(product.name).within(() => {
    cy.get('.cx-name>.cx-link').click({ force: true });
  });
  cy.wait(`@${productPage}`);
}

export function checkoutFromWishList(checkoutProducts: TestProduct[]) {
  goToCartAndCheckout(checkoutProducts);
  proceedToCheckout();
  fillAddressForm();
  checkout.verifyDeliveryMethod();
  fillPaymentForm();
  placeOrderWithProducts(checkoutProducts);
  verifyOrderConfirmationPage(checkoutProducts);
}

export function checkoutFromCart(checkoutProducts: TestProduct[]) {
  goToCartAndCheckout(checkoutProducts);
  checkoutAsPersistentUser.selectShippingAddress();
  checkoutAsPersistentUser.selectDeliveryMethod();
  checkoutAsPersistentUser.selectPaymentMethod();
  placeOrderWithProducts(checkoutProducts);
  verifyOrderConfirmationPage(checkoutProducts);
}

function goToCartAndCheckout(checkoutProducts: TestProduct[]) {
  const cartPage = waitForPage('/cart', 'getCartPage');
  cy.visit('/cart');
  cy.wait(`@${cartPage}`);

  for (const product of checkoutProducts) {
    cy.get('cx-cart-item-list').contains('cx-cart-item', product.code);
  }
}

function proceedToCheckout() {
  const shippingAddressPage = waitForPage(
    '/checkout/shipping-address',
    'getShippingAddressPage'
  );
  cy.findByText(/proceed to checkout/i).click();
  cy.wait(`@${shippingAddressPage}`).its('status').should('eq', 200);
}

function fillAddressForm(shippingAddressData: AddressData = user) {
  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  const deliveryPage = waitForPage(
    '/checkout/delivery-mode',
    'getDeliveryPage'
  );
  fillShippingAddress(shippingAddressData);
  cy.wait(`@${deliveryPage}`).its('status').should('eq', 200);
}

function fillPaymentForm(
  paymentDetailsData: PaymentDetails = user,
  billingAddress?: AddressData
) {
  cy.get('.cx-checkout-title').should('contain', 'Payment');
  const reviewPage = waitForPage('/checkout/review-order', 'getReviewPage');
  fillPaymentDetails(paymentDetailsData, billingAddress);
  cy.wait(`@${reviewPage}`).its('status').should('eq', 200);
}

function placeOrderWithProducts(checkoutProducts: TestProduct[]) {
  cy.get('.cx-review-title').should('contain', 'Review');

  for (const product of checkoutProducts) {
    cy.get('cx-cart-item-list').contains('cx-cart-item', product.code);
  }

  cy.findByText('Terms & Conditions')
    .should('have.attr', 'target', '_blank')
    .should(
      'have.attr',
      'href',
      `/${Cypress.env('BASE_SITE')}/en/USD/terms-and-conditions`
    );
  cy.get('.form-check-input').check();
  const orderConfirmationPage = waitForPage(
    '/order-confirmation',
    'getOrderConfirmationPage'
  );
  cy.get('cx-place-order button.btn-primary').click();
  cy.wait(`@${orderConfirmationPage}`).its('status').should('eq', 200);
}

function verifyOrderConfirmationPage(checkoutProducts: TestProduct[]) {
  cy.get('.cx-page-title').should('contain', 'Confirmation of Order');
  cy.get('h2').should('contain', 'Thank you for your order!');

  for (const product of checkoutProducts) {
    cy.get('cx-cart-item-list').contains('cx-cart-item', product.code);
  }
}

function getCartItem(name: string) {
  return cy.get('cx-cart-item-list').contains('cx-cart-item', name);
}

function getWishListItem(name: string) {
  return cy.get('cx-wish-list').contains('cx-wish-list-item', name);
}
