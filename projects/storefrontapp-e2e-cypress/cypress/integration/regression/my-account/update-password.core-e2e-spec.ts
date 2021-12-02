import * as updatePassword from '../../../helpers/update-password';
import { signOutUser } from '../../../helpers/login';
import { generateMail, randomString } from '../../../helpers/user';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';

describe('My Account - Update Password', () => {
  viewportContext(['desktop'], () => {
    before(() =>
      cy.window().then((win) => {
        win.sessionStorage.clear();
      })
    );

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

      updatePassword.testUpdatePassword();

      afterEach(() => {
        cy.saveLocalStorage();
      });

      after(() => {
        signOutUser();
      });
    });
  });
});
