import { SampleProduct } from '../../sample-data/checkout-flow';
import * as sampleData from '../../sample-data/b2b-checkout';
import { verifyTabbingOrder as tabbingOrder } from '../accessibility/tabbing-order';
import { tabbingOrderConfig as config } from '../../helpers/accessibility/b2b/tabbing-order.config';
import { waitForPage } from '../checkout-flow';

export const ADD_TO_CART_ENDPOINT_ALIAS = 'addEntry';
export const SEARCH_PRODUCTS_ENDPOINT_ALIAS = 'searchProducts';

export function interceptAddToCartEndpoint() {
  cy.intercept(
    'POST',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/orgUsers/*/carts/*/entries*`
  ).as(ADD_TO_CART_ENDPOINT_ALIAS);

  return ADD_TO_CART_ENDPOINT_ALIAS;
}

export function interceptSearchProductsEndpoint(query: string) {
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/products/search?**`
  ).as(SEARCH_PRODUCTS_ENDPOINT_ALIAS);

  return SEARCH_PRODUCTS_ENDPOINT_ALIAS;
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

export function addProductToTheList(query: string) {
  const alias = this.interceptSearchProductsEndpoint(query);

  cy.get('.quick-order-form-input input').type(`${query}`);
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);
  cy.get('.quick-order-results-products').should('exist');
  cy.get('.quick-order-form-input input').type('{downarrow}{enter}');
}

export function addWrongProductQuery(query: string) {
  const alias = this.interceptSearchProductsEndpoint(query);

  cy.get('.quick-order-form-input input').type(`${query}`);
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);
}

export function addProductToTheListAndModifyQuantity(
  query: string,
  quantity: number
) {
  const alias = this.interceptSearchProductsEndpoint(query);

  cy.get('.quick-order-form-input input').type(`${query}`);
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);
  cy.get('.quick-order-results-products').should('exist');
  cy.get('.quick-order-form-input input').type('{downarrow}{enter}');

  this.modifyProductQuantityInQuickOrderList(quantity);
}

export function modifyProductQuantityInQuickOrderList(quantity: number) {
  cy.get('.cx-quick-order-table-item-quantity cx-item-counter input')
    .type('{selectall}{backspace}')
    .type(`${quantity}`)
    .blur();
}

export function addManyProductsToTheList(products: SampleProduct[]) {
  for (let i = 0; i < products.length; i++) {
    this.addProductToTheList(products[i].code);
    this.verifyQuickOrderListQuantity(i + 1);
  }
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

export function removeManyRows(quantity: number = 1) {
  for (let i = 0; i < quantity; i++) {
    cy.get(`cx-quick-order .cx-quick-order-table-row`)
      .first()
      .find('.cx-quick-order-table-item-action .cx-action-link')
      .click();
  }
}

export function restoreDeletedEntry() {
  cy.get('.quick-order-deletions-message .cx-message-text button')
    .should('exist')
    .click();
}

export function addToCartClick() {
  cy.get(`.quick-order-footer .add-button`).click();
}

export function addToCart() {
  cy.get('cx-quick-order').find('.cx-quick-order-table-row').should('exist');
  this.addToCartClick();
}

export function verifyQuickOrderReachedListLimit() {
  cy.get('.quick-order-form-input input').type(`test`);
  cy.get('.quick-order-list-limit-message').should('exist');
}

export function verifyQuickOrderPageShowInfoMessageToAddProductBeforeClickingAddToCart() {
  cy.get('.quick-order-add-to-cart-information-message').should('exist');
}

export function verifyQuickOrderPageShowErrorMessageOutOfStock() {
  cy.get('.quick-order-errors-message')
    .should('exist')
    .should('contain', 'Error proceeding to Cart');
}

export function verifyQuickOrderPageShowWarningMessageWasReduced() {
  cy.get('.quick-order-warnings-message')
    .should('exist')
    .should('contain', 'Warning proceeding to Cart');
}

export function verifyQuickOrderPageShowSuccessMessageWasAdded() {
  cy.get('.quick-order-successes-message')
    .should('exist')
    .should('contain', 'Successfully added to Cart');
}

export function verifyQuickOrderPageShowEntryDeletionMessages(
  quantity: number
) {
  cy.get('.quick-order-deletions-message')
    .should('exist')
    .should('contain', 'moved to trash')
    .should('have.length', quantity);
}

export function verifyQuickOrderPageDoNotShowEntryDeletionMessages() {
  cy.get('.quick-order-deletions-message').should('not.exist');
}

export function verifyQuickOrderPageHasNotDeletionMessage() {
  cy.get('.quick-order-deletions').should('not.exist');
}

export function verifyQuickOrderPageShowErrorMessageNonPurchasableProduct() {
  cy.get('.quick-order-add-to-cart-information-message').should('not.exist');
}

export function verifyEmptyListButtonIsHidden() {
  cy.get('.quick-order-footer clear-button').should('not.exist');
}

export function verifyMiniCartQuantity(quantity: number) {
  cy.get('cx-mini-cart .count').should('contain', quantity);
}

export function verifyQuickOrderFormResultsBoxIsEmpty() {
  cy.get('.quick-order-no-results').should('exist');
  cy.get('.quick-order-no-results').should(
    'contain',
    'We could not find any results'
  );
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

export function getQuickOrderResultBox(query: string, resultBoxLength: number) {
  const alias = this.interceptSearchProductsEndpoint(query);

  cy.get('.quick-order-form-input input').type(`${query}`);
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);
  cy.get('.quick-order-results-products').should('exist');

  cy.get('.quick-order-results-products li').should(
    'have.length',
    resultBoxLength
  );
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
