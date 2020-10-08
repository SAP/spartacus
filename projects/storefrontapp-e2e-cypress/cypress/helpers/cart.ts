import { standardUser } from '../sample-data/shared-users';
import { login, register } from './auth-forms';
import { waitForPage } from './checkout-flow';
import { PRODUCT_LISTING } from './data-configuration';
import { createProductQuery, QUERY_ALIAS } from './product-search';
import { generateMail, randomString } from './user';

interface TestProduct {
  code: string;
  type?: string;
  name?: string;
  price?: number;
}

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
    type: 'camera',
    name: 'PowerShot A480',
    price: 99.85,
  },
  {
    code: '300938',
    type: 'camera',
    name: 'Photosmart E317 Digital Camera',
    price: 114.12,
  },
  {
    code: '3470545',
    type: 'camera',
    name: 'EASYSHARE M381',
    price: 370.72,
  },
  {
    code: '872912',
  },
  {
    code: '932577',
    type: 'camera',
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
    cy.get('cx-searchbox cx-icon[aria-label="search"]').click();

    createProductQuery(
      QUERY_ALIAS.PRODUCE_CODE,
      id,
      PRODUCT_LISTING.PRODUCTS_PER_PAGE
    );

    cy.get('cx-searchbox input').clear().type(`${id}{enter}`);

    cy.wait(`@${QUERY_ALIAS.PRODUCE_CODE}`).its('status').should('eq', 200);

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

export function validateEmptyCart() {
  cy.get('cx-breadcrumb h1').should('contain', 'Your Shopping Cart');
  cy.get('.EmptyCartMiddleContent').should(
    'contain',
    'Your shopping cart is empty'
  );
}

export function addToCart() {
  cy.get('cx-add-to-cart button[type=submit]').first().click({ force: true });
}

export function registerCartRefreshRoute() {
  cy.server();

  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/*/carts/*?fields=*&lang=en&curr=USD`
  ).as('refresh_cart');
}

export function registerCreateCartRoute() {
  cy.server();

  cy.route(
    'POST',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/*/carts?fields=*&lang=en&curr=USD`
  ).as('create_cart');
}

export function registerSaveCartRoute() {
  cy.server();

  cy.route(
    'PATCH',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/*/carts/*/save?lang=en&curr=USD`
  ).as('save_cart');
}

export function closeAddedToCartDialog() {
  cy.get('cx-added-to-cart-dialog [aria-label="Close"]').click({ force: true });
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

export function addProductToCartViaAutoComplete(mobile: boolean) {
  const product = products[0];
  goToFirstProductFromSearch(product.code, mobile);
  addToCart();
  closeAddedToCartDialog();
  checkMiniCartCount(1).click({ force: true });
  checkProductInCart(product);
}

export function addProductToCartViaSearchPage(mobile: boolean) {
  const product = products[4];

  goToFirstProductFromSearch(product.code, mobile);

  addToCart();

  closeAddedToCartDialog();

  checkMiniCartCount(2).click({ force: true });

  checkProductInCart(product);
}

export function removeAllItemsFromCart() {
  registerCartRefreshRoute();

  removeCartItem(products[0]);

  cy.wait('@refresh_cart').its('status').should('eq', 200);

  removeCartItem(products[4]);

  validateEmptyCart();
}

export function removeCartItem(product) {
  getCartItem(product.name).within(() => {
    cy.findByText('Remove').click();
  });
}

export function loginRegisteredUser() {
  standardUser.registrationData.email = generateMail(randomString(), true);
  // Hack to make it more stable
  // cy.requireLoggedIn works thanks to rehydration.
  // Unfortunately it is not always stable. Sometimes app could override localStorage data.
  // Issue for proper fix: #4671
  cy.wait(2000);
  cy.requireLoggedIn(standardUser);
  cy.reload();
}

export function addProductWhenLoggedIn(mobile: boolean) {
  const product = products[1];

  goToFirstProductFromSearch(product.code, mobile);
  /**
   * This waits is added here to delay Add to cart click until wishlist is created.
   * Wishlist is created on first render of wishlist components.
   * Without that there might be a race condition that active cart will use the same cart as wishlist.
   */
  cy.wait('@create_cart');
  cy.wait('@save_cart');
  addToCart();
  checkAddedToCartDialog();
  closeAddedToCartDialog();
}

export function logOutAndNavigateToEmptyCart() {
  const logoutPage = waitForPage('/logout', 'getLogoutPage');
  cy.selectUserMenuOption({
    option: 'Sign Out',
  });
  cy.wait(`@${logoutPage}`);

  cy.get('cx-login [role="link"]').should('contain', 'Sign In');

  const cartPage = waitForPage('/cart', 'getCartPage');
  cy.visit('/cart');
  cy.wait(`@${cartPage}`).its('status').should('eq', 200);

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

  cy.wait(`@${QUERY_ALIAS.PRODUCE_CODE}`).its('status').should('eq', 200);

  cy.get('cx-product-list')
    .contains('cx-product-list-item', product.name)
    .within(() => {
      addToCart();
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
  cy.get('cx-login [role="link"]').click();
  cy.wait(`@${loginPage}`).its('status').should('eq', 200);

  login(
    standardUser.registrationData.email,
    standardUser.registrationData.password
  );

  cy.get('cx-breadcrumb h1').should('contain', '1 result');

  checkMiniCartCount(2).click({ force: true });

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

  const cartPage = waitForPage('/cart', 'getCartPage');
  cy.visit('/cart');
  cy.wait(`@${cartPage}`).its('status').should('eq', 200);

  validateEmptyCart();
}

export function manipulateCartQuantity() {
  const product = products[1];

  cy.visit(`/product/${product.code}`);

  registerCartRefreshRoute();

  addToCart();

  cy.wait('@refresh_cart').its('status').should('eq', 200);

  checkAddedToCartDialog();
  closeAddedToCartDialog();

  checkMiniCartCount(1).click({ force: true });

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
  cy.wait(`@${loginPage}`).its('status').should('eq', 200);
  login(cartUser.registrationData.email, cartUser.registrationData.password);
  cy.url().should('not.contain', 'login');
}
