import * as cdc from '../../../../helpers/vendor/cdc/cdc';

describe('Register', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.visit('/cdc/login');
  });

  it('should register and redirect to home page', () => {
    cdc.registerUser();
    cdc.verifyRegistrationSuccess();
  });
});
