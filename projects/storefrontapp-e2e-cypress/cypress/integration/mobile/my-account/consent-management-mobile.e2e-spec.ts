import {
  consentManagementTest,
  verifyAsAnonymous,
} from '../../../helpers/consent-management';
import * as login from '../../../helpers/login';
import { formats } from '../../../sample-data/viewports';

describe(`${
  formats.mobile.width + 1
}p resolution - Consent Management Page`, () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  describe('consent management test for anonymous user', () => {
    verifyAsAnonymous();
  });

  describe('consent management test for logged in user', () => {
    before(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
      cy.requireLoggedIn();
      cy.reload();
      cy.visit('/');
      cy.selectUserMenuOption({
        option: 'Consent Management',
        isMobile: true,
      });
    });

    beforeEach(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
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
