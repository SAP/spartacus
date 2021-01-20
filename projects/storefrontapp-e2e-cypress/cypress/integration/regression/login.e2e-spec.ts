import * as login from '../../helpers/login';

describe('Login', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.visit('/');

    login.registerUser();
  });

  it('should login and logout successfully with correct credentials', () => {
    login.loginUser();

    const tokenRevocationRequestAlias = login.listenForTokenRevocationRequest();
    login.signOutUser();
    cy.wait(tokenRevocationRequestAlias);
  });

  it('login should fail if password is wrong', () => {
    login.loginWithBadCredentials();
  });
});
