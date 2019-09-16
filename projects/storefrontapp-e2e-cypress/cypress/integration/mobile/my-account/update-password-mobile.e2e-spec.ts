import {
  updatePasswordTest,
  verifyAsAnonymous,
} from '../../../helpers/update-password';
import * as login from '../../../helpers/login';
import * as homepage from '../../../helpers/homepage';
import { formats } from '../../../sample-data/viewports';

describe(`${formats.mobile.width +
  1}p resolution - Update Password page`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  verifyAsAnonymous();

  describe('update password test for logged in user', () => {
    before(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
      homepage.clickHamburger();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
      cy.viewport(formats.mobile.width, formats.mobile.height);
    });

    updatePasswordTest();

    afterEach(() => {
      cy.saveLocalStorage();
    });

    after(() => {
      login.signOutUser();
    });
  });
});
