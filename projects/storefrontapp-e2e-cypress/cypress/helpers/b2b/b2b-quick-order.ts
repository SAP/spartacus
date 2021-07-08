import { SampleProduct } from '../../sample-data/checkout-flow';
import { waitForPage } from '../checkout-flow';

export const SAVE_CART_ENDPOINT_ALIAS = 'saveCart';
export const GET_ALL_SAVED_CART_ENDPOINT_ALIAS = 'getAllSavedCart';
export const RESTORE_SAVED_CART_ENDPOINT_ALIAS = 'restoreCart';
export const GET_SAVED_CART_ENDPOINT_ALIAS = 'getSavedCart';
export const CLONE_SAVED_CART_ENDPOINT_ALIAS = 'cloneSavedCart';
export const DELETE_CART_ENDPOINT_ALIAS = 'deleteCart';

export function interceptAddEntryEndpoint(cartCode: string) {
  cy.intercept(
    'PATCH',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/carts/${cartCode}/save?*`
  ).as(SAVE_CART_ENDPOINT_ALIAS);

  return SAVE_CART_ENDPOINT_ALIAS;
}

export function visitCartPage() {
  const alias = waitForPage('/cart', 'cartPage');

  cy.visit(`/cart`);
  cy.wait(`@${alias}`).its('status').should('eq', 200);
}

export function visitQuickOrderPage() {
  cy.visit(`/my-account/quick-order`);
}

export function addProductToTheList(product: SampleProduct) {
  cy.get('quick-order-form-input input').type(`${product.code}{enter}`);
}

export function fillFormWithProductCode(product: SampleProduct) {
  cy.get('quick-order-form-input input').type(`${product.code}`);
}

export function clearForm() {
  this.fillFormWithProductCode();
  cy.get(`quick-order-form-input cx-icon`).click();
}
