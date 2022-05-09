import * as alerts from '../../../helpers/global-message';
import * as updatePassword from '../../../helpers/update-password';
import { signOutUser } from '../../../helpers/login';
import { generateMail, randomString } from '../../../helpers/user';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';

describe('My Account - Update Password', () => {
  viewportContext(['mobile'], () => {
    before(() =>
      cy.window().then((win) => {
        win.sessionStorage.clear();
      })
    );
    it(['update_password'], 'should validate update password core functionaly', () => {
      // Core e2e test. Repeat in mobile viewport.
      updatePassword.testUpdatePasswordLoggedInUser();
    });
  });

  viewportContext(['mobile', 'desktop'], () => {
    before(() =>
      cy.window().then((win) => {
        win.sessionStorage.clear();
      })
    );

    describe('update password test for anonymous user', () => {
      it(['update_password'], 'should redirect to login page for anonymous user', () => {
        cy.visit(updatePassword.PAGE_URL_UPDATE_PASSWORD);
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

      it(['update_password'], 'should be able to cancel and go back to home', () => {
        cy.get('cx-update-password a').click();
        cy.title().should('eq', updatePassword.PAGE_TITLE_HOME);
        alerts.getAlert().should('not.exist');
      });

      it(['update_password'], 'should display server error if old password is wrong', () => {
        alerts.getErrorAlert().should('not.exist');
        cy.get('[formcontrolname="oldPassword"]').type('wrongpassword');
        cy.get('[formcontrolname="newPassword"]').type(
          updatePassword.newPassword
        );
        cy.get('[formcontrolname="newPasswordConfirm"]').type(
          updatePassword.newPassword
        );
        cy.get('cx-update-password button.btn-primary').click();
        cy.url().should('contain', updatePassword.PAGE_URL_UPDATE_PASSWORD);
        alerts.getErrorAlert().should('exist');
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
