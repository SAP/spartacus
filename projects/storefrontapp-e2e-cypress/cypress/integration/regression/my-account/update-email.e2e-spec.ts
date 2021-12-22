import { login } from '../../../helpers/auth-forms';
import * as alerts from '../../../helpers/global-message';
import { checkBanner } from '../../../helpers/homepage';
import { signOut } from '../../../helpers/register';
import { registerAndLogin } from '../../../helpers/update-email';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';
import * as updateEmail from '../../../helpers/update-email';

describe('My Account - Update Email', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('Anonymous user', () => {
      it('should redirect to login page', () => {
        cy.visit(updateEmail.UPDATE_EMAIL_URL);
        cy.location('pathname').should('contain', '/login');
      });
    });

    describe('Logged in user', () => {
      before(() => {
        registerAndLogin();
        cy.visit('/');
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
        cy.selectUserMenuOption({
          option: 'Email Address',
        });
      });

      it('should click cancel update email and go back to the homepage', () => {
        cy.get('cx-update-email button').click();
        checkBanner();

        cy.location('pathname').should('contain', '/');
      });

      // Core e2e test. Check with different view port.
      updateEmail.testUpdateEmailAndLogin();

      // Below test depends on core test for setup.
      it('should not allow login with old email address', () => {
        signOut();
        cy.visit('/login');
        login(
          standardUser.registrationData.email,
          standardUser.registrationData.password
        );
        alerts.getErrorAlert().should('contain', 'Bad credentials');
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });
    });
  });
});
