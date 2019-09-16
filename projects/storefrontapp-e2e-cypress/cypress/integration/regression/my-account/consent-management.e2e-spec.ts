import {
  consentManagementTest,
  verifyAsAnonymous,
} from '../../../helpers/consent-management';
import * as login from '../../../helpers/login';

describe('My Account - Consent Management', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  verifyAsAnonymous();

  describe('consent management test for logged in user', () => {
    before(() => {
      cy.requireLoggedIn();
      cy.reload();
      cy.visit('/');
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
