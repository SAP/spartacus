import { visitHomePage } from '../../../helpers/checkout-flow';
import * as login from '../../../helpers/login';
import {
  checkAnonymous,
  paymentMethodsTest,
} from '../../../helpers/payment-methods';
import { formats } from '../../../sample-data/viewports';

describe(`${formats.mobile.width + 1}p resolution - Payment Methods`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  describe('Anonymous user', () => {
    checkAnonymous();
  });

  describe('Authenticated user', () => {
    before(() => {
      cy.requireLoggedIn();
      cy.reload();

      cy.server();
      visitHomePage();

      cy.route(
        'GET',
        '/rest/v2/electronics-spa/cms/pages*/my-account/payment-details*'
      ).as('payment_details');

      cy.selectUserMenuOption({
        option: 'Payment Details',
        isMobile: true,
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
