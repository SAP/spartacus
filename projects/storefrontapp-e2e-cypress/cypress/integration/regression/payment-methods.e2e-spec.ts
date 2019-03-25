import * as paymentMethods from '../../helpers/payment-methods';
import { formats } from '../../sample-data/viewports';

function paymentMethodsTest() {
  it('should redirect to login page for anonymouse user', () => {
    paymentMethods.accessPageAsAnonymous();
  });

  describe('should go to payment details page for login user', () => {
    before(() => {
      cy.requireLoggedIn();
      cy.visit('/my-account/payment-details');
    });

    it('should see spinner when loading', () => {
      paymentMethods.verifySpinner();
    });

    it('should see title and some messages', () => {
      paymentMethods.verifyText();
    });

    it('should see payment method card', () => {
      paymentMethods.paymentDetailCard();
    });

    it('should be able to delete the payment', () => {
      paymentMethods.deletePayment();
    });
  });
}

describe('Payment Methods', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  paymentMethodsTest();
});

describe(`${formats.mobile.width + 1}p resolution - Payment Methods`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  paymentMethodsTest();
});
