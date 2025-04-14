/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

describe('Forgot Password Page Accessibility', () => {
  beforeEach(() => {
    cy.a11yContinuumSetup();
    cy.visit('/login/forgot-password');
    cy.get('cx-forgot-password').should('exist');
  });

  it('should pass a11y on initial form', () => {
    cy.get('form').a11yRunContinuumTest();
  });

  it('should show validation error and pass a11y', () => {
    cy.get('form button.btn-primary').first().click();
    cy.get('form').a11yRunContinuumTest();
  });

  it('should pass a11y on cancel button', () => {
    cy.contains('button, a', 'Cancel').scrollIntoView().a11yRunContinuumTest();
  });

  it('should pass a11y on submit button', () => {
    cy.get('form .btn-primary').scrollIntoView().a11yRunContinuumTest();
  });
});
