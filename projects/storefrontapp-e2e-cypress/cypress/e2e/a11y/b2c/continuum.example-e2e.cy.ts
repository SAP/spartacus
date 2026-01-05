/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This is an example to show how we can setup and use Access Continuum to test accessibility in e2e tests.
 */
context('Access Continuum examples', () => {
  before(() => {
    // Continuum only needs to be set up once per testing context;
    // the page under test can change without having to set up Continuum again
    cy.a11yContinuumSetup();
  });

  describe('Homepage', { testIsolation: false }, () => {
    before(() => {
      // We make sure that the content is loaded before we run the test.
      cy.visit('/').get('cx-carousel');
    });

    it('Header Body', () => {
      cy.get('[section="header"]').a11yRunContinuumTest();
    });

    it('Homepage Content', () => {
      // Since we want to avoid testing sections more than once,
      // we can limit the scope of the test to the unique elements on the page.
      // In this case we do not want to test the header again.
      cy.get('main').a11yRunContinuumTest();
    });
  });

  describe('PDP', { testIsolation: false }, () => {
    before(() => {
      cy.visit('/product/300938/').get('cx-product-details-tab');
    });

    it('PDP Content', () => {
      cy.get('main').a11yRunContinuumTest();
    });

    // We put conditionally displayed content in separate tests.
    it('PDP reviews panel', () => {
      cy.get('button').contains(' Show reviews ').click().get('.review');
      // We scope it to the review panel to avoid testing the whole page again.
      cy.get('cx-product-reviews').a11yRunContinuumTest();
    });

    it('PDP write a review form', () => {
      cy.get('button').contains(' Show reviews ').click().get('.review');
      cy.get('button').contains(' Write a Review ').click();
      cy.get('cx-product-reviews').a11yRunContinuumTest();
    });
  });
});
