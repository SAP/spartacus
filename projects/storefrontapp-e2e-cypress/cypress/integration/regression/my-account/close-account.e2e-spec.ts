import { randomString, generateMail } from '../../../helpers/user';
import { standardUser } from '../../../sample-data/shared-users';
import { login } from '../../../helpers/auth-forms';

const CLOSE_ACCOUNT = '/my-account/close-account';

describe('Close Account', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  describe('when an anonymous user tries to access the page', () => {
    it('should be redirected to the login page', () => {
      cy.visit(CLOSE_ACCOUNT);
      cy.location('pathname').should('contain', '/login');
    });
  });

  describe('when a user is logged in', () => {
    before(() => {
      standardUser.registrationData.email = generateMail(randomString(), true);
      cy.requireLoggedIn(standardUser);
    });

    beforeEach(() => {
      cy.visit(CLOSE_ACCOUNT);
    });

    it('should be able to cancel and go back to home', () => {
      cy.get('cx-close-account a').click({ force: true });

      cy.get('.ElectronicsHompageSplashBannerComponent').should('exist');

      cy.location('pathname').should('contain', '/');
    });

    it('should be able to close account', () => {
      cy.server();
      cy.route('DELETE', '/rest/v2/electronics-spa/users/*').as('deleteQuery');
      cy.location('pathname').should('contain', CLOSE_ACCOUNT);

      cy.get('cx-close-account button').click({ force: true });

      cy.get(
        'cx-close-account-modal .cx-btn-group button:first-of-type'
      ).click();

      cy.wait('@deleteQuery');

      cy.get('.ElectronicsHompageSplashBannerComponent').should('exist');

      cy.location('pathname').should('contain', '/');

      cy.get('cx-global-message').should(
        'contain',
        'Account closed with success'
      );
    });

    it('should not allow login on closed account', () => {
      cy.get('cx-login [role="link"]').click();
      login(
        standardUser.registrationData.email,
        standardUser.registrationData.password
      );

      cy.location('pathname').should('contain', '/login');

      cy.get('cx-global-message').should('contain', 'User is disabled');
    });
  });
});
