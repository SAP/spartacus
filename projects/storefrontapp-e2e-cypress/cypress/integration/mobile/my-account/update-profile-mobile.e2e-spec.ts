import {
  updateProfileTest,
  verifyAsAnonymous,
} from '../../../helpers/update-profile';
import * as login from '../../../helpers/login';
import * as homepage from '../../../helpers/homepage';
import { formats } from '../../../sample-data/viewports';

describe(`${formats.mobile.width +
  1}p resolution - Update Profile Page`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  verifyAsAnonymous();
 
  describe('update profile test for logged in user', () => {
    before(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
      homepage.clickHamburger();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
      cy.viewport(formats.mobile.width, formats.mobile.height);
    });

    updateProfileTest();

    afterEach(() => {
      cy.saveLocalStorage();
    });

   after(() => {
      login.signOutUser();
    });
  });
});
