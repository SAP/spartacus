import {
  updateEmailTest,
  verifyAsAnonymous,
} from '../../../helpers/update-email';
import { formats } from '../../../sample-data/viewports';

describe(`${formats.mobile.width + 1}p resolution - Update Email Page`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  describe('update email test for anonymous user', () => {
    verifyAsAnonymous();
  });

  describe('update email test for logged in user', () => {
    before(() => {
      cy.requireLoggedIn();
      cy.reload();
      cy.visit('/');
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
      cy.selectUserMenuOption({
        option: 'Email Address',
        isMobile: true,
      });
    });

    updateEmailTest();

    afterEach(() => {
      cy.saveLocalStorage();
    });
  });
});
