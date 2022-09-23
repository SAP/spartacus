import * as cdc from '../../../../helpers/vendor/cdc/cdc';

describe('CDC', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  describe('Register', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/cdc/login');
    });

    it('should register and redirect to home page', () => {
      cdc.registerUser();
      cdc.verifyLoginOrRegistrationSuccess();
    });
  });

  describe('Login existing Customer', () => {
    before(() => {
      cy.visit('/cdc/login');
    });

    it('should login and redirect to home page', () => {
      cdc.login();
      cdc.verifyLoginOrRegistrationSuccess();
    });
  });
  describe('Update profile', () => {
    before(() => {
      cy.visit('/cdc/login');
      cdc.login();
    });

    it('should update profile', () => {
      cy.selectUserMenuOption({
        option: 'Profile Details',
      });

      cdc.updateUserProfile();
      cdc.verifyProfileUpdateSuccess();
    });
  });
});
