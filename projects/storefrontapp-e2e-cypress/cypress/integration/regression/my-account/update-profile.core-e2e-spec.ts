import * as alerts from '../../../helpers/global-message';
import { checkBanner } from '../../../helpers/homepage';
import * as login from '../../../helpers/login';
import { viewportContext } from '../../../helpers/viewport-context';

const newTitle = 'dr';
const newFirstName = 'N';
const newLastName = 'Z';

describe('My Account - Update Profile', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
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

      afterEach(() => {
        cy.saveLocalStorage();
      });

      after(() => {
        login.signOutUser();
      });
    });
  });
});
