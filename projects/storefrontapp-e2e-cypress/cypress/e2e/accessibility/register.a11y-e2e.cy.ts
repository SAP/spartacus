/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

describe('Registration Page Accessibility', () => {
  beforeEach(() => {
    cy.a11yContinuumSetup();
    cy.visit('/login/register');
    cy.get('cx-register').should('exist');
  });

  it('should pass a11y on initial form', () => {
    cy.get('form').a11yRunContinuumTest();
  });

  it('should show validation errors and pass a11y', () => {
    cy.get('form button[type="submit"]').click();
    cy.get('form').a11yRunContinuumTest();
  });

  it('should pass a11y on title dropdown', () => {
    cy.get('#title-select').click();
    cy.get('.ng-dropdown-panel').should('be.visible').a11yRunContinuumTest();
  });

  it('should pass a11y on terms and conditions checkbox and link', () => {
    cy.get('input[name="termsandconditions"]')
      .scrollIntoView()
      .parent()
      .a11yRunContinuumTest();
  });

  it('should pass a11y on sign-in link', () => {
    cy.get('a.cx-login-link').a11yRunContinuumTest();
  });
});
