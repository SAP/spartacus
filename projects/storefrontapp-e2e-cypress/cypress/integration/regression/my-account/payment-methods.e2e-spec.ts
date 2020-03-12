import { visitHomePage } from '../../../helpers/checkout-flow';
import * as login from '../../../helpers/login';
import {
  checkAnonymous,
  paymentMethodsTest,
} from '../../../helpers/payment-methods';

describe('Payment Methods', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    visitHomePage();
  });

  describe('Anonymous user', () => {
    checkAnonymous();
  });

  describe('Authenticated user', () => {
    before(() => {
      cy.server();
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
