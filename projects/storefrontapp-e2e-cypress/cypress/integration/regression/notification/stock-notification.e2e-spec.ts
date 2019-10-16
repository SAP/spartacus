import * as orderDetail from '../../../helpers/consignment-tracking';

describe('consignment tracking', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    orderDetail.loginUsingUserWithOrder();
  });

  it('should login first when guest subscribing stock notification', () => {});

  it('should unsubscribe stock notification', () => {});

  it('should navigate to notification preference page through success dialog', () => {});

  it('should navigate to my interests page through success dialog', () => {});
});
