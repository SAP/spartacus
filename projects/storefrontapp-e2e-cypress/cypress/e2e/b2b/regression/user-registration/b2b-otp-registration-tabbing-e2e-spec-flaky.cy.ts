/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  verifyTabbingOrderForRegistrationWithOTP,
  verifyTabbingOrderForOTPVerification,
} from '../../../../helpers/b2b/b2b-user-registration';

export function visitLoginPage() {
  cy.visit('/');
  cy.getLoginRegisterLink({ clickAndWait: true });
}

describe('Tabbing order for B2B OTP registration', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  describe('B2B OTP Registration', () => {
    context('B2B OTP Registration page', () => {
      beforeEach(() => {
        visitLoginPage();
        cy.get('cx-link.cx-organization-user-register-button').click();      
      });
      it('should allow to navigate with tab key for otp registration form and otp verification page(CXSPA-8772)', () => {
        cy.get('cx-user-registration-form').should('exist');
        cy.get('[formcontrolname="titleCode"]').ngSelect('Mr.');
        cy.get('[formcontrolname="firstName"]').type('John');
        cy.get('[formcontrolname="lastName"]').type('Doe');
        cy.get('[formcontrolname="companyName"]').type('My Company Inc.');
        cy.get('[formcontrolname="email"]').type('test.test@sap.com');
        verifyTabbingOrderForRegistrationWithOTP();

        cy.get('button[type=submit]').click();
        cy.get('cx-verification-token-form').should('exist');
        verifyTabbingOrderForOTPVerification();
      });
    });
  });
});
