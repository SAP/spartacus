import * as cdc from '../../../../helpers/vendor/cdc/cdc';
import * as alerts from '../../../../helpers/global-message';
import { navigateToConsentPage } from '../../../../helpers/anonymous-consents';

import { fillRegistrationForm } from '../../../../helpers/auth-forms';
import { clickHamburger } from '../../../../helpers/homepage';
import { verifyGlobalMessageAfterRegistration } from '../../../../helpers/register';
const requiredFieldMessage = 'This field is required';

describe('CDC-B2C Consent Management', () => {
  describe('My Account-> Consent Management', () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet('deadpool4@dc.com', 'Password123.');
      navigateToConsentPage();
    });
    it('should successfully give a cdc consent', () => {
      cy.get('input[name="consent.survey"]').should('not.be.checked');
      cy.get('input[name="consent.survey"]').check();
      cy.get('input[name="consent.survey"]').should('be.checked');
      alerts.getSuccessAlert().should('contain', 'Consent successfully given');
    });

    it('should successfully withdraw a cdc consent', () => {
      cy.get('input[name="consent.survey"]').should('be.checked');
      cy.get('input[name="consent.survey"]').uncheck();
      cy.get('input[name="consent.survey"]').should('not.be.checked');
      alerts
        .getSuccessAlert()
        .should('contain', 'Consent successfully withdrawn');
    });
    it('mandatory cdc consents should be checked and in non-editable state', () => {
      cy.get('input[name="terms.test.terms.of.use"]').should('be.checked');
      cy.get('input[name="terms.test.terms.of.use"]').should('be.disabled');
    });
  });

  describe('Consent Management During New User Registration', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
    });
    it('should register and redirect to home page', () => {
      cy.onMobile(() => {
        clickHamburger();
      });
      cy.findByText(/Sign in \/ Register/i).click();
      cy.get('cx-login-register').findByText('Register').click();
      fillRegistrationForm(cdc.user, true);
      cy.get('button[type=submit]').findByText('Register').click();
      cy.get('.control-invalid').each(() => {
        cy.get('p').contains(requiredFieldMessage);
      });
      cy.get('[name="terms.test.terms.of.use"]').check();
      cy.get('[name="consent.survey"]').check();
      cy.get('button[type=submit]').findByText('Register').click();
      verifyGlobalMessageAfterRegistration();
    });
  });
});
