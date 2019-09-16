import {
  consentManagementTest,
  verifyAsAnonymous,
} from '../../../helpers/consent-management';
import * as login from '../../../helpers/login';
import { formats } from '../../../sample-data/viewports';

describe('Consent Management', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  verifyAsAnonymous();

  describe('should go to consent management page for login user', () => {
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

describe(`${formats.mobile.width +
  1}p resolution - Consent Management page`, () => {
  function clickHamburger() {
    cy.get('cx-hamburger-menu [aria-label="Menu"]').click();
  }

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  verifyAsAnonymous();

  describe('should go to consent management page for login user', () => {
    before(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
      cy.requireLoggedIn();
      cy.reload();
      cy.visit('/');
      clickHamburger();
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
