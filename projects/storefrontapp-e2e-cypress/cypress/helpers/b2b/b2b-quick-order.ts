import { SampleProduct } from '../../sample-data/checkout-flow';
import * as sampleData from '../../sample-data/b2b-quick-order';
import { verifyTabbingOrder as tabbingOrder } from '../accessibility/tabbing-order';
import { tabbingOrderConfig as config } from '../../helpers/accessibility/b2b/tabbing-order.config';

// import { waitForPage } from '../checkout-flow';

export function visitCartPage() {
  // const cartPage = waitForPage('/cart', 'cartPage');

  cy.visit(`/cart`);
  // cy.wait(`@${cartPage}`).its('status').should('eq', 200);
}

export function visitQuickOrderPage() {
  // const quickOrderPage = waitForPage(
  //   '/my-account/quick-order',
  //   'quickOrderPage'
  // );

  cy.visit('/my-account/quick-order');
  // cy.wait(`@${quickOrderPage}`).its('status').should('eq', 200);
}

export function addProductToTheList(productCode: string) {
  cy.get('.quick-order-form-input input').type(`${productCode}{enter}`);
}

export function addMultipleProductsToTheList(products: SampleProduct[]) {
  products.forEach((product) => {
    this.addProductToTheList(product.code);
    // TODO
    cy.wait(1500);
  });
}

export function fillFormWithProductCode(product: SampleProduct) {
  cy.get('.quick-order-form-input input').type(`${product.code}`);
}

export function clearForm() {
  cy.get(`.quick-order-form-input cx-icon`).click();
}

export function clearList() {
  cy.get(`.quick-order-footer .clear-button`).click();
}

export function removeFirstRow() {
  cy.get(`cx-quick-order-list .quick-order-list-row`)
    .first()
    .find('.quick-order-list-item-action .cx-action-link')
    .click();
}

export function addToCart() {
  cy.get(`.quick-order-footer .add-button`).click();
}

export function verifyMiniCartQuantity(quantity: number) {
  cy.get('cx-mini-cart .count').should('contain', quantity);
}

export function verifyQuickOrderListQuantity(quantity: number) {
  cy.get('cx-quick-order-list')
    .find('.quick-order-list-row')
    .should('have.length', quantity);
}

export function addProductToCartWithQuickForm(productCode: string) {
  cy.get('cx-cart-quick-form .input-product-code').type(`${productCode}`);
  cy.get('cx-cart-quick-form .apply-coupon-button').click();
}

export function prepareCartWithProduct() {
  this.visitQuickOrderPage();
  this.addProductToTheList(sampleData.products[0].code);
  this.addToCart();
  cy.wait(1000);
  this.visitCartPage();
}

export function verifyCartPageTabbingOrder() {
  cy.get(
    'cx-cart-item-list cx-item-counter input[type=number]:not([disabled])'
  ); // wait until counter is accessible

  tabbingOrder('cx-page-layout.CartPageTemplate', config.cart);
}

export function verifyQuickOrderPageTabbingOrder() {
  tabbingOrder('cx-quick-order-container', config.quickOrder);
}
