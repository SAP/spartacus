import {
  retrieveTokenAndLogin,
  checkoutAsPersistentUserTest,
} from '../../../helpers/checkout-as-persistent-user';

describe('Checkout - As a Persistent User', () => {
  before(() =>
    cy.window().then(win => {
      win.sessionStorage.clear();
    })
  );

  describe('checkout test as a persistent user', () => {
    before(() => {
      cy.reload();
      cy.visit('/');
      retrieveTokenAndLogin();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    checkoutAsPersistentUserTest();

    afterEach(() => {
      cy.saveLocalStorage();
    });
  });
});
