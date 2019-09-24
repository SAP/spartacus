import { checkAllElements, TabElement, testProductUrl } from '../tabbing-order';

export function addToCartTabbingOrder(config: TabElement[]) {
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

  checkAllElements(config);
}
