import { login } from '../../../helpers/auth-forms';
import * as alerts from '../../../helpers/global-message';
import { checkBanner } from '../../../helpers/homepage';
import { signOut } from '../../../helpers/register';
import { registerAndLogin } from '../../../helpers/update-email';
import { generateMail, randomString } from '../../../helpers/user';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';

const UPDATE_EMAIL = '/my-account/update-email';
const password = 'Password123.';

describe('My Account - Update Email', () => {
  viewportContext(['desktop', 'mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('update email test for anonymous user', () => {
      it('should redirect to login page for anonymous user', () => {
        cy.visit(UPDATE_EMAIL);
        cy.location('pathname').should('contain', '/login');
      });
    });

    describe('update email test for logged in user', () => {
      before(() => {
        registerAndLogin();
        cy.reload();
        cy.visit('/');
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
        cy.selectUserMenuOption({
          option: 'Email Address',
        });
      });

      it('should be able to cancel and go back to home', () => {
        cy.get('cx-update-email-form button[type="button"]').click();
        checkBanner();

        cy.location('pathname').should('contain', '/');
      });

      it('should be able to update the email address and login with it', () => {
        const newUid = generateMail(randomString(), true);
        cy.get('cx-update-email-form [formcontrolname="email"]').type(newUid);
        cy.get('cx-update-email-form [formcontrolname="confirmEmail"]').type(
          newUid
        );
        cy.get('cx-update-email-form [formcontrolname="password"]').type(
          password
        );

        cy.get('cx-update-email-form button[type="submit"]').click();

        cy.get('cx-login-form').should('exist');

        alerts
          .getSuccessAlert()
          .should('contain', `Success. Please sign in with ${newUid}`);

        // verify you can login with the new email address
        login(newUid, password);
        // TODO: should we go back to the update-email page? We should verify is the user is logged in instead
        cy.get('cx-update-email').should('exist');
      });

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
