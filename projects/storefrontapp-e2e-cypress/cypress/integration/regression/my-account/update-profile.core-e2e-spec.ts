import * as updateProfile from '../../../helpers/update-profile';
import * as login from '../../../helpers/login';
import { viewportContext } from '../../../helpers/viewport-context';

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

      updateProfile.testUpdateProfileDetails();

      afterEach(() => {
        cy.saveLocalStorage();
      });

      after(() => {
        login.signOutUser();
      });
    });
  });
});
