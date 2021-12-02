import * as updateProfile from '../../../helpers/update-profile';
import { checkBanner } from '../../../helpers/homepage';
import * as login from '../../../helpers/login';
import { viewportContext } from '../../../helpers/viewport-context';


describe('My Account - Update Profile', () => {
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

      // Core e2e test. Repeat in mobile view. 
      updateProfile.testUpdateProfileDetails();

      it('should be able to see the new profile info', () => {
        // check where the user's details updated in the previous test
        cy.get('cx-update-profile').within(() => {
          cy.get('[formcontrolname="titleCode"]')
            .find(':selected')
            .should('have.value', updateProfile.newTitle);
          cy.get('[formcontrolname="firstName"]').should(
            'have.value',
            updateProfile.newFirstName
          );
          cy.get('[formcontrolname="lastName"]').should(
            'have.value',
            updateProfile.newLastName
          );
        });
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
