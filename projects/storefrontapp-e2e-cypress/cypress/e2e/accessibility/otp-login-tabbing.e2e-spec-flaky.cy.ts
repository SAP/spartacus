/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { verifyTabbingOrder } from '../../helpers/accessibility/tabbing-order';
import { tabbingOrderConfig as config } from '../../helpers/accessibility/tabbing-order.config';

describe('Tabbing order for OTP login', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  describe('OTP login', () => {
    context('OTP Login page', () => {
      beforeEach(() => {
        cy.visit('/login');
        cy.get('cx-otp-login-form').should('exist');
        cy.get('cx-otp-login-form form').should('exist');
      });
      it('should allow to navigate with tab key for otp login form(empty form)', () => {
        verifyTabbingOrder('cx-otp-login-form', config.otpLogin);
      });

      it('should allow to navigate with tab key for otp login form(filled out form)', () => {
        const { email: username, password } = user;
        cy.get('cx-otp-login-form form').within(() => {
          cy.get('[formcontrolname="userId"]').clear().type(username);
          cy.get('[formcontrolname="password"]').clear().type(password);
        });
        verifyTabbingOrder('cx-otp-login-form', config.otpLogin);
      });
    });

    // it('should allow to navigate with tab key for otp verification token form', () => {
    //   cy.visit('/login/verify-token');
    //   cy.get('cx-verification-token-form').should('exist');
    //   cy.get('cx-verification-token-form form').should('exist');

    //   verifyTabbingOrder(
    //     'cx-verification-token-form',
    //     config.verifyToken
    //   );
    // });

    // it('should allow to navigate with tab key for otp verification token dialog', () => {
    //   cy.visit('/login/verify-token');
    //   cy.get('cx-verification-token-form form').within(() => {
    //     cy.get('.right-text .btn-link')
    //       .first()
    //       .contains("Didn't receive the code?")
    //       .click()
    //       .then(() => {
    //         cy.get('cx-verification-token-dialog').should('exist');

    //         verifyTabbingOrder(
    //           'cx-verification-token-dialog',
    //           config.verifyTokenDialog
    //         );
    //       });
    //   });
    // });
  });
});
