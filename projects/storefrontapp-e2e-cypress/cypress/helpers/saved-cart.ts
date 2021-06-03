import { addProductToCart } from './b2b/b2b-saved-cart';
import * as sampleData from '../sample-data/saved-cart';
import { tabbingOrderConfig as config } from './accessibility/tabbing-order.config';
import { verifyTabbingOrder as tabbingOrder } from './accessibility/tabbing-order';
import { loginRegisteredUser } from './cart';

export function verifyCartPageTabbingOrder() {
  addProductToCart(sampleData.products[0], 1);

  cy.get(
    'cx-cart-item-list cx-item-counter input[type=number]:not([disabled])'
  ); // wait until counter is accessible

  tabbingOrder('cx-page-layout.CartPageTemplate', config.cart);
}

export function login() {
  loginRegisteredUser();
}

export function verifyDetailsTabbingOrder() {
  // page rendering
  cy.wait(1000);
  tabbingOrder('cx-page-layout.AccountPageTemplate', config.savedCartDetails);
}
