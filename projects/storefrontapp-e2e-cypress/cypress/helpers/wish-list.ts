import { login, register } from './auth-forms';
import { waitForPage } from './checkout-flow';
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
    `/rest/v2/electronics-spa/users/*/carts/*?fields=*&lang=en&curr=USD`
  ).as('get_wish_list');
}

export function addToWishListAnonymous(product: TestProduct) {
  const productPage = waitForPage(product.code, 'productPage');

  cy.visit(`/product/${product.code}`);

  cy.wait(`@${productPage}`);

  cy.get('cx-add-to-wishlist .button-add-link').click({ force: true });

  cy.get('cx-breadcrumb > h1').should('contain', 'Login');

  cy.get('cx-login-form .btn-register').click({ force: true });

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
    cy.get('.cx-return-button>.btn-link').click({ force: true });
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
  cy.get('cx-mini-cart .count').contains('0');

  cy.server();

  cy.route(
    'POST',
    `/rest/v2/electronics-spa/users/*/carts/*/entries?code=*&qty=*&lang=en&curr=USD`
  ).as('add_to_cart');

  getWishListItem(product.name).within(() => {
    cy.get('cx-add-to-cart>button').click();
  });

  cy.wait('@add_to_cart');

  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-dialog-buttons>.btn-primary').click({ force: true });
  });

  cy.get('cx-mini-cart .count').contains('1');

  getCartItem(product.name).within(() => {
    cy.get('.cx-code').should('contain', product.code);
    cy.get('.cx-counter-value').should('have.value', '1');
  });

  verifyProductInWishList(product);
}

export function checkWishListPersisted(product: TestProduct) {
  cy.selectUserMenuOption({
    option: 'Sign Out',
  });

  cy.getByText(/Sign in \/ Register/i).click();

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

function getCartItem(name: string) {
  return cy.get('cx-cart-item-list').contains('cx-cart-item', name);
}

function getWishListItem(name: string) {
  return cy.get('cx-wish-list').contains('cx-wish-list-item', name);
}
