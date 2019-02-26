import { user } from '../sample-data/big-happy-path';
import { register, login } from '../helpers/auth-forms';

describe('Login', () => {
  const userGreetSelector = 'cx-login .cx-login-status__greet';
  const loginLinkSelector = 'cx-login [role="link"]';

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');

    cy.get(loginLinkSelector).click();
    cy.get('cx-page-layout')
      .getByText('Register')
      .click();
    register(user);

    cy.get(userGreetSelector).should('contain', user.fullName);

    cy.selectUserMenuOption('Sign Out');

    cy.get(userGreetSelector).should('not.exist');
  });

  it('should login successfully with correct credentials', () => {
    cy.get(loginLinkSelector).click();
    login(user.email, user.password);

    cy.get(userGreetSelector).should('contain', user.fullName);

    cy.selectUserMenuOption('Sign Out');

    cy.get(userGreetSelector).should('not.exist');
  });

  it('login should fail if password is wrong', () => {
    cy.get(loginLinkSelector).click();

    login(user.email, 'Password321');

    cy.get(userGreetSelector).should('not.exist');

    cy.get('cx-global-message .alert-danger').should(
      'contain',
      'Bad credentials. Please login again'
    );
  });
});
