import { user } from '../../sample-data/big-happy-path';
import { register } from '../../helpers/auth-forms';

describe('Register', () => {
  const loginLink = 'cx-login [role="link"]';

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should contain error when trying to register with the same email', () => {
    cy.get(loginLink).click();
    cy.get('cx-page-layout')
      .getByText('Register')
      .click();
    register(user);

    cy.selectUserMenuOption('Sign Out');

    // attempt to register the same user again
    cy.visit('/');
    cy.get(loginLink).click();
    cy.get('cx-page-layout')
      .getByText('Register')
      .click();
    register(user);

    cy.get('cx-global-message .alert-danger').should('contain', user.email);

    // the url should be still the same
    cy.url().should('match', /\/register/);
  });
});
