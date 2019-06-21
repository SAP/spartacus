import { checkBanner } from '../../../helpers/homepage';

const UPDATE_PROFILE_URL = '/my-account/update-profile';

describe('Update profile', () => {
  describe('when an anonymous user tries to access the page', () => {
    it('should be redirected to the login page', () => {
      cy.visit(UPDATE_PROFILE_URL);
      cy.location('pathname').should('contain', '/login');
    });
  });

  describe('when a user is logged in', () => {
    before(() => {
      cy.requireLoggedIn();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
      cy.visit(UPDATE_PROFILE_URL);
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    const newTitle = 'dr';
    const newFirstName = 'N';
    const newLastName = 'Z';

    it('should be able to update its profile', () => {
      // update the data
      cy.get('cx-update-profile-form').within(() => {
        cy.get('[formcontrolname="titleCode"]').select(newTitle);
        cy.get('[formcontrolname="firstName"]')
          .clear()
          .type(newFirstName);
        cy.get('[formcontrolname="lastName"]')
          .clear()
          .type(newLastName);
        cy.get('button[type="submit"]').click();
      });

      // check for the global message and home screen
      cy.get('cx-global-message .alert-success').should(
        'contain',
        'Personal details successfully updated'
      );
      checkBanner();

      // check is the new name displayed in the upper right corner
      cy.get('.cx-login-greet').should(
        'contain',
        `Hi, ${newFirstName} ${newLastName}`
      );
    });

    it('should be able to see the new updated profile', () => {
      // check where the user's details updated in the previous test
      cy.get('cx-update-profile-form').within(() => {
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

    it('should be able to cancel and go back to home', () => {
      cy.get('cx-update-profile-form').within(() => {
        cy.get('button[type="button"]').click();
      });
      checkBanner();

      cy.location('pathname').should('contain', '/');
    });
  });
});
