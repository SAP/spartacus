import * as paymentMethods from '../../helpers/payment-methods';
import { formats } from '../../sample-data/viewports';

describe('Payment Methods', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  paymentMethods.paymentMethodTest();
});

describe(`${formats.mobile.width + 1}p resolution - Payment Methods`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then(win => win.sessionStorage.clear());
  });
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  paymentMethods.paymentMethodTest();
});
