import { checkAllElements, TabElement, testProductUrl } from '../tabbing-order';

export function cartTabbingOrder(config: TabElement[]) {
  addCartItemsAndLoadCart();

  // Assert cart items
  cy.get('cx-cart-details .cx-name a')
    .first()
    .focus();

  checkAllElements(config);
}

function addCartItemsAndLoadCart() {
  // Add Two Items to cart
  cy.visit(testProductUrl);
  cy.getAllByText(/Add to cart/i)
    .first()
    .click();

  cy.server();
  cy.route('GET', '/rest/v2/electronics-spa/users/anonymous/carts/*').as(
    'getRefreshedCart'
  );
  cy.get('cx-added-to-cart-dialog cx-item-counter button')
    .contains('+')
    .click();
  cy.wait('@getRefreshedCart');

  cy.get('cx-added-to-cart-dialog .btn-primary')
    .contains('view cart')
    .click();
}
