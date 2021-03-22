import * as cdc from '../../../../helpers/vendor/cdc/cdc';

describe('Register', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.visit('/cdc/login');
  });

  it('should update and redirect to login page', () => {
    cdc.registerUser();
    cdc.verifyRegistrationSuccess();

    cy.selectUserMenuOption({
      option: 'Profile Details',
    });

    cdc.updateUserProfile();
    cdc.verifyProfileUpdateSuccess();
  });
});
