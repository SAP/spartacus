import { viewportContext } from '../../../helpers/viewport-context';
import { isolateTests } from '../../../support/utils/test-isolation';

export const user = {
  name: 'Mr.User',
  password: '1234',
  email: 'user@test.com',
};

export const userNameSelector= 'cx-myaccount-view-name .cx-name';
export const signOutLinkSelector = 'cx-myaccount-view-name .cx-sign-out [role="link"]';
export const userGreetSelector = 'cx-login .cx-login-greet';

describe('My Account - Landing Page', { testIsolation: false }, () => {
  viewportContext(['mobile', 'desktop'], () => {
    isolateTests();
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('Anonymous user', () => {
      it('should redirect user to login page', () => {
        cy.visit('/my-account');
        cy.location('pathname').should('contain', '/login');
      });
    });

    describe('Landing Page', () => {
      viewportContext(['mobile', 'desktop'], () => {
        isolateTests();
        before(() => {
          cy.window().then((win) => win.sessionStorage.clear());
          cy.requireLoggedIn();
          cy.reload();
          cy.visit('/');
        });

        beforeEach(() => {
          cy.restoreLocalStorage();
        });
        afterEach(() => {
          cy.saveLocalStorage();
        });

        it('should go to MyAccount page', () => {
          cy.selectUserMenuOption({
            option: 'My Account',
          });
          cy.wait('/my-account').its('response.statusCode').should('eq', 200);
        });

        it('name of the user should exist',() => {
          cy.get(userNameSelector).should('exist');
        });

        it('should sign out',() => {
         cy.get(signOutLinkSelector).click();
         cy.get(userGreetSelector).should('not.exist');
        });
      });
    });
  });
});
