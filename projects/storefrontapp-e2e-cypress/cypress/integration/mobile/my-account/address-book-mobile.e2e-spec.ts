import { addressBookTest, verifyAsAnonymous } from '../../../helpers/address-book';
import { formats } from '../../../sample-data/viewports';
import * as login from '../../../helpers/login';
import * as homepage from '../../../helpers/homepage';

describe(`${formats.mobile.width + 1}p resolution - Address Book Page`, () => {
    before(() => {
      cy.window().then(win => win.sessionStorage.clear());
      cy.viewport(formats.mobile.width, formats.mobile.height);
    });
  
    verifyAsAnonymous();

    describe('address book test for logged in user', () => {
      before(() => {
        cy.viewport(formats.mobile.width, formats.mobile.height);
        cy.requireLoggedIn();
        cy.reload();
        cy.visit('/');
        homepage.clickHamburger();
      });
      
    beforeEach(() => {
      cy.restoreLocalStorage();
      cy.viewport(formats.mobile.width, formats.mobile.height);
    });

    addressBookTest();

    afterEach(() => {
      cy.saveLocalStorage();
    });

    after(() => {
      login.signOutUser();
    });
  })
  });