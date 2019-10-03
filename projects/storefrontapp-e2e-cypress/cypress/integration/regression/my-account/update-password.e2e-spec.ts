import {
  updatePasswordTest,
  verifyAsAnonymous,
  registerAndLogin,
} from '../../../helpers/update-password';
import * as login from '../../../helpers/login';

describe('My Account - Update Password', () => {
  before(() =>
    cy.window().then(win => {
      win.sessionStorage.clear();
    })
  );

  describe('update password test for anonymous user', () => {
    verifyAsAnonymous();
  });

  describe('update password test for logged in user', () => {
    before(() => {
      registerAndLogin();
      cy.reload();
      cy.visit('/');
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
      cy.selectUserMenuOption({
        option: 'Password',
      });
    });

    updatePasswordTest();

    afterEach(() => {
      cy.saveLocalStorage();
    });

    after(() => {
      login.signOutUser();
    });
  });
});
