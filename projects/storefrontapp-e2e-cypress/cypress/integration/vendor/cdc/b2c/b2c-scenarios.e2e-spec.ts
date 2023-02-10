import * as cdc from '../../../../helpers/vendor/cdc/cdc';

describe('CDC', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  describe('Register with Screenset', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/cdc/login');
    });

    it('should register and redirect to home page', () => {
      cdc.registerUser();
      cdc.verifyLoginOrRegistrationSuccess();
    });
  });

  describe('Register with Native UI', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
    });

    it('should register and redirect to home page', () => {
      cdc.registerUserWithoutScreenSet();
      cdc.verifyLoginOrRegistrationSuccess();
    });
  });

  describe('Login existing Customer with Screenset', () => {
    before(() => {
      cy.visit('/cdc/login');
    });

    it('should login and redirect to home page', () => {
      cdc.loginUser();
      cdc.verifyLoginOrRegistrationSuccess();
    });
  });

  describe('Login existing Customer with Native UI', () => {
    before(() => {
      cy.visit('/login');
    });

    it('should login and redirect to home page', () => {
      cdc.loginWithoutScreenSet();
      cdc.verifyLoginOrRegistrationSuccess();
    });
  });

  describe('Update profile', () => {
    before(() => {
      cy.visit('/cdc/login');
      cdc.loginUser();
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
