import { login } from '../../../helpers/auth-forms';
import * as alerts from '../../../helpers/global-message';
import { waitForPage } from '../../../helpers/navigation';
import { generateMail, randomString } from '../../../helpers/user';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';

const CLOSE_ACCOUNT_URL = '/my-account/close-account';

describe('My Account - Close Account', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() =>
      cy.window().then((win) => {
        win.sessionStorage.clear();
      })
    );

    describe('Anonymous user', () => {
      it('should redirect to login page', () => {
        cy.visit(CLOSE_ACCOUNT_URL);
        cy.location('pathname').should('contain', '/login');
      });
    });

    describe('Logged in user', () => {
      before(() => {
        standardUser.registrationData.email = generateMail(
          randomString(),
          true
        );
        cy.requireLoggedIn(standardUser);
        cy.visit('/');

        // Note: Without this, selectUserMenuOption() times out waiting for "My Account".
        cy.location('pathname').should(
          'contain',
          `/${Cypress.env('BASE_SITE')}/${Cypress.env(
            'BASE_LANG'
          )}/${Cypress.env('BASE_CURRENCY')}`
        );
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
      });

      it('should cancel and go back to the homepage', () => {
        cy.selectUserMenuOption({
          option: 'Close Account',
        });

        cy.get('cx-close-account a').click({ force: true });
        cy.location('pathname').should('contain', '/');
      });

      it('should close account', () => {
        cy.selectUserMenuOption({
          option: 'Close Account',
        });

        cy.intercept(
          'DELETE',
          `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/users/*`
        ).as('deleteQuery');

        cy.location('pathname').should('contain', CLOSE_ACCOUNT_URL);

        cy.get('cx-close-account button').click({ force: true });

        cy.get(
          'cx-close-account-modal .cx-close-account-modal-container .cx-close-account-modal-footer button:first-of-type'
        ).click();

        cy.wait('@deleteQuery');

        cy.location('pathname').should('contain', '/');

        alerts
          .getSuccessAlert()
          .should('contain', 'Account closed with success');
      });

      it('should not login with a closed account credentials', () => {
        // Note: Login page takes longer to render as the initial request is unauthorized.
        // We need to wait for this request to avoid timeouts.
        const loginPage = waitForPage('/login', 'getLoginPage');
        cy.visit('/login');
        cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 401);

        login(
          standardUser.registrationData.email,
          standardUser.registrationData.password
        );

        cy.location('pathname').should('contain', '/login');
        alerts.getErrorAlert().should('contain', 'User is disabled');
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });
    });
  });
});
