import { testGroupSkipperConfig } from '../../helpers/accessibility/group-skipper/group-skipper';
import {
  groupSkipperConfigNotLoggedIn,
  groupSkipperConfigMyAccount,
  groupSkipperConfigCheckout,
} from '../../helpers/accessibility/group-skipper/group-skipper.config';
import * as checkout from '../../helpers/checkout-flow';

context('Group Skipper - Not Logged In', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  testGroupSkipperConfig(groupSkipperConfigNotLoggedIn);
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

  testGroupSkipperConfig(groupSkipperConfigMyAccount);
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

  testGroupSkipperConfig(groupSkipperConfigCheckout);
});
