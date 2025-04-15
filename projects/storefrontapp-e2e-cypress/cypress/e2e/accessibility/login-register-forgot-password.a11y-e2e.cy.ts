/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This test checks accessibility concerns on the pages for Login, Forgot Password, and Register
 */
describe(
  'Login, Register, and Forgot Password Page Accessibility',
  { testIsolation: false },
  () => {
    beforeEach(() => {
      cy.a11yContinuumSetup();
    });

    it('should pass a11y scan for the Login Page', () => {
      cy.visit('/login');

      cy.get('input[formControlName="userId"]').focus();

      cy.get('form').submit();

      cy.a11yRunContinuumTest();
    });

    it('should pass a11y scan for the Forgot Password Page', () => {
      cy.visit('/login/forgot-password');

      cy.get('input[formControlName="userEmail"]').focus();

      cy.get('form').submit();

      cy.a11yRunContinuumTest();
    });

    it('should pass a11y scan for the Register Page', () => {
      cy.visit('/login/register');

      cy.get('input[formControlName="email"]').focus();

      cy.get('form').submit();

      cy.a11yRunContinuumTest();
    });
  }
);
