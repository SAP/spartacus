import * as login from '../../helpers/login';

describe('Login', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');

    login.registerUser();

    login.signOutUser();
  });

  it('should login successfully with correct credentials', () => {
    login.loginUser();

    login.signOutUser();
  });

  it('login should fail if password is wrong', () => {
    login.loginWithBathCredentials();
  });
});
