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
import { login, register } from './auth-forms';
import {
  AddressData,
  fillPaymentDetails,
  fillShippingAddress,
  PaymentDetails,
} from './checkout-forms';

export const ELECTRONICS_BASESITE = 'electronics-spa';
export const ELECTRONICS_CURRENCY = 'USD';

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

export function signOutUser(sampleUser: SampleUser = user) {
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
  cy.get('cx-add-to-cart')
    .findByText(/Add To Cart/i)
    .click();
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
}

export function verifyDeliveryMethod() {
  cy.log('🛒 Selecting delivery method');
  cy.get('.cx-checkout-title').should('contain', 'Shipping Method');
  cy.get('cx-delivery-mode input').first().should('be.checked');
  const paymentPage = waitForPage(
    '/checkout/payment-details',
    'getPaymentPage'
  );
  cy.get('.cx-checkout-btns button.btn-primary').click();
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
}

export function verifyReviewOrderPage() {
  cy.get('.cx-review-title').should('contain', 'Review');
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
    .contains('cx-card', 'Shipping Method')
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
  cy.get('cx-order-history h3').should('contain', 'Order history');
  cy.get('.cx-order-history-table tr')
    .first()
    .find('.cx-order-history-total .cx-order-history-value')
    .should('not.be.empty');
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
  cy.wait(`@${loginPage}`);

  const shippingPage = waitForPage(
    '/checkout/shipping-address',
    'getShippingPage'
  );
  loginUser(sampleUser);
  // Double timeout, because we have here a cascade of requests (login, load /checkout page, merge cart, load shipping page)
  cy.wait(`@${shippingPage}`, { timeout: 30000 })
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
  const shippingPage = waitForPage(
    '/checkout/shipping-address',
    'getShippingPage'
  );
  cy.findByText(/proceed to checkout/i).click();
  cy.wait(`@${shippingPage}`).its('response.statusCode').should('eq', 200);
}

export function addCheapProductToCart(
  sampleProduct: SampleProduct = cheapProduct
) {
  cy.get('cx-add-to-cart')
    .findByText(/Add To Cart/i)
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-name .cx-link').should('contain', sampleProduct.name);
  });
}

export function fillAddressFormWithCheapProduct(
  shippingAddressData: AddressData = user,
  cartData: SampleCartProduct = cartWithCheapProduct
) {
  cy.log('🛒 Filling shipping address form');

  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-row')
    .first()
    .find('.cx-summary-amount')
    .should('contain', cartData.total);
  const deliveryPage = waitForPage(
    '/checkout/delivery-mode',
    'getDeliveryPage'
  );
  fillShippingAddress(shippingAddressData);
  cy.wait(`@${deliveryPage}`).its('response.statusCode').should('eq', 200);
}

export function fillPaymentFormWithCheapProduct(
  paymentDetailsData: PaymentDetails = user,
  billingAddress?: AddressData,
  cartData: SampleCartProduct = cartWithCheapProduct
) {
  cy.log('🛒 Filling payment method form');
  cy.get('.cx-checkout-title').should('contain', 'Payment');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-total')
    .find('.cx-summary-amount')
    .should('not.be.empty');

  const reviewPage = waitForPage('/checkout/review-order', 'getReviewPage');
  fillPaymentDetails(paymentDetailsData, billingAddress);
  cy.wait(`@${reviewPage}`).its('response.statusCode').should('eq', 200);
}

export function placeOrderWithCheapProduct(
  sampleUser: SampleUser = user,
  cartData: SampleCartProduct = cartWithCheapProduct,
  currency: string = 'USD'
) {
  cy.log('🛒 Placing order');
  verifyReviewOrderPage();
  cy.get('.cx-review-summary-card')
    .contains('cx-card', 'Ship To')
    .find('.cx-card-container')
    .within(() => {
      cy.findByText(sampleUser.fullName);
      cy.findByText(sampleUser.address.line1);
      cy.findByText(sampleUser.address.line2);
    });
  cy.get('.cx-review-summary-card')
    .contains('cx-card', 'Shipping Method')
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
  cy.get('cx-place-order button.btn-primary').click();
  cy.wait(`@${orderConfirmationPage}`)
    .its('response.statusCode')
    .should('eq', 200);
}

export function verifyOrderConfirmationPageWithCheapProduct(
  sampleUser: SampleUser = user,
  sampleProduct: SampleProduct = cheapProduct,
  cartData: SampleCartProduct = cartWithCheapProduct,
  isApparel: boolean = false
) {
  cy.get('.cx-page-title').should('contain', 'Confirmation of Order');
  cy.get('h2').should('contain', 'Thank you for your order!');
  cy.get('.cx-order-summary .container').within(() => {
    cy.get('.cx-summary-card:nth-child(1)').within(() => {
      cy.get('cx-card:nth-child(1)').within(() => {
        cy.get('.cx-card-title').should('contain', 'Order Number');
        cy.get('.cx-card-label').should('not.be.empty');
      });
      cy.get('cx-card:nth-child(2)').within(() => {
        cy.get('.cx-card-title').should('contain', 'Placed on');
        cy.get('.cx-card-label').should('not.be.empty');
      });
      cy.get('cx-card:nth-child(3)').within(() => {
        cy.get('.cx-card-title').should('contain', 'Status');
        cy.get('.cx-card-label').should('not.be.empty');
      });
    });
    cy.get('.cx-summary-card:nth-child(2) .cx-card').within(() => {
      cy.contains(sampleUser.fullName);
      cy.contains(sampleUser.address.line1);
      cy.contains('Standard Delivery');
    });
    cy.get('.cx-summary-card:nth-child(3) .cx-card').within(() => {
      cy.contains(sampleUser.fullName);
      cy.contains(sampleUser.address.line1);
    });
  });
  if (!isApparel) {
    cy.get('cx-cart-item .cx-code').should('contain', sampleProduct.code);
  } else {
    cy.get('cx-cart-item .cx-code')
      .should('have.length', products.length)
      .each((_, index) => {
        console.log('products', products[index]);
        cy.get('cx-cart-item .cx-code').should('contain', products[index].code);
      });
  }
  cy.get('cx-order-summary .cx-summary-amount').should('not.be.empty');
}

export function viewOrderHistoryWithCheapProduct(
  cartData: SampleCartProduct = cartWithCheapProduct
) {
  const orderHistoryPage = waitForPage(
    '/my-account/orders',
    'getOrderHistoryPage'
  );
  cy.selectUserMenuOption({
    option: 'Order History',
  });
  cy.wait(`@${orderHistoryPage}`).its('response.statusCode').should('eq', 200);
  cy.get('cx-order-history h3').should('contain', 'Order history');
  cy.get('.cx-order-history-table tr')
    .first()
    .find('.cx-order-history-total .cx-order-history-value')
    .should('not.be.empty');
}
