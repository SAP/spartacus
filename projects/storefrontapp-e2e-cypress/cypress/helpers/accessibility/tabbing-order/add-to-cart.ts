import { testProductUrl, verifyTabbingOrder } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

const containerSelector = 'cx-added-to-cart-dialog';

export function addToCartTabbingOrder(config: TabElement[]) {
  cy.visit(testProductUrl);

  cy.findAllByText(/Add to cart/i)
    .first()
    .click();
  cy.get('cx-added-to-cart-dialog cx-item-counter button')
    .contains('+')
    .click();

  cy.get('cx-cart-item'); // wait for cart modal to render
  cy.get(
    'cx-added-to-cart-dialog cx-item-counter input[type=number]:not([disabled])'
  ); // wait until counter is accessible after clicking '+'

  verifyTabbingOrder(containerSelector, config);
}
