import * as login from '../../../helpers/login';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Login', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  });

  viewportContext(['desktop'], () => {
    before(() => {
      cy.visit('/login');
      login.registerUserFromLoginPage();
    });

    it('should not login with wrong password', () => {
      cy.visit('/login');
      login.loginWithBadCredentialsFromLoginPage();
    });

    it('should login and logout successfully', () => {
      login.loginUser();

      const tokenRevocationRequestAlias =
        login.listenForTokenRevocationRequest();
      login.signOutUser();
      cy.wait(tokenRevocationRequestAlias);
    });
  });
});
