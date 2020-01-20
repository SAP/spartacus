import { checkAllElements } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

export function wishlistTabbingOrder(config: TabElement[]) {
  cy.server();
  cy.route(
    'POST',
    `${Cypress.env(
      'API_URL'
    )}/rest/v2/electronics-spa/users/current/carts/*/entries?code=779841&qty=1&lang=en&curr=USD`
  ).as('addToWishlist');

  cy.visit('/product/779841');
  cy.getAllByText(/Add to Wish List/i)
    .first()
    .click();

  cy.wait(`@addToWishlist`);
  cy.visit('/my-account/wishlist');
  cy.get('cx-wish-list-item a:not([tabindex=-1])')
    .first()
    .focus(); // focus the first element
  checkAllElements(config);
}
