import { clickHamburger } from '../../helpers/homepage';
import * as login from '../../helpers/login';
import { viewportContext } from '../../helpers/viewport-context';

describe('Login', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
      cy.onMobile(() => {
        clickHamburger();
      });
      login.registerUser();
    });

    it('should login and logout successfully with correct credentials', () => {
      cy.onMobile(() => {
        clickHamburger();
      });
      login.loginUser();

      const tokenRevocationRequestAlias = login.listenForTokenRevocationRequest();
      login.signOutUser();
      cy.wait(tokenRevocationRequestAlias);
    });

    it('login should fail if password is wrong', () => {
      cy.onMobile(() => {
        clickHamburger();
      });
      login.loginWithBadCredentials();
    });

    it('should check keyboard accessibility', () => {
      cy.tabScreenshot({ container: 'main', scenario: 'form' });

      login.loginUser();
      cy.get('cx-navigation-ui.accNavComponent').contains('My Account');

      // TODO: Replace with mobile testing when keyboard is fixed for mobile.
      cy.onDesktop(() => {
        cy.tabScreenshot({ container: 'header', scenario: 'header' });

        cy.get('cx-navigation-ui.accNavComponent')
          .contains('My Account')
          .click();
        cy.get('cx-navigation-ui .is-open .wrapper').should('be.visible');
        cy.tabScreenshot({
          container: 'cx-navigation-ui',
          scenario: 'my-account',
        });
      });

      // Mobile testing part
      // cy.onMobile(() => clickHamburger());
      // cy.tabScreenshot({ container: 'header', scenario: 'header' });

      // cy.get('cx-navigation-ui.accNavComponent').contains('My Account').click();
      // cy.get('cx-navigation-ui .is-open .wrapper').should('be.visible');
      // cy.tabScreenshot({
      //   container: 'cx-navigation-ui',
      //   scenario: 'my-account',
      // });
    });
  });
});
