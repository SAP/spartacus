import { formats } from '../../../sample-data/viewports';
import * as notification from '../../../helpers/notification';

describe.skip(`${formats.mobile.width +
  1}p resolution - Stock Notification for guest`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });
  it('should login first when guest want to subcribe notification', () => {
    notification.verifyStockNotificationAsGuest();
  });
});

describe.skip(`${formats.mobile.width +
  1}p resolution - Stock Notification for customer`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  it('should navigate to notification preference page through product detail page', () => {
    notification.verifyStockNotificationWithoutChannel();
  });

  it('should subcribe/unsubscribe notification', () => {
    notification.verifyStockNotification();
  });
});
