/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as checkout from '../../../helpers/checkout-flow';

describe('Login', () => {
  const gigyaBaseUrl = 'https://166957287542.eu1.my.gigya-ext.com';

  it('should login successfully and redirect to spatarcus storefront home page', () => {
    cy.visit('/login');
    cy.origin(gigyaBaseUrl, () => {
      cy.get('[placeholder="Email *"]').type('keenreviewer1@hybris.com');
      cy.get('[placeholder="Password *"]').type('Pw4all@');
      cy.get('[type="submit"][data-screenset-roles="instance"]').click();
    }).then(() => {
      cy.url().should('include', '/login');
      cy.url().should('not.include', '/login');
      cy.get('.cx-login-greet').should('be.visible');
      cy.get('.cx-login-greet').should('contain', 'Hi');
      cy.get(
        '[title="Save Big on Select Camera Accessories & Supplies"]'
      ).should('be.visible');
    });
  });

  it('should login successfully and redirect to previous storefront product details page', () => {
    checkout.goToProductDetailsPage();
    cy.visit('/login');
    cy.origin(gigyaBaseUrl, () => {
      cy.get('[placeholder="Email *"]').type('keenreviewer1@hybris.com');
      cy.get('[placeholder="Password *"]').type('Pw4all@');
      cy.get('[type="submit"][data-screenset-roles="instance"]').click();
    }).then(() => {
      cy.url().should('include', '/login');
      cy.get('.cx-login-greet').should('be.visible');
      cy.get('.cx-login-greet').should('contain', 'Hi');
      cy.get('cx-product-intro').should('be.visible');
    });
  });
});
