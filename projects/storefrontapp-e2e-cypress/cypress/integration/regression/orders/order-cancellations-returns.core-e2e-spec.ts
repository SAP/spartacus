import * as orderCancellationReturn from '../../../helpers/order-cancellations-returns';

describe('Order Cancellations and Returns', () => {
  before(() => {
    cy.requireLoggedIn();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it(['orders', 'order_cancellation'],'should validate order cancellation functionality', () => {
    orderCancellationReturn.testCancelOrder();
  });
  it(['orders', 'order_returns'],'should validate order return functionality', () => {
    orderCancellationReturn.testReturnOrder();
  });
});
