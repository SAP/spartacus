import { registerAndLogin } from '../../../helpers/update-email';
import * as notification from '../../../helpers/notification';

describe('notification preference test for anonymous user', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  it('should redirect to login page for anonymous user', () => {
    notification.verifyNotificationPrefAsAnonymous();
  });
});

describe('notification preference test for logged in user', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    registerAndLogin();
    cy.visit('/');
  });

  it('should enable/disable notification preference', () => {
    notification.verifyNotificationChannel();
  });

  it('should show correct email channel after update email address', () => {
    notification.verifyChannelValueUpdating();
  });
});
