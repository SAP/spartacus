import {
  updateProfileTest,
  verifyAsAnonymous,
} from '../../../helpers/update-profile';
import * as login from '../../../helpers/login';
import { formats } from '../../../sample-data/viewports';

describe(`${formats.mobile.width +
  1}p resolution - Update Profile Page`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  describe('update profile test for anonymous user', () => {
    verifyAsAnonymous();
  });

  describe('update profile test for logged in user', () => {
    before(() => {
      cy.requireLoggedIn();
      cy.reload();
      cy.visit('/');
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
      cy.selectUserMenuOption({
        option: 'Personal Details',
        isMobile: true,
      });
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
