import * as cdc from '../../../../helpers/vendor/cdc/cdc';
import * as login from '../../../../helpers/login';

describe('Login existing Customer', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.visit('/cdc/login');
    cdc.registerUser();
    login.signOutUser();
    cy.visit('/cdc/login');
  });

  it('should login and redirect to home page', () => {
    cdc.login();
    cdc.verifyLoginSuccess();
  });
});
