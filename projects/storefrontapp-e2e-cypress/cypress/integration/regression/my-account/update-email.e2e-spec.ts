import {
  updateEmailTest,
  verifyAsAnonymous,
} from '../../../helpers/update-email';

describe('My Account - Update Email', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  verifyAsAnonymous();

  describe('update email test for logged in user', () => {
    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    updateEmailTest();

    afterEach(() => {
      cy.saveLocalStorage();
    });
  });
});
