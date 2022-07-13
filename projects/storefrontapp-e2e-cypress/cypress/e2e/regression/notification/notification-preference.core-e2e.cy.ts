import { testEnableDisableNotification } from '../../../helpers/notification';
import { registerAndLogin } from '../../../helpers/update-email';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Notification preference', () => {
  viewportContext(['desktop'], () => {
    describe('Logged in user', () => {
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        registerAndLogin();
        cy.visit('/');
      });

      testEnableDisableNotification();
    });
  });
});
