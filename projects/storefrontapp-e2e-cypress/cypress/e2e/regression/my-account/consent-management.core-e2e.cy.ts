import {
  consentManagementTest,
  verifyAsAnonymous,
} from '../../../helpers/consent-management';
import * as login from '../../../helpers/login';
import { viewportContext } from '../../../helpers/viewport-context';

viewportContext(['mobile', 'desktop'], () => {
  describe('My Account - Consent Management', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('consent management test for anonymous user', () => {
      verifyAsAnonymous();
    });

    describe('consent management test for logged in user', () => {
      before(() => {
        cy.requireLoggedIn();
        cy.reload();
        cy.visit('/');
        cy.selectUserMenuOption({
          option: 'Consent Management',
        });
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
      });

      consentManagementTest();

      afterEach(() => {
        cy.saveLocalStorage();
      });

      after(() => {
        login.signOutUser();
      });
    });
  });
});
