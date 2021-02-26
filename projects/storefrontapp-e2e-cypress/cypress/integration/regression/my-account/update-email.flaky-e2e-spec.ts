import {
  updateEmailTest,
  verifyAsAnonymous,
  registerAndLogin,
} from '../../../helpers/update-email';

describe('My Account - Update Email', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  describe('update email test for anonymous user', () => {
    verifyAsAnonymous();
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

    updateEmailTest();

    afterEach(() => {
      cy.saveLocalStorage();
    });
  });
});
