import * as cdc from '../../../../helpers/vendor/cdc/cdc';

describe('CDC B2B scenarios', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  describe('Login existing B2B Customer with Screenset', () => {
    before(() => {
      cy.visit('/cdc/login');
    });

    it('should login and redirect to home page', () => {
      cdc.loginB2BUser();
      cdc.verifyLoginOrRegistrationSuccess();
    });
  });

  describe('Login existing Customer with Native UI', () => {
    before(() => {
      cy.visit('/login');
    });

    it('should login and redirect to home page', () => {
      cdc.loginB2BWithoutScreenSet();
      cdc.verifyLoginOrRegistrationSuccess();
    });
  });

  describe('Update profile', () => {
    before(() => {
      cy.visit('/cdc/login');
      cdc.loginB2BUser();
    });

    it('should update profile', () => {
      cy.selectUserMenuOption({
        option: 'Profile Details',
      });

      cdc.updateUserProfile();
      cdc.verifyProfileUpdateSuccess();
    });
  });

  describe('Update profile without screenset', () => {
    before(() => {
      cdc.loginUser();
      cy.visit('/cdc/login');
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
