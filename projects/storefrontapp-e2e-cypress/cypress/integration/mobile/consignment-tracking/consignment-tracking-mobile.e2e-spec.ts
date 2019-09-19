import * as orderDetail from '../../../helpers/consignment-tracking';
import { formats } from '../../../sample-data/viewports';

describe('consignment tracking', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
    orderDetail.loginUsingUserWithOrder();
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  it('should see tracking package button and tracking events when consignment is shipped', () => {
    orderDetail.visitOrderDetailWithConsignment();
  });

  it('should not see tracking package button when no consignment', () => {
    orderDetail.visitOrderDetailWithoutConsignment();
  });
});
