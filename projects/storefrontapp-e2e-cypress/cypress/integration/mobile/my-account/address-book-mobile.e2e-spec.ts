import {
  addressBookTest,
  verifyAsAnonymous,
} from '../../../helpers/address-book';
import { formats } from '../../../sample-data/viewports';
import * as login from '../../../helpers/login';
import * as homepage from '../../../helpers/homepage';

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
      cy.requireLoggedIn();
      cy.reload();
      cy.visit('/');
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
      homepage.clickHamburger();
      cy.selectUserMenuOption({
        option: 'Address Book',
        isMobile: true,
      });
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
