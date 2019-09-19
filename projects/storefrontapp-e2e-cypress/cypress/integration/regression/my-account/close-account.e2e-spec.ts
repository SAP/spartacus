import {
  closeAccountTest,
  verifyAsAnonymous,
} from '../../../helpers/close-account';

describe('My Account - Close Account', () => {
  before(() =>
    cy.window().then(win => {
      win.sessionStorage.clear();
    })
  );

  verifyAsAnonymous();
  describe('close account test for logged in user', () => {
    beforeEach(() => {
      cy.restoreLocalStorage();
    });

  closeAccountTest();

    afterEach(() => {
      cy.saveLocalStorage();
    });
  });
});
