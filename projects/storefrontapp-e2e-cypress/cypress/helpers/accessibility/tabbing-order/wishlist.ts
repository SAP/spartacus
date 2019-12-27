import {
  addProductToWishlist,
  checkAllElements,
  TabElement,
} from '../tabbing-order';

export function wishlistTabbingOrder(config: TabElement[]) {
  addProductToWishlist();
  cy.visit('/my-account/wishlist');
  cy.get('cx-wish-list-item a:not([tabindex=-1])')
    .first()
    .focus(); // focus the first element
  checkAllElements(config);
}
