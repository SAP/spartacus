import { checkAllElements, TabElement, testProductUrl } from '../tabbing-order';

export function addToCartTabbingOrder(config: TabElement[]) {
  cy.server();
  cy.visit(testProductUrl);
  cy.getAllByText(/Add to cart/i)
    .first()
    .click();
  cy.route('GET', '/rest/v2/electronics-spa/users/anonymous/carts/*').as(
    'getRefreshedCart'
  );
  cy.get('cx-added-to-cart-dialog cx-item-counter button')
    .contains('+')
    .click();

  cy.get('cx-cart-item'); // wait for cart modal to render

  cy.wait('@getRefreshedCart');

  cy.get('button.close')
    .first()
    .focus();

  checkAllElements(config);
}
