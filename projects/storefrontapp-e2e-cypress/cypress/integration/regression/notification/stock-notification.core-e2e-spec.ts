import * as notification from '../../../helpers/notification';

describe('Stock Notification for Guest', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.visit('/');
  });
  it('should login first when guest want to subscribe notification', () => {
    notification.verifyStockNotificationAsGuest();
  });
});

describe('Stock Notification for Customer', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should navigate to notification preference page through product detail page', () => {
    notification.verifyStockNotificationWithoutChannel();
  });
  it('should subscribe/unsubscribe notification', () => {
    notification.verifyStockNotification();
  });
});
