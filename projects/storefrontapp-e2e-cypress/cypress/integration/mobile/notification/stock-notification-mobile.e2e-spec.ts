import * as notification from '../../../helpers/notification';
import { formats } from '../../../sample-data/viewports';

describe(`${
  formats.mobile.width + 1
}p resolution - Stock Notification for guest`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then((win) => win.sessionStorage.clear());
    cy.visit('/');
  });
  it('should login first when guest want to subscribe notification', () => {
    notification.verifyStockNotificationAsGuest();
  });
});

describe(`${
  formats.mobile.width + 1
}p resolution - Stock Notification for customer`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then((win) => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
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
