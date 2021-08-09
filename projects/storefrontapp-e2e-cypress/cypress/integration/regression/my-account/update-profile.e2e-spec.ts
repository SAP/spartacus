import * as alerts from '../../../helpers/global-message';
import { checkBanner } from '../../../helpers/homepage';
import * as login from '../../../helpers/login';
import { viewportContext } from '../../../helpers/viewport-context';

const newTitle = 'dr';
const newFirstName = 'N';
const newLastName = 'Z';
const UPDATE_PROFILE_URL = '/my-account/update-profile';

describe('My Account - Update Profile', () => {
  viewportContext(['desktop', 'mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('update profile test for anonymous user', () => {
      it('should redirect to login page for anonymous user', () => {
        cy.visit(UPDATE_PROFILE_URL);
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

      it('should be able to update profile details', () => {
        cy.get('cx-update-profile').within(() => {
          cy.get('[formcontrolname="titleCode"]').select(newTitle);
          cy.get('[formcontrolname="firstName"]').clear().type(newFirstName);
          cy.get('[formcontrolname="lastName"]').clear().type(newLastName);
          cy.get('button').click();
        });

        // check for the global message and home screen
        alerts
          .getSuccessAlert()
          .should('contain', 'Personal details successfully updated');
        checkBanner();

        // check is the new name displayed in the upper right corner
        cy.get('.cx-login-greet').should(
          'contain',
          `Hi, ${newFirstName} ${newLastName}`
        );
      });

      it('should be able to see the new profile info', () => {
        // check where the user's details updated in the previous test
        cy.get('cx-update-profile').within(() => {
          cy.get('[formcontrolname="titleCode"]')
            .find(':selected')
            .should('have.value', newTitle);
          cy.get('[formcontrolname="firstName"]').should(
            'have.value',
            newFirstName
          );
          cy.get('[formcontrolname="lastName"]').should(
            'have.value',
            newLastName
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
