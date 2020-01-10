import * as orderCancellationsReturns from '../../../helpers/order-cancellations-returns';
import { orderHistoryTest } from '../../../helpers/order-history';

describe.skip('Place Order', () => {
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

  orderHistoryTest.checkIfOrderIsDisplayed(); // This places 2 orders
});

describe.skip('Return Request List for Cancellations and Returns', () => {
  it('should have two tabs: 1 order tab and 1 return tab', () => {
    orderCancellationsReturns.checkTabs();
  });

  it('should fully cancel order', () => {
    orderCancellationsReturns.cancelOrder();
  });
});
