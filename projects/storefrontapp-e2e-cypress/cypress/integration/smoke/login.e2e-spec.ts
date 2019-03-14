import * as login from '../../helpers/login';

describe('Login', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');

    login.loginPageAndRegister();

    login.verifyUser();
  });

  it('should login successfully with correct credentials', () => {
    login.loginPageAndLogin();

    login.verifyUser();
  });

  it('login should fail if password is wrong', () => {
    login.verifyFakeLogin();
  });
});
