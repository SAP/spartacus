import { checkAllElements, testProductUrl } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

export function addToCartTabbingOrder(config: TabElement[]) {
  cy.visit(testProductUrl);

  cy.getAllByText(/Add to cart/i)
    .first()
    .click();
  cy.get('cx-added-to-cart-dialog cx-item-counter button')
    .contains('+')
    .click();

  cy.get('cx-cart-item'); // wait for cart modal to render
  cy.get('cx-added-to-cart-dialog .cx-counter-value:not([disabled])'); // wait until counter is accessible after clicking '+'

  cy.get('button.close')
    .first()
    .focus();

  checkAllElements(config);
}
