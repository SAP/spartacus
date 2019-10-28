import { registerAndLogin } from '../../../helpers/update-email';
import * as notification from '../../../helpers/notification';
import { formats } from '../../../sample-data/viewports';

describe(`${formats.mobile.width +
  1}p resolution - Notification Preference for guest`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then(win => win.sessionStorage.clear());
  });

  it('should redirect to login page for anonymous user', () => {
    notification.verifyNotificationPrefAsAnonymous();
  });
});

describe(`${formats.mobile.width +
  1}p resolution - Notification Preference for customer`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then(win => win.sessionStorage.clear());
    registerAndLogin();
    cy.visit('/');
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  it('should enable/disable notification preference', () => {
    notification.verifyNotificationChannel();
  });

  it('should show correct email channel after update email address', () => {
    notification.verifyChannelValueUpdating();
  });
});
