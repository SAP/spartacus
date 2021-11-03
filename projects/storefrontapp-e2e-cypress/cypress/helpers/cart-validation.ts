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
