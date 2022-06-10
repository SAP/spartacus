import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import { waitForPage } from '../../../helpers/checkout-flow';

context('Password Visibility', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      clearAllStorage();
    });

    it('should hide password by default', () => {
      const loginPage = waitForPage('/login', 'getLoginPage');
      cy.visit('/login');
      cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);

      cy.get('button[aria-label="Show password"]').should('be.visible');
    });

    it('should show and hide password when toggled', () => {
      const loginPage = waitForPage('/login', 'getLoginPage');
      cy.visit('/login');
      cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);

      cy.get('button[aria-label="Show password"]').click();
      cy.get('input[aria-label="Password"]').type('abc');
      cy.get('input[aria-label="Password"]').should('have.value', 'abc');

      cy.get('button[aria-label="Hide password"]').click();
    });

    it('should verify password is hidden by default on registration page', () => {
      const registerPage = waitForPage('/login/register', 'getRegisterPage');
      cy.visit('/login/register');
      cy.wait(`@${registerPage}`).its('response.statusCode').should('eq', 200);

      cy.get('button[aria-label="Show password"]').should('have.length', 2);
    });

    it('should verify password is hidden by default on my account password page', () => {
      cy.requireLoggedIn();
      const myAccountUpdatePasswordPage = waitForPage(
        '/my-account/update-password',
        'getMyAccountUpdatePasswordPage'
      );
      cy.visit('/my-account/update-password');
      cy.wait(`@${myAccountUpdatePasswordPage}`)
        .its('response.statusCode')
        .should('eq', 200);

      cy.get('button[aria-label="Show password"]').should('have.length', 3);
    });
  });
});
