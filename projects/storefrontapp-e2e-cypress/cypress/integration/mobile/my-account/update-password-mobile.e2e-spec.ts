import {
  updatePasswordTest,
  verifyAsAnonymous,
} from '../../../helpers/update-password';
import * as login from '../../../helpers/login';
import { formats } from '../../../sample-data/viewports';

describe(`${formats.mobile.width +
  1}p resolution - Update Password page`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  describe('update password test for anonymous user', () => {
    verifyAsAnonymous();
  });

  describe('update password test for logged in user', () => {
    before(() => {
      cy.requireLoggedIn();
      cy.reload();
      cy.visit('/');
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
      cy.selectUserMenuOption({
        option: 'Password',
        isMobile: true,
      });
    });

    updatePasswordTest();

    afterEach(() => {
      cy.saveLocalStorage();
      cy.visit('/');
    });

    after(() => {
      login.signOutUser();
    });
  });
});
