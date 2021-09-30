import { standardUser } from '../sample-data/shared-users';
import { login, register } from './auth-forms';
import { clickHamburger, waitForPage } from './checkout-flow';
import { PRODUCT_LISTING } from './data-configuration';
import { waitForHomePage } from './homepage';
import { createProductQuery, QUERY_ALIAS } from './product-search';
import { generateMail, randomString } from './user';

interface TestProduct {
  code: string;
  name?: string;
  price?: number;
}

//TODO check against product response and remove this afterwards
const formatPrice = (price: number, currency: string = 'USD') => {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);
  } else if (currency === 'GBP') {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
    }).format(price);
  }
};

export const products: TestProduct[] = [
  {
    code: '1934793',
    name: 'PowerShot A480',
    price: 99.85,
  },
  {
    code: '300938',
    name: 'Photosmart E317 Digital Camera',
    price: 114.12,
  },
  {
    code: '3470545',
    name: 'EASYSHARE M381',
    price: 370.72,
  },
  {
    code: '872912',
  },
  {
    code: '932577',
    name: 'Digital Camera Tripod',
    price: 24.47,
  },
];

function getCartItem(name: string) {
  return cy.get('cx-cart-item-list').contains('cx-cart-item', name);
}

function checkCartSummary(subtotal: string) {
  cy.get('cx-order-summary').within(() => {
    cy.get('.cx-summary-row:first').contains('Subtotal');
    cy.get('.cx-summary-amount').should('contain', subtotal);
  });
}

function incrementQuantity() {
  cy.get('cx-item-counter button').contains('+').click();
}

function goToFirstProductFromSearch(id: string, mobile: boolean) {
  cy.get('cx-storefront.stop-navigating');
  if (mobile) {
    cy.get('cx-searchbox cx-icon[aria-label="Search"]').click();

    createProductQuery(
      QUERY_ALIAS.PRODUCE_CODE,
      id,
      PRODUCT_LISTING.PRODUCTS_PER_PAGE
    );

    cy.get('cx-searchbox input').clear().type(`${id}{enter}`);

    cy.wait(`@${QUERY_ALIAS.PRODUCE_CODE}`)
      .its('response.statusCode')
      .should('eq', 200);

    cy.get('cx-product-list-item .cx-product-name')
      .first()
      .click({ force: true });
  } else {
    cy.get('cx-searchbox input')
      .clear({ force: true })
      .type(id, { force: true });
    cy.get('cx-searchbox')
      .get('.results .products .name')
      .first()
      .click({ force: true });
  }
}

function checkMiniCartCount(expectedCount) {
  return cy.get('cx-mini-cart').within(() => {
    cy.get('.count').should('contain', expectedCount);
  });
}

export function clickAddToCart() {
  cy.get('cx-add-to-cart button[type=submit]').first().click({ force: true });
}

/**
 * Adds product from PDP directly
 * @param productCode
 */
export function addProductFromPdp(productCode: string = products[0].code) {
  const pdpUrl = `${getBaseUrlPrefix()}/product/${productCode}`;

  registerCartRefreshRoute();
  registerCartPageRoute();

  // Add product from PDP directly
  cy.visit(pdpUrl);

  clickAddToCart();

  cy.wait('@refresh_cart');

  closeAddedToCartDialog();

  checkMiniCartCount(1);

  cy.get('cx-mini-cart > a').click({ force: true });

  cy.wait('@cart_page');

  checkProductInCart(products[0]);
}

export function checkBasicCart() {
  const cartUrl = `${getBaseUrlPrefix()}/cart`;
  cy.visit(cartUrl);

  validateEmptyCart();

  addProductFromPdp(products[0].code);

  cy.log(`Adding second product to cart via search page`);

  cy.onMobile(() => {
    cy.get('.search').click();
  });

  cy.get('cx-searchbox input').clear().type(`cameras{enter}`);

  cy.get(
    ':nth-child(2) > :nth-child(1) > :nth-child(2) > .row > .col-md-4 > cx-add-to-cart > .ng-untouched > .btn'
  ).click();

  cy.wait('@refresh_cart');

  closeAddedToCartDialog();
  checkMiniCartCount(2);
  cy.get('cx-mini-cart > a').click({ force: true });

  cy.wait('@cart_page');

  checkProductInCart(products[4]).within(() => {
    incrementQuantity();
  });

  checkMiniCartCount(3);

  removeCartItem(products[0]);

  cy.wait('@refresh_cart');
  cy.get('cx-cart-item').should('have.length', 1);

  removeCartItem(products[4]);

  cy.wait('@refresh_cart');

  validateEmptyCart();
}

export function validateEmptyCart() {
  cy.get('cx-breadcrumb h1').should('contain', 'Your Shopping Cart');
  cy.get('.EmptyCartMiddleContent').should(
    'contain',
    'Your shopping cart is empty'
  );
}

function getOccUrlPrefix() {
  return `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}`;
}

function getBaseUrlPrefix() {
  return `/${Cypress.env('BASE_SITE')}/${Cypress.env(
    'BASE_LANG'
  )}/${Cypress.env('BASE_CURRENCY')}`;
}

export function registerCartPageRoute() {
  cy.intercept(
    'GET',
    `${getOccUrlPrefix()}/cms/pages?pageType=ContentPage&pageLabelOrId=%2Fcart&lang=en&curr=USD`
  ).as('cart_page');
}

export function registerCartRefreshRoute() {
  cy.intercept(
    'GET',
    `${getOccUrlPrefix()}/users/*/carts/*?fields=*&lang=en&curr=USD`
  ).as('refresh_cart');
}

export function registerCreateCartRoute() {
  cy.intercept(
    'POST',
    `${getOccUrlPrefix()}/users/*/carts?fields=*&lang=en&curr=USD`
  ).as('create_cart');
}

export function registerDeleteCartItemRoute() {
  cy.intercept(
    'DELETE',
    `${getOccUrlPrefix()}/users/*/carts/*/entries/*?lang=en&curr=USD`
  ).as('delete_cart_item');
}

export function registerSaveCartRoute() {
  cy.intercept(
    'PATCH',
    `${getOccUrlPrefix()}/users/*/carts/*/save?lang=en&curr=USD`
  ).as('save_cart');
}

export function closeAddedToCartDialog() {
  cy.get('span > .cx-icon.fa-times').click({ force: true });
}

export function checkProductInCart(product, qty = 1, currency = 'USD') {
  return getCartItem(product.name).within(() => {
    cy.get('.cx-price>.cx-value').should(
      'contain',
      formatPrice(product.price, currency)
    );
    cy.get('cx-item-counter input').should('have.value', `${qty}`);
    cy.get('.cx-total>.cx-value').should(
      'contain',
      formatPrice(qty * product.price, currency)
    );
    cy.root();
  });
}

export function checkAddedToCartDialog(itemsNumber = 1) {
  cy.get('cx-added-to-cart-dialog .cx-dialog-total').should(
    'contain',
    `Cart total (${itemsNumber} item${itemsNumber > 1 ? 's' : ''})`
  );
}

export function removeAllItemsFromCart() {
  registerCartRefreshRoute();

  removeCartItem(products[0]);

  cy.wait('@refresh_cart');

  removeCartItem(products[4]);

  validateEmptyCart();
}

export function removeCartItem(product) {
  registerDeleteCartItemRoute();

  getCartItem(product.name).within(() => {
    cy.get('.cx-remove-btn > .link').click();
  });

  cy.wait('@delete_cart_item');
}

export function loginRegisteredUser() {
  standardUser.registrationData.email = generateMail(randomString(), true);
  cy.requireLoggedIn(standardUser);
  cy.reload();
}

export function addProductWhenLoggedIn(mobile: boolean) {
  const product = products[1];

  goToFirstProductFromSearch(product.code, mobile);

  clickAddToCart();

  cy.wait('@create_cart');
  checkAddedToCartDialog();
  closeAddedToCartDialog();
}

export function logOutAndNavigateToEmptyCart() {
  const logoutPage = waitForPage('/logout', 'getLogoutPage');
  cy.selectUserMenuOption({
    option: 'Sign Out',
  });
  cy.wait(`@${logoutPage}`);

  clickHamburger();

  cy.get('cx-login [role="link"]').should('contain', 'Sign In');

  const cartPage = waitForPage('/cart', 'getCartPage');
  cy.visit('/cart');
  cy.wait(`@${cartPage}`).its('response.statusCode').should('eq', 200);

  validateEmptyCart();
}

export function addProductAsAnonymous() {
  const product = products[2];

  createProductQuery(
    QUERY_ALIAS.PRODUCE_CODE,
    product.code,
    PRODUCT_LISTING.PRODUCTS_PER_PAGE
  );

  cy.get('cx-searchbox input').type(`${product.code}{enter}`, {
    force: true,
  });

  cy.wait(`@${QUERY_ALIAS.PRODUCE_CODE}`)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get('cx-product-list')
    .contains('cx-product-list-item', product.name)
    .within(() => {
      clickAddToCart();
    });

  checkAddedToCartDialog();
  closeAddedToCartDialog();
}

export function verifyCartNotEmpty() {
  cy.get('cx-mini-cart .count').contains('1');
}

export function verifyMergedCartWhenLoggedIn() {
  const product0 = products[1];
  const product1 = products[2];

  const loginPage = waitForPage('/login', 'getLoginPage');

  clickHamburger();

  cy.get('cx-login [role="link"]').click();
  cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);

  login(
    standardUser.registrationData.email,
    standardUser.registrationData.password
  );

  cy.get('cx-breadcrumb h1').should('contain', '1 result');

  const cartPage = waitForPage('/cart', 'getCartPage');

  checkMiniCartCount(2);

  cy.get('cx-mini-cart > a').click({ force: true });

  cy.wait(`@${cartPage}`).its('response.statusCode').should('eq', 200);

  cy.get('cx-breadcrumb h1').should('contain', 'Your Shopping Cart');

  checkProductInCart(product0);
  checkProductInCart(product1);
}

export function logOutAndEmptyCart() {
  const logoutPage = waitForPage('/logout', 'getLogoutPage');
  cy.selectUserMenuOption({
    option: 'Sign Out',
  });
  cy.wait(`@${logoutPage}`);

  waitForHomePage();

  const cartPage = waitForPage('/cart', 'getCartPage');
  cy.visit('/cart');
  cy.wait(`@${cartPage}`);

  validateEmptyCart();
}

export function manipulateCartQuantity() {
  const product = products[1];

  registerCartRefreshRoute();
  registerCartPageRoute();

  cy.visit(`/product/${product.code}`);

  clickAddToCart();

  cy.wait('@refresh_cart');

  checkAddedToCartDialog();
  closeAddedToCartDialog();

  checkMiniCartCount(1);
  cy.get('cx-mini-cart > a').click({ force: true });

  cy.wait('@cart_page');

  checkProductInCart(product, 1).within(() => {
    incrementQuantity();
  });

  checkCartSummary('$208.24');

  checkProductInCart(product, 2).within(() => {
    incrementQuantity();
  });

  checkCartSummary('$322.36');

  checkProductInCart(product, 3);
}

export function outOfStock() {
  const product = products[3];

  cy.visit(`/product/${product.code}`);

  cy.get('cx-add-to-cart .quantity').should('contain', 'Out of stock');
  cy.get('cx-add-to-cart cx-add-to-cart button').should('not.exist');
}

export const cartUser = {
  user: 'standard',
  registrationData: {
    firstName: 'Winston',
    lastName: 'Rumfoord',
    password: 'Password123.',
    titleCode: 'mr',
    email: generateMail(randomString(), true),
  },
};

export function registerCartUser() {
  const registerPage = waitForPage('/login/register', 'getRegisterPage');
  cy.visit('/login/register');
  cy.wait(`@${registerPage}`);

  register({ ...cartUser.registrationData });
  cy.url().should('not.contain', 'register');
}

export function loginCartUser() {
  const loginPage = waitForPage('/login', 'getLoginPage');
  cy.visit('/login');
  cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);
  login(cartUser.registrationData.email, cartUser.registrationData.password);
  cy.url().should('not.contain', 'login');
}
