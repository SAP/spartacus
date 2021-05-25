import { testProductUrl, verifyTabbingOrder } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

const containerSelector = '.CartPageTemplate';

export function cartTabbingOrder(config: TabElement[]) {
  addCartItemsAndLoadCart();

  cy.get(
    'cx-cart-item-list cx-item-counter input[type=number]:not([disabled])'
  ); // wait until counter is accessible

  verifyTabbingOrder(containerSelector, config);
}

function addCartItemsAndLoadCart() {
  // Add Two Items to cart
  cy.visit(testProductUrl);
  cy.findAllByText(/Add to cart/i)
    .first()
    .click();

  cy.get('cx-added-to-cart-dialog cx-item-counter button')
    .contains('+')
    .click();

  cy.get(
    'cx-added-to-cart-dialog cx-item-counter input[type=number]:not([disabled])'
  ); // wait until counter is accessible after clicking '+'

  cy.get('cx-added-to-cart-dialog .btn-primary').contains('view cart').click();
}
