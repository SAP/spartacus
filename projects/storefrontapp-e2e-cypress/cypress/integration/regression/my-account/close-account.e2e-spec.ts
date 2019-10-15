import {
  closeAccountTest,
  verifyAsAnonymous,
  registerAndLogin,
  verifyAccountClosedTest,
} from '../../../helpers/close-account';

describe('My Account - Close Account', () => {
  before(() =>
    cy.window().then(win => {
      win.sessionStorage.clear();
    })
  );

  describe('close account test for anonymous user', () => {
    verifyAsAnonymous();
  });

  describe('close account test for logged in user', () => {
    before(() => {
      registerAndLogin();
      cy.reload();
      cy.visit('/');
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
      cy.selectUserMenuOption({
        option: 'Close Account',
      });
    });

    closeAccountTest();

    afterEach(() => {
      cy.saveLocalStorage();
    });
  });

  describe('verify user is disabled and cannot login', () => {
    verifyAccountClosedTest();
  });
});
