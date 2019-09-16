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

  verifyAsAnonymous();

  describe('address book test for logged in user', () => {
    before(() => {
      cy.requireLoggedIn();
      cy.reload();
      cy.visit('/');
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
