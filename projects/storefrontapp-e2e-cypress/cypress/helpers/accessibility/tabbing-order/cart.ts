import { checkAllElements, TabElement } from '../tabbing-order';
import { waitForPage } from '../../checkout-flow';

export function cartTabbingOrder(config: TabElement[]) {
  addCartItemsAndLoadCart();

  // Assert cart items
  cy.get('cx-cart-details a')
    .first()
    .focus();

  checkAllElements(config);
}

function addCartItemsAndLoadCart() {
  // Add Two Items to cart
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

  cy.get('cx-added-to-cart-dialog .btn-primary')
    .contains('view cart')
    .click();
}
