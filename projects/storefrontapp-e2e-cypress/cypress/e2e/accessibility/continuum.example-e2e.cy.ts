/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This is an example to show how we can setup and use Access Continuum to test accessibility in e2e tests.
 */
context('Access Continuum', () => {
  before(() => {
    // Continuum only needs to be set up once per testing context;
    // the page under test can change without having to set up Continuum again
    cy.a11yContinuumSetup('cypress/continuum.conf.ts');
  });

  describe('Homepage', () => {
    before(() => {
      cy.visit('/').wait(3_000);
    });

    checkA11yConcerns();
  });

  describe('PLP', () => {
    before(() => {
      cy.visit('Open-Catalogue/Cameras/Digital-Cameras/c/575').wait(3_000);
    });

    checkA11yConcerns();
  });
});

function checkA11yConcerns() {
  it('should NOT have any accessibility concerns', () => {
    cy.a11yContinuumRunAllTests()
      .a11YContinuumPrintResults()
      .a11YContinuumFailIfConcerns();
  });
}
