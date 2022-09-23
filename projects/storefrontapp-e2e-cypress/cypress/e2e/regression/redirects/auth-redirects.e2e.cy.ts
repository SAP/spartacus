import * as authForms from '../../../helpers/auth-forms';
import { createUser, revokeAccessToken } from '../../../helpers/auth-redirects';
import { AccountData } from '../../../support/require-logged-in.commands';

context('Redirect after auth', () => {
  let user: AccountData;

  before(() => {
    user = createUser();
  });

  it('should redirect back after the forced login when access token expired and page was refreshed', () => {
    cy.requireLoggedIn(user);
    cy.visit('/my-account/update-profile');
    cy.location('pathname').should('contain', '/my-account/update-profile');

    revokeAccessToken();
    cy.reload();

    cy.location('pathname').should('contain', `/login`);
    cy.get('cx-global-message div').should(
      'contain',
      'Your session has expired. Please login again.'
    );

    authForms.login(
      user.registrationData.email,
      user.registrationData.password
    );

    cy.location('pathname').should('contain', '/my-account/update-profile');
  });

  it('should redirect back after the forced login when access token expired and http call was made', () => {
    cy.requireLoggedIn(user);
    cy.visit('/my-account/consents');
    cy.location('pathname').should('contain', '/my-account/consents');

    cy.get('cx-consent-management-form .form-check').first().click();
    revokeAccessToken();
    cy.get('cx-consent-management-form .form-check').first().click();

    cy.location('pathname').should('contain', `/login`);
    cy.get('cx-global-message div').should(
      'contain',
      'Your session has expired. Please login again.'
    );

    authForms.login(
      user.registrationData.email,
      user.registrationData.password
    );

    cy.location('pathname').should('contain', '/my-account/consents');
  });

  it('should not redirect after the login to: /login, /register nor /forgot-password', () => {
    cy.visit(`/my-account/update-profile`);

    cy.location('pathname').should('match', /\/login$/);
    cy.get('cx-login-form')
      .findByText(/Forgot Password/i)
      .click();

    cy.location('pathname').should('match', /\/login\/forgot-password$/);
    cy.get('cx-forgot-password').findByText('Cancel').click();

    cy.get('cx-login-register')
      .findByText(/Register/i)
      .click();

    cy.location('pathname').should('match', /\/login\/register$/);
    cy.get('cx-register')
      .findByText(/I already have an account. Sign In/i)
      .click();

    cy.location('pathname').should('match', /\/login$/);

    authForms.login(
      user.registrationData.email,
      user.registrationData.password
    );

    cy.location('pathname').should('contain', '/my-account/update-profile');
  });
});
