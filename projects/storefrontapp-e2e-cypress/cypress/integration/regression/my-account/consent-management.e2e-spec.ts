import { giveConsent } from '../../../helpers/consent-management';
import { clickHamburger } from '../../../helpers/homepage';
import * as login from '../../../helpers/login';
import { viewportContext } from '../../../helpers/viewport-context';
import * as alerts from '../../../helpers/global-message';

const CONSENT_MANAGEMENT = '/my-account/consents';

function withdrawConsent() {
  cy.get('input[type="checkbox"]').first().should('be.checked');
  cy.get('input[type="checkbox"]').first().uncheck();
  cy.get('input[type="checkbox"]').first().should('not.be.checked');

  alerts.getSuccessAlert().should('contain', 'Consent successfully withdrawn');
}

function verifyConsentManagementPage() {
  cy.get('cx-breadcrumb').within(() => {
    cy.get('h1').should('contain', 'Consent Management');
  });
}

function verifyAsAnonymous() {
  it('should redirect to login page for anonymous user', () => {
    accessPageAsAnonymous();
  });
}

function consentManagementTest() {
  it('should be able to go to Consent Management Page', () => {
    verifyConsentManagementPage();
  });

  it('should successfully give a consent', () => {
    giveConsent();
  });

  it('should successfully withdraw a consent', () => {
    withdrawConsent();
  });
}

function accessPageAsAnonymous() {
  cy.visit(CONSENT_MANAGEMENT);
  cy.location('pathname').should('contain', '/login');
}

context('My Account - Consent Management', () => {
  viewportContext(['mobile', 'desktop'], () => {
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
        cy.onMobile(() => {
          clickHamburger();
        });
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
