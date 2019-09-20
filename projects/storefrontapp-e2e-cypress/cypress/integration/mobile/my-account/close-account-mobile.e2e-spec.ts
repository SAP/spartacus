import {
  closeAccountTest,
  verifyAsAnonymous,
  registerAndLogin,
} from '../../../helpers/close-account';
import { formats } from '../../../sample-data/viewports';

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
      registerAndLogin();
      cy.reload();
      cy.visit('/');
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
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
