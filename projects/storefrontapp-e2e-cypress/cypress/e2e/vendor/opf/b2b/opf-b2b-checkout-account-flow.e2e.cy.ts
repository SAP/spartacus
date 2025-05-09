import { waitForPage } from '../../../../helpers/checkout-flow';
import { waitForProductPage } from '../../../../helpers/checkout-flow';
import {
  POWERTOOLS_BASESITE,
  products,
} from '../../../../sample-data/b2b-checkout';

context('OPF B2B - Account Checkout flow', () => {
  before(() => {
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
  });

  it('Should checkout using an account payment type', () => {
    // Login
    cy.visit('/login');
    cy.get('cx-login-form').within(() => {
      cy.get('[formcontrolname="userId"]').type('william.hunter@rustic-hw.com');
      cy.get('[formcontrolname="password"]').type('pw4all');
      cy.get('button[type="submit"]').click();
    });

    const code = products[0].code;
    const productPage = waitForProductPage(code, 'getProductPage');

    cy.visit(`${POWERTOOLS_BASESITE}/en/USD/product/${code}`);
    cy.wait(`@${productPage}`).its('response.statusCode').should('eq', 200);

    cy.get('cx-product-intro').within(() => {
      cy.get('.code').should('contain', products[0].code);
    });
    cy.get('cx-breadcrumb').within(() => {
      cy.get('h1').should('contain', products[0].name);
    });

    cy.get('cx-add-to-cart')
      .findByText(/Add To Cart/i)
      .click();
    cy.get('cx-added-to-cart-dialog').within(() => {
      cy.get('.cx-name .cx-link').should('contain', products[0].name);
    });

    const paymentTypePage = waitForPage(
      '/checkout/opf-payment-type',
      'getPaymentType'
    );
    cy.findByText(/proceed to checkout/i).click();
    cy.wait(`@${paymentTypePage}`).its('response.statusCode').should('eq', 200);

    // Intercept active configurations request
    cy.intercept({
      method: 'GET',
      pathname: '**/active-configurations**',
    }).as('activeConfigurations');

    // Wait for active configurations to load
    cy.wait('@activeConfigurations', { timeout: 20000 })
      .its('response.statusCode')
      .should('eq', 200);

    // Enter PO number and select payment type
    cy.get('cx-opf-b2b-checkout-payment-type').within(() => {
      // cy.get('[formcontrolname="poNumber"]')
      //   .should('be.visible')
      //   .clear()
      //   .type('123');

      cy.intercept({
        method: 'GET',
        pathname: '**/carts/**',
      }).as('cartRefresh');

      cy.intercept({
        method: 'GET',
        pathname: '**/paymentOption**',
      }).as('paymentOption');

      // Select Account Payment radio button
      cy.get('input#paymentId-2688')
        .should('be.visible')
        .check({ force: true });

      // Wait 10 seconds to allow for all requests to complete
      cy.wait(10000).then(() => {
        // Then wait for payment option
        cy.wait({ timeout: 10000 })
          .its('response.statusCode')
          .should('eq', 200)
          .then(() => {
            // Finally wait for cart refresh again
            cy.wait({ timeout: 10000 })
              .its('response.statusCode')
              .should('eq', 200)
              .then(() => {
                // Click continue button within the component
                cy.get('.cx-checkout-btns').within(() => {
                  cy.get('.btn-primary').should('be.visible').click();
                });
              });
          });
      });
    });
  });
});
