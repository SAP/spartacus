import { addProduct, verifyTabbingOrder } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

const containerSelector = '.CartPageTemplate';

export function saveForLaterTabbingOrder(config: TabElement[]) {
  addCartItemsAndLoadCart();
  verifyTabbingOrder(containerSelector, config);
}

function addCartItemsAndLoadCart() {
  addProduct();

  cy.get('cx-cart-item').within(() => {
    cy.findAllByText(/Save For Later/i)
      .first()
      .click();
  });
  cy.get('cx-cart-item .cx-sfl-btn button:not([disabled])');
}
