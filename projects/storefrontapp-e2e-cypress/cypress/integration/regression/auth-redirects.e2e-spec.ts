import * as authForms from '../../helpers/auth-forms';
import {
  createUser,
  fakeExpiredAccessToken,
} from '../../helpers/auth-redirects';
import { AccountData } from '../../support/require-logged-in.commands';

context('Redirect after auth', () => {
  let user: AccountData;

  before(() => {
    user = createUser();
  });

  it('should redirect back after the login', () => {
    cy.visit(`/contact`);

    cy.get('cx-login').click();
    cy.location('pathname').should('contain', '/login');
    authForms.login(
      user.registrationData.email,
      user.registrationData.password
    );

    cy.location('pathname').should('contain', '/contact');
  });

  it('should redirect back after the forced login', () => {
    cy.visit(`/my-account/address-book`);

    cy.location('pathname').should('contain', '/login');
    authForms.login(
      user.registrationData.email,
      user.registrationData.password
    );

    cy.location('pathname').should('contain', '/my-account/address-book');
  });

  it('should redirect back after the forced login when access token expired and page was refreshed', () => {
    cy.requireLoggedIn(user);
    cy.visit('/my-account/update-profile');
    cy.location('pathname').should('contain', '/my-account/update-profile');

    fakeExpiredAccessToken();
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
