import { checkAllElements, TabElement } from '../tabbing-order';

export function addToCartTabbingOrder(config: TabElement[]) {
  cy.visit('/Open-Catalogue/Cameras/Digital-Cameras/c/575');
  cy.get('cx-product-list')
    .contains('Add to cart')
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
