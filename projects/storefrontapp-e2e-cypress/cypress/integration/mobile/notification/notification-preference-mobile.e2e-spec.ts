import {
  accessPageAsAnonymous,
  verifyChannelStatus,
  verifyAfterUpdateEmailAddress,
} from '../../../helpers/notification-preference';
import { registerAndLogin } from '../../../helpers/update-email';
import { formats } from '../../../sample-data/viewports';

describe('My Account - Notification Preference', () => {
  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  describe('notification preference test for anonymous user', () => {
    it('should redirect to login page for anonymous user', () => {
      accessPageAsAnonymous();
    });
  });

  describe('notification preference test for logged in user', () => {
    beforeEach(() => {
      registerAndLogin();
      cy.visit('/');
      cy.selectUserMenuOption({
        option: 'Notification Preference',
      });
    });

    it('should enable/disable notification preference', () => {
      verifyChannelStatus();
    });

    it('should show correct email channel after update email address', () => {
      verifyAfterUpdateEmailAddress();
    });
  });
});
