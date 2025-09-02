/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { verifyTabbingOrder } from '../../../helpers/accessibility/tabbing-order';
import { tabbingOrderConfig as config } from '../../../helpers/accessibility/tabbing-order.config';
import { waitForPage } from '../../../helpers/navigation';
import { user } from '../../../sample-data/checkout-flow';

export function visitLoginPage() {
  const homePage = waitForPage('homepage', 'getHomePage');
  cy.visit('/');
  cy.wait(`@${homePage}`);
  cy.getLoginRegisterLink({ clickAndWait: true });
}

describe('Tabbing order for OTP login', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  describe('OTP login', () => {
    beforeEach(() => {
      visitLoginPage();
      cy.get('cx-otp-login-form').should('exist');
      cy.get('cx-otp-login-form form').should('exist');
    });
    it('should allow to navigate with tab key for otp login form(empty form) (CXSPA-6672)', () => {
      verifyTabbingOrder('cx-otp-login-form', config.otpLogin);
    });

    it('should allow to navigate with tab key for otp login form(filled out form) (CXSPA-6672)', () => {
      const { email: username, password } = user;
      cy.get('cx-otp-login-form form').within(() => {
        cy.get('[formcontrolname="userId"]').as('usr').clear();
        cy.get('@usr').type(username);
        cy.get('[formcontrolname="password"]').as('pas').clear();
        cy.get('@pas').type(password);
      });
      verifyTabbingOrder('cx-otp-login-form', config.otpLogin);
    });

    it('should allow to navigate with tab key for otp verification token form (CXSPA-6689)', () => {
      cy.get('cx-otp-login-form form').within(() => {
        cy.get('[formcontrolname="userId"]').as('usr').clear();
        cy.get('@usr').type('test@user.com');
        cy.get('[formcontrolname="password"]').as('pas').clear();
        cy.get('@pas').type('1234');
        cy.get('button[type=submit]').click();
      });
      cy.get('cx-verification-token-form').should('exist');
      cy.get('cx-verification-token-form form').should('exist');

      verifyTabbingOrder('cx-verification-token-form', config.verifyToken);
    });
  });
});
