import { doPlaceOrder, orderHistoryTest } from '../../../helpers/order-history';
import { viewportContext } from '../../../helpers/viewport-context';
import { product } from '../../../sample-data/checkout-flow';

describe('Order History with orders', () => {
  viewportContext(['mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
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
});

describe('Order details page', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      cy.requireLoggedIn();
    });
    it('should display order details page with unconsigned entries', () => {
      doPlaceOrder().then((orderData: any) => {
        cy.visit(`/my-account/order/${orderData.body.code}`);
        cy.get('.cx-item-list-row .cx-link').should('contain', product.name);
        cy.get('.cx-item-list-row .cx-code').should('contain', product.code);
        cy.get('.cx-summary-total > .cx-summary-amount').should(
          'contain',
          orderData.body.totalPrice.formattedValue
        );
      });
    });
  });
});
