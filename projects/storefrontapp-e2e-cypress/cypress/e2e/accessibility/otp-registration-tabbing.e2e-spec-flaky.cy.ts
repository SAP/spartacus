/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { verifyTabbingOrder } from '../../helpers/accessibility/tabbing-order';
import { tabbingOrderConfig as config } from '../../helpers/accessibility/tabbing-order.config';

describe('Tabbing order for B2C OTP registration', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  describe('B2C OTP registration', () => {
    context('B2C OTP registration page', () => {
      beforeEach(() => {
        cy.visit('/login/register');
        cy.get('cx-otp-register-form').should('exist');
        cy.get('cx-otp-register-form form').should('exist');
      });

      it('should allow to navigate with tab key for otp registration form(filled out form) (CXSPA-3919)', () => {
        cy.get('[formcontrolname="titleCode"]').ngSelect('Mr.');
        cy.get('[formcontrolname="firstName"]').type('John');
        cy.get('[formcontrolname="lastName"]').type('Doe');
        cy.get('[formcontrolname="email"]').type('customer.test@sap.com');
        cy.get('[formcontrolname="newsletter"]').check();
        cy.get('[formcontrolname="termsandconditions"]').check();

        verifyTabbingOrder('cx-otp-register-form', config.otpRegistration);
        cy.get('button[type=submit]').click();
        cy.get('cx-registration-verification-token-form').should('exist');
        verifyTabbingOrder(
          'cx-registration-verification-token-form',
          config.verifyTokenForRegistration
        );
      });
    });
  });
});
