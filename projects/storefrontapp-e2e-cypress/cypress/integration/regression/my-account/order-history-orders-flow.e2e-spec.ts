import { doPlaceOrder, orderHistoryTest } from '../../../helpers/order-history';
import { product } from '../../../sample-data/checkout-flow';

describe('Order History with orders', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  orderHistoryTest.checkIfOrderIsDisplayed();
  orderHistoryTest.checkSortingByCode();
  orderHistoryTest.checkCorrectDateFormat();
});

describe('Order details page', () => {
  before(() => {
    cy.requireLoggedIn();
  });
  it('should display order details page', () => {
    doPlaceOrder().then((orderData: any) => {
      cy.get('.cx-order-history-code > .cx-order-history-value')
        .first()
        .click();
      cy.get('.cx-item-list-row .cx-link').should('contain', product.name);
      cy.get('.cx-item-list-row .cx-code').should('contain', product.code);
      cy.get('.cx-summary-total > .cx-summary-amount').should(
        'contain',
        orderData.body.totalPrice.formattedValue
      );
    });
  });
});
