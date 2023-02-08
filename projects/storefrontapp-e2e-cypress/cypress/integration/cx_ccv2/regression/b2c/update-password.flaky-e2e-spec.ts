import { login } from '../../../../helpers/auth-forms';
import * as alerts from '../../../../helpers/global-message';
import * as helper from '../../../../helpers/login';
import { signOutUser } from '../../../../helpers/login';
import { generateMail, randomString } from '../../../../helpers/user';
import { viewportContext } from '../../../../helpers/viewport-context';
import { standardUser } from '../../../../sample-data/shared-users';

const PAGE_TITLE_HOME = 'Homepage';
const PAGE_URL_UPDATE_PASSWORD = '/my-account/update-password';
const newPassword = 'newPassword123!';

describe('My Account - Update Password', () => {
  viewportContext(['desktop'], () => {
    before(() =>
      cy.window().then((win) => {
        win.sessionStorage.clear();
      })
    );

    describe('update password test for anonymous user', () => {
      it('should redirect to login page for anonymous user', () => {
        cy.visit(PAGE_URL_UPDATE_PASSWORD);
        cy.url().should('contain', '/login');
      });
    });

    describe('update password test for logged in user', () => {
      before(() => {
        standardUser.registrationData.email = generateMail(
          randomString(),
          true
        );
        cy.requireLoggedIn(standardUser);
        cy.visit('/');
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
        cy.selectUserMenuOption({
          option: 'Password',
        });
      });

      it('should be able to cancel and go back to home', () => {
        cy.get('cx-update-password a').click();
        cy.title().should('eq', PAGE_TITLE_HOME);
        alerts.getAlert().should('not.exist');
      });

      it('should display server error if old password is wrong', () => {
        alerts.getErrorAlert().should('not.exist');
        cy.get('[formcontrolname="oldPassword"]').type('wrongpassword');
        cy.get('[formcontrolname="newPassword"]').type(newPassword);
        cy.get('[formcontrolname="newPasswordConfirm"]').type(newPassword);
        cy.get('cx-update-password button').click();
        cy.url().should('contain', PAGE_URL_UPDATE_PASSWORD);
        alerts.getErrorAlert().should('exist');
      });

      it('should update the password with success', () => {
        alerts.getSuccessAlert().should('not.exist');
        cy.get('[formcontrolname="oldPassword"]').type(
          standardUser.registrationData.password
        );
        cy.get('[formcontrolname="newPassword"]').type(newPassword);
        cy.get('[formcontrolname="newPasswordConfirm"]').type(newPassword);
        cy.get('cx-update-password button').click();
        cy.title().should('eq', PAGE_TITLE_HOME);
        alerts.getSuccessAlert().should('exist');

        helper.signOutUser();
        cy.visit('/login');
        login(standardUser.registrationData.email, newPassword);
        cy.get(helper.userGreetSelector).should('exist');
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });

      after(() => {
        signOutUser();
      });
    });
  });
});
