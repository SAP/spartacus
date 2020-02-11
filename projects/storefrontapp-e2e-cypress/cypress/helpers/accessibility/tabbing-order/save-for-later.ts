import { testProductUrl, verifyTabbingOrder } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

const containerSelector = '.CartPageTemplate';

export function saveForLaterTabbingOrder(config: TabElement[]) {
  addCartItemsAndLoadCart();
  verifyTabbingOrder(containerSelector, config);
}

function addCartItemsAndLoadCart() {
  // Add Two Items to cart
  cy.visit(testProductUrl);
  cy.get('cx-add-to-cart .btn-primary')
    .should('contain', 'Add To Cart')
    .should('not.be.disabled')
    .then(el => {
      cy.wrap(el).click();
    });
  
  cy.get('cx-added-to-cart-dialog .btn-primary')
    .should('contain', 'View Cart')
    .should('not.be.disabled')
    .then(el => {
      cy.wrap(el).click();
    });

  cy.get('cx-cart-item > .cx-sfl-btn')
    .should('contain', 'Save For Later')
    .should('not.be.disabled')
    .then(el => {
      cy.wrap(el).click();
    });
}
