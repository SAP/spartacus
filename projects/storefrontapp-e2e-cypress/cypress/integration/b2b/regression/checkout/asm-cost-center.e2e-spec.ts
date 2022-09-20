import * as b2bCheckout from '../../../../helpers/b2b/b2b-checkout';
import * as asm from '../../../../helpers/asm';
import * as alerts from '../../../../helpers/global-message';
import { POWERTOOLS_BASESITE } from '../../../../sample-data/b2b-checkout';

context('B2B - ASM Account Checkout', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should login as asm agent', () => {
    cy.visit('/?asm=true');
    cy.get('cx-asm-main-ui').should('exist');
    cy.get('cx-asm-main-ui').should('be.visible');
    asm.agentLogin();
  });

  it('should start customer emulation', () => {
    cy.get('cx-csagent-login-form').should('not.exist');
    cy.get('cx-customer-selection').should('exist');
    cy.get('cx-customer-selection form').within(() => {
      cy.get('[formcontrolname="searchTerm"]')
        .should('not.be.disabled')
        .type('william.hunter@pronto-hw.com');
      cy.get('[formcontrolname="searchTerm"]').should(
        'have.value',
        'william.hunter@pronto-hw.com'
      );
    });
    cy.get('cx-customer-selection div.asm-results button').click();
    cy.get('button[type="submit"]').click();
  });

  it('should show error on invalid cost center', () => {
    b2bCheckout.addB2bProductToCartAndCheckout();
    cy.get('cx-payment-type').within(() => {
      cy.findByText('Account').click({ force: true });
    });
    cy.get('button.btn-primary').should('be.enabled').click({ force: true });
    cy.intercept('PUT', '*costcenter?costCenterId=*').as('costCenterReq');

    cy.get('cx-cost-center').within(() => {
      cy.get('select').select('Rustic_Global');
    });

    cy.wait('@costCenterReq').its('response.statusCode').should('eq', 400);
    alerts.getErrorAlert().contains('Invalid cost center.');
  });

  it('should not show error on valid cost center', () => {
    alerts.getErrorAlert().then(() => {
      alerts.getErrorAlert().within(() => {
        cy.get('button').click();
      });
    });
    cy.intercept('PUT', '*costcenter?costCenterId=*').as('costCenterReq');
    cy.get('cx-cost-center').within(() => {
      cy.get('select').select('Pronto_Services');
    });
    cy.wait('@costCenterReq').its('response.statusCode').should('eq', 200);
    alerts.getErrorAlert().should('not.exist');
  });
});
