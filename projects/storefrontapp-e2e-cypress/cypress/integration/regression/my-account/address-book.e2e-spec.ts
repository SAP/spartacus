import {
  addressBookTest,
  verifyAsAnonymous,
} from '../../../helpers/address-book';
import * as login from '../../../helpers/login';

describe('My Account - Address Book', () => {
  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
  });

  describe('address book test for anonymous user', () => {
    verifyAsAnonymous();
  });

  describe('address book test for logged in user', () => {
    before(() => {
      cy.requireLoggedIn();
      cy.reload();
      cy.visit('/');
      cy.selectUserMenuOption({
        option: 'Address Book',
      });
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    addressBookTest();

    afterEach(() => {
      cy.saveLocalStorage();
    });

    after(() => {
      login.signOutUser();
    });
  });
});
