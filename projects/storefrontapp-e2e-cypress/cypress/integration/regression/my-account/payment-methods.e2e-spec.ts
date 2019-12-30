import * as login from '../../../helpers/login';
import {
  checkAnonymous,
  paymentMethodsTest,
} from '../../../helpers/payment-methods';

describe('Payment Methods', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  describe('Anonymous user', () => {
    checkAnonymous();
  });

  describe('Authenticated user', () => {
    before(() => {
      cy.requireLoggedIn();
      cy.reload();
      cy.visit('/');

      cy.server();
      cy.route(
        'GET',
        '/rest/v2/electronics-spa/cms/pages*/my-account/payment-details*'
      ).as('payment_details');

      cy.selectUserMenuOption({
        option: 'Payment Details',
      });

      cy.wait('@payment_details');
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
