import {
  addressBookTest,
  verifyAsAnonymous,
} from '../../../helpers/address-book';
import * as login from '../../../helpers/login';
import { formats } from '../../../sample-data/viewports';

describe(`${formats.mobile.width + 1}p resolution - Address Book page`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  describe('address book test for anonymous user', () => {
    verifyAsAnonymous();
  });

  describe('address book test for logged in user', () => {
    before(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
      cy.requireLoggedIn();
      cy.reload();
      cy.visit('/');
      cy.selectUserMenuOption({
        option: 'Address Book',
        isMobile: true,
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
