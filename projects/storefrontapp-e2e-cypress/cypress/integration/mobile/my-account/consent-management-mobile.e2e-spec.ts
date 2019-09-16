import {
  consentManagementTest,
  verifyAsAnonymous,
} from '../../../helpers/consent-management';
import * as login from '../../../helpers/login';
import * as homepage from '../../../helpers/homepage';
import { formats } from '../../../sample-data/viewports';

describe(`${formats.mobile.width +
  1}p resolution - Consent Management Page`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  verifyAsAnonymous();

  describe('consent management test for logged in user', () => {
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

    consentManagementTest();

    afterEach(() => {
      cy.saveLocalStorage();
    });

    after(() => {
      login.signOutUser();
    });
  });
});
