import {
  closeAccountTest,
  verifyAsAnonymous,
} from '../../../helpers/close-account';
import { standardUser } from '../../../sample-data/shared-users';

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
      cy.requireLoggedIn();
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
});
