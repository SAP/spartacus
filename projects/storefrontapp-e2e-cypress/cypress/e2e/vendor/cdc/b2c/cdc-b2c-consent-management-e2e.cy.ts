/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cdc from '../../../../helpers/vendor/cdc/cdc';
import * as alerts from '../../../../helpers/global-message';
import { navigateToConsentPage } from '../../../../helpers/anonymous-consents';
import { fillRegistrationForm } from '../../../../helpers/auth-forms';
import { clickHamburger } from '../../../../helpers/homepage';
//import { verifyGlobalMessageAfterRegistration } from '../../../../helpers/register';
const requiredFieldMessage = 'This field is required';

/** System Setup: CDC site should contain only 2 active consents terms.test.terms.of.use (required) and consent.survey (not required)
 *  The system should have 2 users - mentioned in cdc.b2cConsentTestUser
 *  The cdc.b2cConsentTestUser.stuntDoubleEmail should require terms.test.terms.of.use for reconsent
 *  The cdc.b2cConsentTestUser.email should have both consents given.
 */

describe('CDC-B2C Consent Management', () => {
  describe('Providing Reconsent During Login', () => {
    it('error should appear without reconsent', () => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.intercept('/accounts.login', { times: 1 }, (req) => {
        req.body = req.body.replace(
          cdc.b2cConsentTestUser.encodedEmail,
          cdc.b2cConsentTestUser.encodedStuntDoubleEmail
        );
        req.continue();
      });
      cy.visit('/login');
      cdc.loginWithoutScreenSet(
        cdc.b2cConsentTestUser.email,
        cdc.b2cConsentTestUser.password
      );
      cy.get('.cx-dialog-header').contains('Profile Completion');
      cy.get('.close').click();
      alerts
        .getErrorAlert()
        .should('contain', 'Account Pending Registration. Please login again.');
    });
    it('provide reconsent and proceed to login', () => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.intercept('/accounts.login', { times: 1 }, (req) => {
        req.body = req.body.replace(
          cdc.b2cConsentTestUser.encodedEmail,
          cdc.b2cConsentTestUser.encodedStuntDoubleEmail
        );
        req.continue();
      });
      cy.intercept(
        '/accounts.setAccountInfo',
        { times: 1 },
        {
          body: {
            callId: 'c84243a81a0e4d2db0e28a25021faa66',
            errorCode: 0,
            apiVersion: 2,
            statusCode: 200,
            statusReason: 'OK',
            time: '2023-06-12T17:25:50.729Z',
          },
        }
      );
      cy.visit('/login');
      cdc.loginWithoutScreenSet(
        cdc.b2cConsentTestUser.email,
        cdc.b2cConsentTestUser.password
      );
      cy.get('.cx-dialog-header').contains('Profile Completion');
      cy.get('.btn.btn-primary.disabled').contains('Submit');
      cy.get('input[name="terms.test.terms.of.use"]').check();
      cy.get('.btn.btn-primary').contains('Submit').click();
      cdc.verifyLoginOrRegistrationSuccess(cdc.b2cConsentTestUser.fullName);
    });
  });
  describe('My Account-> Consent Management', () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(
        cdc.b2cConsentTestUser.email,
        cdc.b2cConsentTestUser.password
      );
      navigateToConsentPage();
    });
    it('should successfully withdraw a cdc consent', () => {
      cy.get('input[name="consent.survey"]').should('be.checked');
      cy.get('input[name="consent.survey"]').uncheck();
      cy.get('input[name="consent.survey"]').should('not.be.checked');
      alerts
        .getSuccessAlert()
        .should('contain', 'Consent successfully withdrawn');
    });
    it('should successfully give a cdc consent', () => {
      cy.get('input[name="consent.survey"]').should('not.be.checked');
      cy.get('input[name="consent.survey"]').check();
      cy.get('input[name="consent.survey"]').should('be.checked');
      alerts.getSuccessAlert().should('contain', 'Consent successfully given');
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
      //verifyGlobalMessageAfterRegistration(); //add this after bug fix
      cdc.verifyLoginOrRegistrationSuccess(cdc.user.fullName); //remove this after bug fix
    });
  });
});
