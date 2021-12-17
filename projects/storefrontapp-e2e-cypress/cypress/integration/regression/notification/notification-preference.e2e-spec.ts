import {
  disableNotificationChannel,
  enableNotificationChannel,
  updateEmail,
  verifyEmailChannel,
} from '../../../helpers/notification';
import { registerAndLogin } from '../../../helpers/update-email';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';

describe('Notification preference', () => {
  viewportContext(['mobile', 'desktop'], () => {
    describe('Anonymous user', () => {
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
      });

      it('should redirect to login page for anonymous user', () => {
        cy.visit('/my-account/notification-preference');
        cy.location('pathname').should('contain', '/login');
      });
    });

    describe('Logged in user', () => {
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        registerAndLogin();
        cy.visit('/');
      });

      it('should enable/disable notification preference', () => {
        enableNotificationChannel();
        cy.get('[type="checkbox"]').first().should('be.checked');

        disableNotificationChannel();
        cy.get('[type="checkbox"]').first().should('not.be.checked');
      });

      it('should show correct email channel after update email address', () => {
        verifyEmailChannel(standardUser.registrationData.email);
        const newEmail = updateEmail();
        verifyEmailChannel(newEmail);
      });
    });
  });
});
