/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

context('scroll Position Restoration', () => {
  it('should restore scroll position', () => {
    cy.visit('/');

    cy.log('Go to category page');
    cy.get('cx-category-navigation a').eq(0).click();

    cy.get('cx-product-list-item').should('exist');
    cy.get('cx-product-list-item').eq(3).scrollIntoView();
    cy.get('cx-product-list-item .cx-product-name').eq(3).click();

    cy.log('Go to product details page');
    cy.get('.ProductDetailsPageTemplate').should('exist');
    cy.window().scrollTo('bottom');

    cy.log('Go back to product list');
    cy.go(-1);
    cy.window().its('scrollY').should('be.greaterThan', 0);

    cy.log('Go forward to product details');
    cy.go(1);
    cy.get('.ProductDetailsPageTemplate').should('exist');
    cy.window().then(($window) => {
      expect($window.scrollY).to.be.greaterThan(0);
    });
  });
});
