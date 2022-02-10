import { removeCartItem } from './cart';
import {
  PRODUCT_1,
  PRODUCT_2,
  lowStockResponse,
} from '../sample-data/cart-validation';
import * as cart from './cart';

export function validateStock(mockResponse = {}, alias = 'validate') {
  cy.intercept(
    {
      method: 'POST',
      pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/carts/*/validate`,
    },
    mockResponse
  ).as(alias);
}

export function checkProductAvailabilityMessage() {
  cy.get('cx-global-message').should(
    'contain',
    `During checkout we found problems with your entries. Please review your cart.`
  );
}

export function checkReducedQuantity(product) {
  cy.get('cx-cart-item-list')
    .contains('cx-cart-item', product.name)
    .should('contain', `Quantity has reduced to 1 due to insufficient stock.`);
}

export function addMultipleProductsToCart(products) {
  cy.intercept('GET', `**/users/*/carts/*?fields=**`).as('refresh_cart');
  cy.intercept('POST', `**/users/*/carts/*/entries?**`).as('addToCart');

  cy.wrap(products).each((product, idx) => {
    cy.visit(`/product/${product.code}`);
    cart.clickAddToCart();
    cy.wait(['@refresh_cart', '@addToCart']);
  });
}

export function removeItemAndCheckCartEntriesNumber(
  product,
  expectedCartLength = 0
) {
  removeCartItem(product);
  cy.wait('@refresh_cart');
  cy.get('cx-cart-item-list cx-cart-item').should(
    'have.length',
    expectedCartLength
  );
}

export function testReducedProductStockValidation() {
  it('should display information about reduced stock for product in cart', () => {
    addMultipleProductsToCart([PRODUCT_1, PRODUCT_2]);

    validateStock(lowStockResponse);

    cy.findByText(/proceed to checkout/i).click();
    cy.wait(`@validate`);

    checkProductAvailabilityMessage();

    cy.get('cx-cart-item-list cx-cart-item-validation-warning div').should(
      'have.length',
      2
    );

    checkReducedQuantity(PRODUCT_1);
    checkReducedQuantity(PRODUCT_2);

    removeItemAndCheckCartEntriesNumber(PRODUCT_1, 1);
    removeItemAndCheckCartEntriesNumber(PRODUCT_2, 0);
  });
}
