import * as login from '../../../helpers/login';
import {
  checkAnonymous,
  paymentMethodsTest,
} from '../../../helpers/payment-methods';
import { formats } from '../../../sample-data/viewports';

describe(`${formats.mobile.width + 1}p resolution - Payment Methods`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  describe('Anonymous user', () => {
    checkAnonymous();
  });

  describe('Authenticated user', () => {
    before(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
      cy.requireLoggedIn();
      cy.reload();
      cy.visit('/');
      cy.selectUserMenuOption({
        option: 'Payment Details',
        isMobile: true,
      });
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
