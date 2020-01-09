import * as orderHistory from '../../../helpers/cancellations-returns';
import * as orderFlow from '../../../helpers/order-history';

describe('Return Request List for Cancellations and Returns', () => {
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

  orderFlow.orderHistoryTest.checkIfOrderIsDisplayed(); // This places order and goes to order history page

  it('should have two tabs: 1 order tab and 1 return tab', () => {
    orderHistory.checkTabs();
  });

  it('should fully cancel order', () => {
    orderHistory.cancelOrder();
  });
});
