import { login } from '../../../helpers/auth-forms';
import * as alerts from '../../../helpers/global-message';
import { generateMail, randomString } from '../../../helpers/user';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';

const CLOSE_ACCOUNT = '/my-account/close-account';

describe('My Account - Close Account', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() =>
      cy.window().then((win) => {
        win.sessionStorage.clear();
      })
    );

    describe('close account test for anonymous user', () => {
      it('should redirect to login page for anonymous user', () => {
        cy.visit(CLOSE_ACCOUNT);
        cy.location('pathname').should('contain', '/login');
      });
    });

    describe('close account test for logged in user', () => {
      before(() => {
        standardUser.registrationData.email = generateMail(
          randomString(),
          true
        );
        cy.requireLoggedIn(standardUser);
        cy.reload();
        cy.visit('/');
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
        cy.selectUserMenuOption({
          option: 'Close Account',
        });
      });

      it('should be able to cancel and go back to home', () => {
        cy.get('cx-close-account a').click({ force: true });
        cy.location('pathname').should('contain', '/');
      });

      it('should be able to close account', () => {
        cy.server();
        cy.route(
          'DELETE',
          `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/users/*`
        ).as('deleteQuery');

        cy.location('pathname').should('contain', CLOSE_ACCOUNT);

        cy.get('cx-close-account button').click({ force: true });

        cy.get(
          'cx-close-account-modal .cx-btn-group button:first-of-type'
        ).click();

        cy.wait('@deleteQuery').its('status').should('eq', 200);

        cy.location('pathname').should('contain', '/');

        alerts
          .getSuccessAlert()
          .should('contain', 'Account closed with success');
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });
    });

    describe('verify user is disabled and cannot login', () => {
      it('should not be able to login with a closed account', () => {
        cy.visit('/login');
        login(
          standardUser.registrationData.email,
          standardUser.registrationData.password
        );

        cy.location('pathname').should('contain', '/login');
        alerts.getErrorAlert().should('contain', 'User is disabled');
      });
    });
  });
});
