import * as orderDetail from '../../../helpers/consignment-tracking';

describe('consignment tracking', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    orderDetail.loginUsingUserWithOrder();
  });

  it('should see tracking package button and tracking events when consignment is shipped', () => {
    orderDetail.visitOrderDetailWithConsignment();
  });

  it('should not see tracking package button when no consignment', () => {
    orderDetail.visitOrderDetailWithoutConsignment();
  });
});
