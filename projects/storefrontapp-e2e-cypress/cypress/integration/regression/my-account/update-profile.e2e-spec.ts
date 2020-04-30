import {
  updateProfileTest,
  verifyAsAnonymous,
} from '../../../helpers/update-profile';
import * as login from '../../../helpers/login';

describe('My Account - Update Profile', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  describe('update profile test for anonymous user', () => {
    verifyAsAnonymous();
  });

  describe('update profile test for logged in user', () => {
    before(() => {
      cy.requireLoggedIn();
      cy.visit('/');
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
      cy.selectUserMenuOption({
        option: 'Personal Details',
      });
    });

    updateProfileTest();

    afterEach(() => {
      cy.saveLocalStorage();
    });

    after(() => {
      login.signOutUser();
    });
  });
});
