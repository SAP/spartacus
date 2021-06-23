import { login } from '../../../helpers/auth-forms';
import * as alerts from '../../../helpers/global-message';
import { checkBanner } from '../../../helpers/homepage';
import { signOut } from '../../../helpers/register';
import { registerAndLogin } from '../../../helpers/update-email';
import { generateMail, randomString } from '../../../helpers/user';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';

const UPDATE_EMAIL_URL = '/my-account/update-email';
const password = 'Password123.';

describe('My Account - Update Email', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('Anonymous user', () => {
      it('should redirect to login page', () => {
        cy.visit(UPDATE_EMAIL_URL);
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

      it('should update his email address and login', () => {
        const newUid = generateMail(randomString(), true);
        cy.get('cx-update-email').within(() => {
          cy.get('[formcontrolname="email"]').type(newUid);
          cy.get('[formcontrolname="confirmEmail"]').type(newUid);
          cy.get('[formcontrolname="password"]').type(password);

          cy.get('button').click();
        });
        cy.get('cx-login-form').should('exist');

        alerts
          .getSuccessAlert()
          .should('contain', `Success. Please sign in with ${newUid}`);

        login(newUid, password);

        cy.get('cx-login .cx-login-greet').should('exist');
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
