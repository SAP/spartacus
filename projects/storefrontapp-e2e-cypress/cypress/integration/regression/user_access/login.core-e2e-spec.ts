import * as login from '../../../helpers/login';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Login', () => {
  viewportContext(['mobile'], () => {
    before(() => {
      cy.visit('/login');
      login.registerUserFromLoginPage();
    });

    it(['login','smoke_b2c'], 'should login and logout successfully with correct credentials', () => {
      login.loginUser();

      const tokenRevocationRequestAlias =
        login.listenForTokenRevocationRequest();
      login.signOutUser();
      cy.wait(tokenRevocationRequestAlias);
    });

    it(['login', 'smoke_b2c'], 'login should fail if password is wrong', () => {
      cy.visit('/login');
      login.loginWithBadCredentialsFromLoginPage();
    });
  });
});
