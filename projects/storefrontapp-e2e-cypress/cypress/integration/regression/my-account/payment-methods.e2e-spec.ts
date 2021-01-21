import { visitHomePage } from '../../../helpers/checkout-flow';
import * as login from '../../../helpers/login';
import {
  checkAnonymous,
  paymentMethodsTest,
} from '../../../helpers/payment-methods';

describe('Payment Methods', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  describe('Anonymous user', () => {
    checkAnonymous();
  });

  describe('Authenticated user', () => {
    before(() => {
      visitHomePage();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    paymentMethodsTest();

    afterEach(() => {
      cy.saveLocalStorage();
    });

    after(() => {
      login.signOutUser();
    });
  });
});
