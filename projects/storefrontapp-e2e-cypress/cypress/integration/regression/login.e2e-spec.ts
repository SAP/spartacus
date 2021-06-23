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

      const tokenRevocationRequestAlias =
        login.listenForTokenRevocationRequest();
      login.signOutUser();
      cy.wait(tokenRevocationRequestAlias);
    });

    it('login should fail if password is wrong', () => {
      cy.onMobile(() => {
        clickHamburger();
      });
      login.loginWithBadCredentials();
    });
  });
});
