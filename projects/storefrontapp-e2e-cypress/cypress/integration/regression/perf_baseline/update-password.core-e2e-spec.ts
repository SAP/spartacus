import * as updatePassword from '../../../helpers/update-password';
import { viewportContext } from '../../../helpers/viewport-context';

describe('My Account - Update Password', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  });
  viewportContext(['desktop'], () => {
    before(() =>
      cy.window().then((win) => {
        win.sessionStorage.clear();
      })
    );
    updatePassword.testUpdatePasswordLoggedInUser();
  });
});
