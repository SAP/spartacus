import { testProductUrl, verifyTabbingOrder } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

const containerSelector = '.CartPageTemplate';

export function saveForLaterTabbingOrder(config: TabElement[]) {
  addCartItemsAndLoadCart();
  verifyTabbingOrder(containerSelector,config);
}

function addCartItemsAndLoadCart() {
  // Add Two Items to cart
  cy.visit(testProductUrl);
  cy.getAllByText(/Add to cart/i)
    .first()
    .click();
  cy.visit('/cart');
  cy.getAllByText(/Save For Later/i)
    .first()
    .click();
}