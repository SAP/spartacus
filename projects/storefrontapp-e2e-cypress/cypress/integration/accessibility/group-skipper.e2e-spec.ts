import {
  groupSkipperConfigNotLoggedIn,
  groupSkipperConfigMyAccount,
  groupSkipperConfigCheckout,
} from '../../helpers/accessibility/group-skipper/group-skipper.config';
import * as checkout from '../../helpers/checkout-flow';
import { testGroupSkipperFromConfig } from '../../helpers/accessibility/group-skipper/group-skipper';

context('Group Skipper - Not Logged In', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  testGroupSkipperFromConfig(groupSkipperConfigNotLoggedIn);
});

context('Group Skipper - My Account', () => {
  before(() => {
    cy.requireLoggedIn();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  testGroupSkipperFromConfig(groupSkipperConfigMyAccount);
});

context('Group Skipper - Checkout', () => {
  before(() => {
    cy.requireLoggedIn().then(() => {
      checkout.goToProductDetailsPage();
      checkout.addProductToCart();
      checkout.fillAddressForm();
      checkout.chooseDeliveryMethod();
      checkout.fillPaymentForm();
      cy.get('.cx-review-summary-card');
      cy.saveLocalStorage();
    });
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  testGroupSkipperFromConfig(groupSkipperConfigCheckout);
});
