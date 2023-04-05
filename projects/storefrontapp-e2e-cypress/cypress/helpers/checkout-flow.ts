/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { products } from '../sample-data/apparel-checkout-flow';
import {
  cart,
  cartWithCheapProduct,
  cheapProduct,
  product,
  SampleCartProduct,
  SampleProduct,
  SampleUser,
  user,
} from '../sample-data/checkout-flow';
import { addProductToCart as addToCart } from './applied-promotions';
import { login, register } from './auth-forms';
import {
  AddressData,
  fillPaymentDetails,
  fillShippingAddress,
  PaymentDetails,
} from './checkout-forms';
import { DeepPartial } from './form';
import { productItemSelector } from './product-search';

export const ELECTRONICS_BASESITE = 'electronics-spa';
export const ELECTRONICS_CURRENCY = 'USD';

export const GET_CHECKOUT_DETAILS_ENDPOINT_ALIAS = 'GET_CHECKOUT_DETAILS';
export const firstAddToCartSelector = `${productItemSelector} cx-add-to-cart:first`;

export function interceptCheckoutB2CDetailsEndpoint(newAlias?: string) {
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/**/carts/**/*?fields=deliveryAddress(FULL),deliveryMode(FULL),paymentInfo(FULL)*`
  ).as(newAlias ?? GET_CHECKOUT_DETAILS_ENDPOINT_ALIAS);

  return newAlias ?? GET_CHECKOUT_DETAILS_ENDPOINT_ALIAS;
}

/**
 * Clicks the main menu (on mobile only)
 */
export function clickHamburger() {
  cy.onMobile(() => {
    cy.get('cx-hamburger-menu [aria-label="Menu"]').click();
  });
}

/**
 * Creates a routing alias for a given page
 * @param page Suffix of the url (page) to wait for
 * @param alias Name of the routing alias to obtain
 * @returns a Routing alias
 */
export function waitForPage(page: string, alias: string): string {
  // homepage is not explicitly being asked as it's driven by the backend.
  const route =
    page === 'homepage'
      ? {
          method: 'GET',
          path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
            'BASE_SITE'
          )}/cms/pages?lang=en&curr=*`,
        }
      : {
          method: 'GET',
          pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
            'BASE_SITE'
          )}/cms/pages`,
          query: {
            pageLabelOrId: page,
          },
        };
  cy.intercept(route).as(alias);
  return alias;
}

export function waitForProductPage(productCode: string, alias: string): string {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/pages`,
    query: {
      pageType: 'ProductPage',
      code: productCode,
    },
  }).as(alias);
  return alias;
}

export function waitForCategoryPage(
  categoryCode: string,
  alias: string
): string {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/pages`,
    query: {
      pageType: 'CategoryPage',
      code: categoryCode,
    },
  }).as(alias);
  return alias;
}

/**
 * Visits the homepage and waits for corresponding xhr call
 * @param queryStringParams Query string params
 */
export function visitHomePage(queryStringParams?: string) {
  const homePageAlias = waitForPage('homepage', 'getHomePage');

  if (queryStringParams) {
    cy.visit(`/?${queryStringParams}`);
  } else {
    cy.visit('/');
  }
  cy.wait(`@${homePageAlias}`);
}

export function signOut() {
  cy.selectUserMenuOption({
    option: 'Sign Out',
  });
  cy.get('cx-global-message div').should(
    'contain',
    'You have successfully signed out.'
  );
  cy.get('cx-page-slot.Section1 cx-banner');
}

export function registerUser(
  giveRegistrationConsent: boolean = false,
  sampleUser: SampleUser = user
) {
  const loginPage = waitForPage('/login', 'getLoginPage');
  cy.findByText(/Sign in \/ Register/i).click();
  cy.wait(`@${loginPage}`);

  const registerPage = waitForPage('/login/register', 'getRegisterPage');
  cy.findByText('Register').click();
  cy.wait(`@${registerPage}`);

  register(sampleUser, giveRegistrationConsent);
  cy.get('cx-breadcrumb').contains('Login');
  return sampleUser;
}

export function signInUser(sampleUser: SampleUser = user) {
  const loginPage = waitForPage('/login', 'getLoginPage');
  cy.findByText(/Sign in \/ Register/i).click();
  cy.wait(`@${loginPage}`);
  login(sampleUser.email, sampleUser.password);
}

export function signOutUser() {
  const logoutPage = waitForPage('/logout', 'getLogoutPage');
  signOut();
  cy.wait(`@${logoutPage}`);
  cy.get('.cx-login-greet').should('not.exist');
}

export function goToProductDetailsPage() {
  cy.visit('/');
  // click big banner
  cy.get('.Section1 cx-banner').first().find('img').click({ force: true });
  // click small banner number 6 (would be good if label or alt text would be available)
  cy.get('.Section2 cx-banner:nth-of-type(6) img').click({ force: true });
  cy.get('cx-product-intro').within(() => {
    cy.get('.code').should('contain', product.code);
  });
  cy.get('cx-breadcrumb').within(() => {
    cy.get('h1').should('contain', product.name);
  });
}

export function addProductToCart() {
  cy.get('cx-item-counter').findByText('+').click();
  addToCart();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-name .cx-link').should('contain', product.name);
    cy.findByText(/proceed to checkout/i).click();
  });
}

export function loginUser(sampleUser: SampleUser = user) {
  login(sampleUser.email, sampleUser.password);
}

export function fillAddressForm(shippingAddressData: AddressData = user) {
  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-row')
    .first()
    .find('.cx-summary-amount')
    .should('contain', cart.total);

  fillShippingAddress(shippingAddressData);

  const deliveryPage = waitForPage(
    '/checkout/delivery-mode',
    'getDeliveryPage'
  );
  cy.wait(`@${deliveryPage}`).its('response.statusCode').should('eq', 200);

  /**
   * Delivery mode PUT intercept is not in verifyDeliveryMethod()
   * because it doesn't choose a delivery mode and the intercept might have missed timing depending on cypress's performance
   */
  cy.intercept({
    method: 'PUT',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/**/deliverymode?deliveryModeId=*`,
  }).as('putDeliveryMode');
  cy.wait('@putDeliveryMode').its('response.statusCode').should('eq', 200);

  const getCheckoutDetailsAlias = interceptCheckoutB2CDetailsEndpoint();
  cy.wait(`@${getCheckoutDetailsAlias}`);
}

export function verifyDeliveryMethod() {
  cy.log('🛒 Selecting delivery method');

  cy.get('.cx-checkout-title').should('contain', 'Delivery Method');

  cy.get('cx-delivery-mode input').first().should('be.checked');

  const paymentPage = waitForPage(
    '/checkout/payment-details',
    'getPaymentPage'
  );
  cy.get('.cx-checkout-btns button.btn-primary')
    .should('be.enabled')
    .click({ force: true });
  cy.wait(`@${paymentPage}`).its('response.statusCode').should('eq', 200);
}

export function fillPaymentForm(
  paymentDetailsData: PaymentDetails = user,
  billingAddress?: AddressData
) {
  cy.get('.cx-checkout-title').should('contain', 'Payment');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-total')
    .find('.cx-summary-amount')
    .should('not.be.empty');
  fillPaymentDetails(paymentDetailsData, billingAddress);

  const getCheckoutDetailsAlias = interceptCheckoutB2CDetailsEndpoint();
  cy.wait(`@${getCheckoutDetailsAlias}`);
}

export function verifyItemsToBeShipped() {
  cy.get('.cx-review-header').should('contain', 'Items to be Shipped');
}

export function verifyReviewOrderPage() {
  cy.contains('Cart total');
}

export function placeOrder() {
  verifyReviewOrderPage();
  cy.get('.cx-review-summary-card')
    .contains('cx-card', 'Ship To')
    .find('.cx-card-container')
    .within(() => {
      cy.findByText(user.fullName);
      cy.findByText(user.address.line1);
      cy.findByText(user.address.line2);
    });
  cy.get('.cx-review-summary-card')
    .contains('cx-card', 'Delivery Method')
    .find('.cx-card-container')
    .within(() => {
      cy.findByText('Standard Delivery');
    });
  cy.get('cx-order-summary .cx-summary-row .cx-summary-amount')
    .eq(0)
    .should('contain', cart.total);
  cy.get('cx-order-summary .cx-summary-row .cx-summary-amount')
    .eq(1)
    .should('not.be.empty');
  cy.get('cx-order-summary .cx-summary-total .cx-summary-amount').should(
    'not.be.empty'
  );
  cy.findByText('Terms & Conditions')
    .should('have.attr', 'target', '_blank')
    .should(
      'have.attr',
      'href',
      `/${Cypress.env('BASE_SITE')}/en/USD/terms-and-conditions`
    );
  cy.get('.form-check-input').check();
  cy.get('cx-place-order button.btn-primary').click();
}

export function viewOrderHistory() {
  cy.selectUserMenuOption({
    option: 'Order History',
  });
  cy.get('cx-order-history h2').should('contain', 'Order history');
  cy.get('.cx-order-history-table tr')
    .first()
    .find('.cx-order-history-total .cx-order-history-value')
    .should('not.be.empty');
}

export function clickCheckoutButton() {
  cy.findByText(/proceed to checkout/i).click();
}

export function goToPaymentDetails() {
  cy.get('cx-checkout-progress li:nth-child(3) > a').click();
}

export function clickAddNewPayment() {
  cy.findByText('Add New Payment').click();
}

export function goToCheapProductDetailsPage(
  sampleProduct: SampleProduct = cheapProduct
) {
  visitHomePage();
  clickCheapProductDetailsFromHomePage(sampleProduct);
}

export function clickCheapProductDetailsFromHomePage(
  sampleProduct: SampleProduct = cheapProduct
) {
  const productPage = waitForProductPage(sampleProduct.code, 'getProductPage');
  cy.get('.Section4 cx-banner').first().find('img').click({ force: true });
  cy.wait(`@${productPage}`).its('response.statusCode').should('eq', 200);
  cy.get('cx-product-intro').within(() => {
    cy.get('.code').should('contain', sampleProduct.code);
  });
  cy.get('cx-breadcrumb').within(() => {
    cy.get('h1').should('contain', sampleProduct.name);
  });
}

export function addCheapProductToCartAndLogin(
  sampleUser: SampleUser = user,
  sampleProduct: SampleProduct = cheapProduct
) {
  addCheapProductToCart(sampleProduct);
  const loginPage = waitForPage('/login', 'getLoginPage');
  cy.findByText(/proceed to checkout/i).click();
  cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);

  const deliveryAddressPage = waitForPage(
    '/checkout/delivery-address',
    'getDeliveryPage'
  );
  loginUser(sampleUser);
  // Double timeout, because we have here a cascade of requests (login, load /checkout page, merge cart, load shipping page)
  cy.wait(`@${deliveryAddressPage}`, { timeout: 30000 })
    .its('response.statusCode')
    .should('eq', 200);
}

export function addCheapProductToCartAndProceedToCheckout(
  sampleProduct: SampleProduct = cheapProduct
) {
  addCheapProductToCart(sampleProduct);
  const loginPage = waitForPage('/login', 'getLoginPage');
  cy.findByText(/proceed to checkout/i).click();
  cy.wait(`@${loginPage}`);
}

export function addCheapProductToCartAndBeginCheckoutForSignedInCustomer(
  sampleProduct: SampleProduct = cheapProduct
) {
  addCheapProductToCart(sampleProduct);

  const deliveryAddressPage = waitForPage(
    '/checkout/delivery-address',
    'getDeliveryAddressPage'
  );
  cy.findByText(/proceed to checkout/i).click();
  cy.wait(`@${deliveryAddressPage}`)
    .its('response.statusCode')
    .should('eq', 200);
}

export function addCheapProductToCart(
  sampleProduct: SampleProduct = cheapProduct
) {
  addToCart();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-name .cx-link').should('contain', sampleProduct.name);
  });
}

export function proceedWithEmptyShippingAdressForm() {
  cy.log('🛒 Trying to proceed with empty address form');

  fillShippingAddress(null);
  cy.get('cx-form-errors').should('exist');
}

export function proceedWithIncorrectShippingAddressForm(
  shippingAddressData: Partial<AddressData> = user
) {
  cy.log('🛒 Trying to proceed with incorrect address form');

  fillShippingAddress(shippingAddressData);
  cy.get('cx-form-errors').should('exist');
}

export function checkSummaryAmount(
  cartData: SampleCartProduct = cartWithCheapProduct
) {
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-total')
    .find('.cx-summary-amount')
    .should('contain', cartData.total);
}

export function fillAddressFormWithCheapProduct(
  shippingAddressData: Partial<AddressData> = user
) {
  cy.log('🛒 Filling shipping address form');

  /**
   * Delivery mode PUT intercept is not in verifyDeliveryMethod()
   * because it doesn't choose a delivery mode and the intercept might have missed timing depending on cypress's performance
   */
  const getCheckoutDetailsAlias = interceptCheckoutB2CDetailsEndpoint();
  cy.intercept({
    method: 'PUT',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/**/deliverymode?deliveryModeId=*`,
  }).as('putDeliveryMode');

  const deliveryModePage = waitForPage(
    '/checkout/delivery-mode',
    'getDeliveryModePage'
  );
  fillShippingAddress(shippingAddressData);
  cy.wait(`@${deliveryModePage}`).its('response.statusCode').should('eq', 200);

  cy.wait('@putDeliveryMode').its('response.statusCode').should('eq', 200);
  cy.wait(`@${getCheckoutDetailsAlias}`);
}

export function proceedWithEmptyPaymentForm() {
  cy.log('🛒 Trying to proceed with empty payment method form');

  fillPaymentDetails(null);
  cy.get('cx-form-errors').should('exist');
}

export function proceedWithIncorrectPaymentForm(
  paymentDetailsData: Partial<PaymentDetails> = user
) {
  cy.log('🛒 Trying to proceed with incorrect payment method form');

  fillPaymentDetails(paymentDetailsData);
  cy.get('cx-form-errors').should('exist');
}

export function fillPaymentFormWithCheapProduct(
  paymentDetailsData: DeepPartial<PaymentDetails> = user,
  billingAddress?: AddressData
) {
  cy.log('🛒 Filling payment method form');
  cy.get('.cx-checkout-title').should('contain', 'Payment');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-total')
    .find('.cx-summary-amount')
    .should('not.be.empty');

  const reviewPage = waitForPage('/checkout/review-order', 'getReviewPage');

  cy.intercept({
    method: 'POST',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/**/payment/sop/response*`,
  }).as('submitPayment');
  const getCheckoutDetailsAlias = interceptCheckoutB2CDetailsEndpoint(
    'GET_CHECKOUT_DETAILS_AFTER_PAYMENT_STEP'
  );

  fillPaymentDetails(paymentDetailsData, billingAddress);
  cy.log('submitPayment timestamp: ', new Date().toISOString());
  cy.wait('@submitPayment');
  cy.log('reviewPage timestamp: ', new Date().toISOString());
  cy.wait(`@${reviewPage}`);

  cy.wait(`@${getCheckoutDetailsAlias}`).then((xhr) => {
    const response = xhr.response;
    cy.log(
      `Checkout details after payment step: ${JSON.stringify(
        response.body,
        null,
        2
      )}`
    );

    expect(response.statusCode).to.equal(200);

    expect(response.body).to.have.property('deliveryAddress');
    expect(response.body).to.have.property('deliveryMode');
    expect(response.body).to.have.property('paymentInfo');
  });
}

export function placeOrderWithCheapProduct(
  sampleUser: SampleUser = user,
  cartData: SampleCartProduct = cartWithCheapProduct,
  currency: string = 'USD'
) {
  cy.log('🛒 Placing order');
  verifyReviewOrderPage();
  verifyItemsToBeShipped();
  cy.get('.cx-review-summary-card')
    .contains('cx-card', 'Ship To')
    .find('.cx-card-container')
    .within(() => {
      cy.findByText(sampleUser.fullName);
      cy.findByText(sampleUser.address.line1);
      cy.findByText(sampleUser.address.line2);
    });
  cy.get('.cx-review-summary-card')
    .contains('cx-card', 'Delivery Method')
    .find('.cx-card-container')
    .within(() => {
      cy.findByText('Standard Delivery');
    });
  cy.get('cx-order-summary .cx-summary-row .cx-summary-amount')
    .eq(0)
    .should('contain', cartData.total);
  cy.get('cx-order-summary .cx-summary-row .cx-summary-amount')
    .eq(1)
    .should('contain', cartData.estimatedShipping);
  cy.get('cx-order-summary .cx-summary-total .cx-summary-amount').should(
    'not.be.empty'
  );
  cy.findByText('Terms & Conditions')
    .should('have.attr', 'target', '_blank')
    .should(
      'have.attr',
      'href',
      `/${Cypress.env('BASE_SITE')}/en/${currency}/terms-and-conditions`
    );
  cy.get('input[formcontrolname="termsAndConditions"]').check();
  const orderConfirmationPage = waitForPage(
    '/order-confirmation',
    'getOrderConfirmationPage'
  );
  cy.get('cx-place-order button.btn-primary').should('be.enabled').click();
  cy.wait(`@${orderConfirmationPage}`)
    .its('response.statusCode')
    .should('eq', 200);
}

export function verifyOrderConfirmationPageWithCheapProduct(
  sampleUser: SampleUser = user,
  sampleProduct: SampleProduct = cheapProduct,
  isApparel: boolean = false
) {
  cy.get('.cx-page-title').should('contain', 'Confirmation of Order');
  cy.get('h2').should('contain', 'Thank you for your order!');

  cy.get('cx-order-confirmation-shipping').within(() => {
    cy.get('.cx-review-header').should('contain', 'Items to be Shipped');

    cy.get('.cx-review-summary-card-container')
      .eq(0)
      .should('contain', sampleUser.fullName);
    cy.get('.cx-review-summary-card-container')
      .eq(0)
      .should('contain', sampleUser.address.line1);
    cy.get('.cx-review-summary-card-container')
      .eq(1)
      .should('contain', 'Standard Delivery');

    if (!isApparel) {
      cy.get('.cx-item-list-row .cx-code').should(
        'contain',
        sampleProduct.code
      );
    } else {
      cy.get('.cx-item-list-row .cx-code')
        .should('have.length', products.length)
        .each((_, index) => {
          console.log('products', products[index]);
          cy.get('.cx-item-list-row .cx-code').should(
            'contain',
            products[index].code
          );
        });
    }
  });

  cy.get('cx-order-detail-billing').within(() => {
    cy.get('.cx-review-summary-card').eq(0).should('contain', 'Payment');
    cy.get('.cx-review-summary-card')
      .eq(1)
      .should('contain', 'Billing address');
  });

  cy.get('cx-order-summary .cx-summary-amount').should('not.be.empty');
}

export function viewOrderHistoryWithCheapProduct() {
  const orderHistoryPage = waitForPage(
    '/my-account/orders',
    'getOrderHistoryPage'
  );
  cy.selectUserMenuOption({
    option: 'Order History',
  });
  cy.wait(`@${orderHistoryPage}`).its('response.statusCode').should('eq', 200);
  cy.get('cx-order-history h2').should('contain', 'Order history');
  cy.get('.cx-order-history-table tr')
    .first()
    .find('.cx-order-history-total .cx-order-history-value')
    .should('not.be.empty');
}

export function addFirstResultToCartFromSearchAndLogin(sampleUser: SampleUser) {
  addToCart();
  const loginPage = waitForPage('/login', 'getLoginPage');
  cy.findByText(/proceed to checkout/i).click();
  cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);

  const deliveryAddressPage = waitForPage(
    '/checkout/delivery-address',
    'getDeliveryAddressPage'
  );
  loginUser(sampleUser);
  cy.wait(`@${deliveryAddressPage}`, { timeout: 30000 })
    .its('response.statusCode')
    .should('eq', 200);
}

export function checkoutFirstDisplayedProduct(user: SampleUser) {
  cy.intercept(
    'POST',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/*/carts/*/entries?lang=en&curr=USD`
  ).as('addToCart');

  cy.intercept(
    'POST',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/carts?fields*`
  ).as('carts');

  addFirstResultToCartFromSearchAndLogin(user);

  cy.wait('@addToCart').its('response.statusCode').should('eq', 200);
  cy.wait('@carts').its('response.statusCode').should('eq', 201);

  cy.get('@carts').then((xhr: any) => {
    const cartData = { total: xhr.response.body.totalPrice.formattedValue };
    const code = xhr.response.body.code;
    checkSummaryAmount(cartData);
    proceedWithEmptyShippingAdressForm();
    proceedWithIncorrectShippingAddressForm({
      ...user,
      firstName: '',
    });

    cy.intercept(
      'GET',
      `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/carts/${code}?fields=DEFAULT*`
    ).as('userCart');

    fillAddressFormWithCheapProduct({ firstName: user.firstName });

    cy.wait('@userCart').its('response.statusCode').should('eq', 200);

    verifyDeliveryMethod();
    fillPaymentFormWithCheapProduct(user as PaymentDetails);

    cy.get('@userCart').then((xhr: any) => {
      const cart = xhr.response.body;
      const cartData = {
        total: cart.subTotal.formattedValue,
        estimatedShipping: cart.deliveryCost.formattedValue,
      };
      placeOrderWithCheapProduct(user, cartData);
    });

    cy.get('@addToCart').then((xhr: any) => {
      const responseProduct = xhr.response.body.entry.product;
      const sampleProduct = { code: responseProduct.code };
      verifyOrderConfirmationPageWithCheapProduct(user, sampleProduct);
    });
  });
}
