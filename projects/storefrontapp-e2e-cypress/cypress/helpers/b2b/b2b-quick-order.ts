import { SampleProduct } from '../../sample-data/checkout-flow';
import * as sampleData from '../../sample-data/b2b-checkout';
import { verifyTabbingOrder as tabbingOrder } from '../accessibility/tabbing-order';
import { tabbingOrderConfig as config } from '../../helpers/accessibility/b2b/tabbing-order.config';
import { waitForPage } from '../checkout-flow';

export const ADD_TO_CART_ENDPOINT_ALIAS = 'addEntry';
export const GET_PRODUCT_ENDPOINT_ALIAS = 'getProduct';

export function interceptAddToCartEndpoint() {
  cy.intercept(
    'POST',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/orgUsers/*/carts/*/entries*`
  ).as(ADD_TO_CART_ENDPOINT_ALIAS);

  return ADD_TO_CART_ENDPOINT_ALIAS;
}

export function interceptGetProductEndpoint(productCode: string) {
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/products/${productCode}?fields=*&lang=en&curr=USD`
  ).as(GET_PRODUCT_ENDPOINT_ALIAS);

  return GET_PRODUCT_ENDPOINT_ALIAS;
}

export function visitCartPage() {
  const cartPage = waitForPage('/cart', 'cartPage');

  cy.visit(`/cart`);
  cy.wait(`@${cartPage}`).its('response.statusCode').should('eq', 200);
}

export function visitQuickOrderPage() {
  const quickOrderPage = waitForPage(
    '/my-account/quick-order',
    'quickOrderPage'
  );

  cy.visit('/my-account/quick-order');
  cy.wait(`@${quickOrderPage}`).its('response.statusCode').should('eq', 200);
}

export function addProductToTheList(productCode: string) {
  const alias = this.interceptGetProductEndpoint(productCode);

  cy.get('.quick-order-form-input input').type(`${productCode}{enter}`);
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);
}

export function addProductToTheListAndModifyQuantity(
  productCode: string,
  quantity: number
) {
  const alias = this.interceptGetProductEndpoint(productCode);

  cy.get('.quick-order-form-input input').type(`${productCode}{enter}`);
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);

  this.modifyProductQuantityInQuickOrderList(quantity);
}

export function modifyProductQuantityInQuickOrderList(quantity: number) {
  cy.get('.cx-quick-order-table-item-quantity cx-item-counter input')
    .type('{selectall}{backspace}')
    .type(`${quantity}`)
    .blur();
}

export function addWrongProductToTheList(productCode: string) {
  const alias = this.interceptGetProductEndpoint(productCode);

  cy.get('.quick-order-form-input input').type(`${productCode}{enter}`);
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 400);
}

export function addManyProductsToTheList(products: SampleProduct[]) {
  products.forEach((product) => {
    this.addProductToTheList(product.code);
  });
}

export function clearList() {
  cy.get(`.quick-order-footer .clear-button`).click();
}

export function removeFirstRow() {
  cy.get(`cx-quick-order .cx-quick-order-table-row`)
    .first()
    .find('.cx-quick-order-table-item-action .cx-action-link')
    .click();
}

export function addToCart() {
  cy.get(`.quick-order-footer .add-button`).click();
}

export function verifyQuickOrderFormIsDisabled() {
  cy.get('.quick-order-form-input input').should('be.disabled');
}

export function verifyQuickOrderPageShowErrorMessageOutOfStock() {
  cy.get('cx-message .quick-order-errors')
    .should('exist')
    .should('contain', 'is out of stock');
}

export function verifyQuickOrderPageShowWarningMessageWasReduced() {
  cy.get('cx-message .quick-order-warnings')
    .should('exist')
    .should('contain', 'was reduced to');
}

export function verifyQuickOrderPageShowSuccessMessageWasAdded() {
  cy.get('cx-message .quick-order-successes')
    .should('exist')
    .should('contain', 'was added to cart');
}

export function verifyEmptyListButtonIsHidden() {
  cy.get('.quick-order-footer clear-button').should('not.exist');
}

export function verifyMiniCartQuantity(quantity: number) {
  cy.get('cx-mini-cart .count').should('contain', quantity);
}

export function verifyQuickOrderListQuantity(quantity: number) {
  cy.get('cx-quick-order')
    .find('.cx-quick-order-table-row')
    .should('have.length', quantity);
}

export function addProductToCartWithQuickForm(
  productCode: string,
  quantity?: number
) {
  const alias = this.interceptAddToCartEndpoint();

  cy.get('cx-cart-quick-order-form .input-product-code').type(`${productCode}`);

  if (quantity) {
    cy.get('cx-cart-quick-order-form .input-quantity').type(`${quantity}`);
  }

  cy.get('cx-cart-quick-order-form .apply-quick-order-button').click();

  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);
}

export function prepareCartWithProduct() {
  const alias = this.interceptAddToCartEndpoint();

  this.visitQuickOrderPage();
  this.addProductToTheList(sampleData.b2bProduct.code);
  this.addToCart();

  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);

  this.verifyMiniCartQuantity(1);
  this.visitCartPage();
}

export function verifyCartPageTabbingOrder() {
  cy.get(
    'cx-cart-item-list cx-item-counter input[type=number]:not([disabled])'
  );

  tabbingOrder('cx-page-layout.CartPageTemplate', config.quickOrderCart);
}

export function verifyQuickOrderPageTabbingOrder() {
  tabbingOrder('cx-quick-order', config.quickOrder);
}
