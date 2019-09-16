import {
  updatePasswordTest,
  verifyAsAnonymous,
} from '../../../helpers/update-password';
import * as login from '../../../helpers/login';

describe('My Account - Update Password', () => {
  before(() =>
    cy.window().then(win => {
      win.sessionStorage.clear();
    })
  );

  verifyAsAnonymous();

  describe('update profile test for logged in user', () => {
    beforeEach(() => {
      cy.restoreLocalStorage();
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
