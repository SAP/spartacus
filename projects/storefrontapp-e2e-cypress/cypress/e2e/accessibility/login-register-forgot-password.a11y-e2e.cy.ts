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
      cy.a11yContinuumSetup(); // Setup a11y scanning tool
    });

    it('should pass a11y scan for the Login Page', () => {
      cy.visit('/login');

      // Focus on the first input field to trigger validation (e.g., email field)
      cy.get('input[formControlName="userId"]').focus();

      // Submit the form to trigger validation and validation hints
      cy.get('form').submit(); // Trigger validation on form fields

      // Run full accessibility scan for the Login Page
      cy.a11yRunContinuumTest(); // This will scan the whole page for a11y issues
    });

    it('should pass a11y scan for the Forgot Password Page', () => {
      cy.visit('/login/forgot-password');

      // Focus on the email input to trigger validation and hints
      cy.get('input[formControlName="userEmail"]').focus();

      // Submit the form to trigger validation and validation hints
      cy.get('form').submit(); // Trigger validation on form fields

      // Run full accessibility scan for the Forgot Password Page
      cy.a11yRunContinuumTest(); // This will scan the whole page for a11y issues
    });

    it('should pass a11y scan for the Register Page', () => {
      cy.visit('/login/register');

      // Focus on the first input field (e.g., email field) to trigger validation
      cy.get('input[formControlName="email"]').focus();

      // Submit the form to trigger validation and validation hints
      cy.get('form').submit(); // Trigger validation on form fields

      // Run full accessibility scan for the Register Page
      cy.a11yRunContinuumTest(); // This will scan the whole page for a11y issues
    });
  }
);
