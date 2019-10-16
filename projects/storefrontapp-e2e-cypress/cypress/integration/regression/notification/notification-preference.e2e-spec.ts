import * as orderDetail from '../../../helpers/consignment-tracking';

describe('notification preference', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    orderDetail.loginUsingUserWithOrder();
  });

  it('should enable/disable notification preference', () => {});

  it('?should show correct email channel after update email address', () => {});
});
