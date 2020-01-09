import * as orderCancellationsReturns from '../../../helpers/order-cancellations-returns';
import * as orderHistory from '../../../helpers/order-history';

describe('Place Order', () => {
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

  orderHistory.orderHistoryTest.checkIfOrderIsDisplayed(); // This places 2 orders
});

describe('Return Request List for Cancellations and Returns', () => {
  it('should have two tabs: 1 order tab and 1 return tab', () => {
    orderCancellationsReturns.checkTabs();
  });

  it('should fully cancel order', () => {
    orderCancellationsReturns.cancelOrder();
  });
});
