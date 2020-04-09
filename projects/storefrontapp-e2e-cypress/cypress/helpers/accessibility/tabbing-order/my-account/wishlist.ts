import { baseEndpoint } from '../../../constants/backend';
import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function wishlistTabbingOrder(config: TabElement[]) {
  cy.server();
  cy.route(
    'POST',
    `${baseEndpoint}/users/current/carts/*/entries?code=779841&qty=1&lang=en&curr=USD`
  ).as('addToWishlist');

  cy.visit('/product/779841');
  cy.getAllByText(/Add to Wish List/i)
    .first()
    .click();

  cy.wait(`@addToWishlist`);
  cy.visit('/my-account/wishlist');

  verifyTabbingOrder(containerSelector, config);
}
