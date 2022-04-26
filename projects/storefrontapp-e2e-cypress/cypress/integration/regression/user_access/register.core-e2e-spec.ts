import { register } from '../../../helpers/auth-forms';
import { clickHamburger } from '../../../helpers/homepage';
import * as registerHelpers from '../../../helpers/register';
import { viewportContext } from '../../../helpers/viewport-context';
import { user } from '../../../sample-data/checkout-flow';

describe('Register', () => {
  viewportContext(['desktop', 'mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
    });

    it('should register and redirect to login page', () => {
      cy.onMobile(() => {
        clickHamburger();
      });
      cy.findByText(/Sign in \/ Register/i).click();
      cy.get('cx-login-register').findByText('Register').click();
      register(user);
      registerHelpers.verifyGlobalMessageAfterRegistration();
      const termsLink = `/${Cypress.env(
        'BASE_SITE'
      )}/en/USD/terms-and-conditions`;
      cy.visit('/login/register');
      cy.findByText('Terms & Conditions')
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'href', termsLink);
      // We use visit here, as the blank would open it in new tab
      cy.visit(termsLink);
      cy.get('.title_holder h2').should('contain', 'Terms and Conditions');
    });
  });
});
