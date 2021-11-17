import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function wishlistTabbingOrder(config: TabElement[]) {
  cy.intercept(
    'POST',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/carts/*/entries?lang=en&curr=USD`
  ).as('addToWishlist');

  cy.visit('/product/779841');
  cy.findAllByText(/Add to Wish List/i)
    .first()
    .click();

  cy.wait(`@addToWishlist`);
  cy.visit('/my-account/wishlist');

  verifyTabbingOrder(containerSelector, config);
}
