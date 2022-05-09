import { orderHistoryTest } from '../../../helpers/order-history';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Order History with orders', () => {
  viewportContext(['desktop'], () => {
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
    it(['order_history', 'smoke'],'Order History', () => {
      orderHistoryTest.checkIfOrderIsDisplayed();
      orderHistoryTest.checkSortingByCode();
      orderHistoryTest.checkCorrectDateFormat();
    });
  });
});

describe('Order details page', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      cy.requireLoggedIn();
    });

    it(['order_history', 'smoke'],'Order History Unconsigned Entries', () => {
    orderHistoryTest.checkOrderDetailsUnconsignedEntries();
    });
  });
});
