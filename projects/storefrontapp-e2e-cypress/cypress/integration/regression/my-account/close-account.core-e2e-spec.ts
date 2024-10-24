import { login } from '../../../helpers/auth-forms';
import * as alerts from '../../../helpers/global-message';
import { generateMail, randomString } from '../../../helpers/user';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';

const CLOSE_ACCOUNT_URL = '/my-account/close-account';

let failCount = 0;
const FAIL_LIMIT = 2;
let skip = false;

Cypress.on('fail', (error, test) => {
  console.log('test:', test.title);
  if (!skip) {
    failCount++;
    console.log('fail count:', failCount);
    if (failCount < FAIL_LIMIT) {
      skip = true;

      // On failure, skip all tests and start again
      test.skip();
    } else {
      throw error; // behave as normal
    }
  }
});

// Cypress._.times(_runModeRetries, () => {
const myTest = () =>
  describe('My Account - Close Account', () => {
    beforeEach(() => {
      if (skip) {
        Cypress.mocha.getRunner().suite.ctx.skip();
      }
    });

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

        //TODO REMOVE
        it('should fail', () => {
          cy.get('nothing');
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
          cy.visit('/login');
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

    afterEach(() => {
      const test = Cypress.mocha.getRunner();
      console.log(test);
    });

    after(() => {
      console.log('after hook', failCount, skip);
      if (failCount < FAIL_LIMIT && skip) {
        console.log('restarting');
        skip = false;
        myTest();
      }
      // skip = false;
      // myTest();
    });
  });

myTest();
