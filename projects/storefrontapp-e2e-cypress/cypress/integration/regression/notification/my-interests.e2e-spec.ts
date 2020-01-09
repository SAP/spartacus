import * as notification from '../../../helpers/notification';
import * as orderDetail from '../../../helpers/consignment-tracking';

describe('my interests - guest', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  it('should redirect to login page for anonymous user', () => {
    notification.verifyMyInterestsAsAnonymous();
  });
});

describe.skip('my interests - customer', () => {
  beforeEach(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
    notification.enableNotificationChannel();
  });

  it('should show/remove interest', () => {
    notification.verifyCustomerInterests();
  });

  it('should remove the subscrption in PDP', () => {
    notification.verifyRemovingCustomerInterestInPDP();
  });
});

describe.skip('my interests - customer with interests', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    orderDetail.loginUsingUserWithOrder();
  });

  it('should page and sort', () => {
    notification.verifyPagingAndSorting();
  });
});
