import { checkAllElements, TabElement, testProductUrl } from '../tabbing-order';

export function cartTabbingOrder(config: TabElement[]) {
  addCartItemsAndLoadCart();

  cy.get('cx-cart-item-list .cx-counter-value:not([disabled])'); // wait until counter is accessible

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

  cy.get('cx-added-to-cart-dialog cx-item-counter button')
    .contains('+')
    .click();

  cy.get('cx-added-to-cart-dialog .cx-counter-value:not([disabled])'); // wait until counter is accessible after clicking '+'

  cy.get('cx-added-to-cart-dialog .btn-primary')
    .contains('view cart')
    .click();
}
