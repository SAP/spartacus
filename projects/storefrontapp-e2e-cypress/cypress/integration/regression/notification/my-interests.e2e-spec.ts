import * as notification from '../../../helpers/notification';

describe('my interests - guest', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  it('should redirect to login page for anonymous user', () => {
    notification.verifyMyInterestsAsAnonymous();
  });
});

describe('my interests - customer', () => {
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

describe('my interests - customer with interests', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    notification.subscribeStockNotifications();
    cy.reload();
  });

  it('should page and sort', () => {
    notification.verifyPagingAndSorting();
  });
});
