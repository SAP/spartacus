/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

describe('Login', () => {
  const gigyaBaseUrl = 'https://195050448833.eu1.my.gigya-ext.com';

  it('should login successfully and redirect to spatarcus storefront home page', () => {
    cy.visit('/login');
    cy.get('.cx-spinner').should('be.visible');
    cy.origin(gigyaBaseUrl, () => {
      cy.get('[placeholder="Email *"]').type('grace.b2b@sap.com');
      cy.get('[placeholder="Password *"]').type('Pw4all.');
      cy.get('[type="submit"][data-screenset-roles="instance"]').click();
    }).then(() => {
      cy.url().should('include', '/login');
      cy.get('.cx-spinner').should('be.visible');
      cy.url().should('not.include', '/login');
      cy.get('.cx-login-greet').should('be.visible');
      cy.get('.cx-login-greet').should('contain', 'Hi');
      cy.get('[alt="25% Great Prices and Great Deals"]').should('be.visible');
    });
  });

  it('should login successfully and redirect to previous storefront product details page', () => {
    cy.visit('/product/3755219/psr-960');
    cy.get('cx-product-intro').should('be.visible');
    cy.visit('/login');
    cy.get('.cx-spinner').should('be.visible');
    cy.origin(gigyaBaseUrl, () => {
      cy.get('[placeholder="Email *"]').type('grace.b2b@sap.com');
      cy.get('[placeholder="Password *"]').type('Pw4all.');
      cy.get('[type="submit"][data-screenset-roles="instance"]').click();
    }).then(() => {
      cy.url().should('include', '/login');
      cy.get('.cx-spinner').should('be.visible');
      cy.get('.cx-login-greet').should('be.visible');
      cy.get('.cx-login-greet').should('contain', 'Hi');
      cy.get('cx-product-intro').should('be.visible');
    });
  });
});
