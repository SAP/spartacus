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

  checkAnonymous();

  describe('should go to payment details page for login user', () => {
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
