import * as updatePassword from '../../../helpers/update-password';
import { viewportContext } from '../../../helpers/viewport-context';

describe('My Account - Update Password', () => {
  viewportContext(['desktop'], () => {
    before(() =>
      cy.window().then((win) => {
        win.sessionStorage.clear();
      })
    );
    updatePassword.testUpdatePasswordLoggedInUser();
  });
});
