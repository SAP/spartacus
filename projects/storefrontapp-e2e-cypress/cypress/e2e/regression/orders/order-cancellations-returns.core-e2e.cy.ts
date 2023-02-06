import * as orderCancellationReturn from '../../../helpers/order-cancellations-returns';

describe('Order Cancellations and Returns', () => {
  before(() => {
    cy.requireLoggedIn();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  orderCancellationReturn.testCancelOrder();

  orderCancellationReturn.testReturnOrder();
});
