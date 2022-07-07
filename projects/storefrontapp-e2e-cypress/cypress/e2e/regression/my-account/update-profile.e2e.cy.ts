import * as updateProfile from '../../../helpers/update-profile';
import { checkBanner } from '../../../helpers/homepage';
import * as login from '../../../helpers/login';
import { viewportContext } from '../../../helpers/viewport-context';

describe('My Account - Update Profile', () => {
  viewportContext(['mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    // Core e2e test. Repeat in mobile view.
    updateProfile.testUpdateProfileLoggedInUser();
  });
  viewportContext(['desktop', 'mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('update profile test for anonymous user', () => {
      it('should redirect to login page for anonymous user', () => {
        cy.visit(updateProfile.UPDATE_PROFILE_URL);
        cy.location('pathname').should('contain', '/login');
      });
    });

    describe('update profile test for logged in user', () => {
      before(() => {
        cy.requireLoggedIn();
        cy.visit('/');
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
        cy.selectUserMenuOption({
          option: 'Personal Details',
        });
      });

      it('should be able to cancel and go back to home', () => {
        cy.get('cx-update-profile button').click();
        checkBanner();

        cy.location('pathname').should('contain', '/');
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });

      after(() => {
        login.signOutUser();
      });
    });
  });
});
