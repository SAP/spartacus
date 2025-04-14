/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

describe('Login Page Accessibility', () => {
  beforeEach(() => {
    cy.a11yContinuumSetup();
    cy.visit('/login');
    cy.get('cx-login').should('exist');
  });

  it('should pass a11y on initial form', () => {
    cy.get('form').a11yRunContinuumTest();
  });

  it('should show validation errors and pass a11y', () => {
    cy.get('form button[type="submit"]').click();
    cy.get('form').a11yRunContinuumTest();
  });

  it('should pass a11y on forgot password link', () => {
    cy.get('a.btn-link')
      .contains(/forgot password/i)
      .scrollIntoView()
      .a11yRunContinuumTest();
  });

  it('should pass a11y on submit button', () => {
    cy.get('form button[type="submit"]')
      .scrollIntoView()
      .a11yRunContinuumTest();
  });
});
