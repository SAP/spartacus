import {
  closeAccountTest,
  verifyAsAnonymous,
} from '../../../helpers/close-account';
import { formats } from '../../../sample-data/viewports';
import * as homepage from '../../../helpers/homepage';

describe(`${formats.mobile.width + 1}p resolution - Close Account page`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

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
      homepage.clickHamburger();
      cy.selectUserMenuOption({
        option: 'Close Account',
        isMobile: true,
      });
    });

    closeAccountTest();

    afterEach(() => {
      cy.saveLocalStorage();
    });
  });
});
