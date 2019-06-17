import { login } from '../../../helpers/auth-forms';
import { generateMail, randomString } from '../../../helpers/user';
import { checkBanner } from '../../../helpers/homepage';

const UPDATE_EMAIL = '/my-account/update-email';
const password = 'Password123.';
const newUid = generateMail(randomString(), true);

describe('Update email', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  describe('when an anonymous user tries to access the page', () => {
    it('should be redirected to the login page', () => {
      cy.visit(UPDATE_EMAIL);
      cy.location('pathname').should('contain', '/login');
    });
  });

  describe('when a user is logged in', () => {
    before(() => {
      cy.requireLoggedIn();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
      cy.visit(UPDATE_EMAIL);
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    it('should be able to cancel and go back to home', () => {
      cy.get('cx-update-email-form button[type="button"]').click();
      checkBanner();

      cy.location('pathname').should('contain', '/');
    });

    it('should be able to update its email', () => {
      cy.get('cx-breadcrumb h1').should('exist');

      cy.get('cx-update-email-form [formcontrolname="email"]').type(newUid);
      cy.get('cx-update-email-form [formcontrolname="confirmEmail"]').type(
        newUid
      );
      cy.get('cx-update-email-form [formcontrolname="password"]').type(
        password
      );

      cy.get('cx-update-email-form button[type="submit"]').click();

      cy.get('cx-login-form').should('exist');

      cy.get('cx-global-message .alert-success').should(
        'contain',
        `Success. Please sign in with ${newUid}`
      );
    });
  });

  describe('when a user can login with the new email', () => {
    it('should be able to login with its new email', () => {
      login(newUid, password);

      // TODO: uncomment below component and remove update-email assertion when #1957 is implemented
      cy.get('cx-update-email').should('exist');
      // checkBanner();
    });
  });
});
